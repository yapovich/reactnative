package com.yapovich.cjzs.vendor.mediaplayer;

import android.content.Context;
import android.graphics.SurfaceTexture;
import android.media.MediaCodec;
import android.media.MediaDrm;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.Surface;
import android.view.TextureView;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.google.android.exoplayer.AspectRatioFrameLayout;
import com.google.android.exoplayer.DummyTrackRenderer;
import com.google.android.exoplayer.ExoPlaybackException;
import com.google.android.exoplayer.ExoPlayer;
import com.google.android.exoplayer.MediaCodecAudioTrackRenderer;
import com.google.android.exoplayer.MediaCodecTrackRenderer;
import com.google.android.exoplayer.MediaCodecVideoTrackRenderer;
import com.google.android.exoplayer.TrackRenderer;
import com.google.android.exoplayer.audio.AudioTrack;
import com.google.android.exoplayer.drm.MediaDrmCallback;
import com.google.android.exoplayer.metadata.MetadataTrackRenderer;
import com.google.android.exoplayer.metadata.id3.Id3Frame;
import com.google.android.exoplayer.text.Cue;
import com.google.android.exoplayer.text.TextRenderer;
import com.google.android.exoplayer.upstream.BandwidthMeter;
import com.google.android.exoplayer.util.Util;
import com.yapovich.cjzs.vendor.mediaplayer.trackrenderer.DashRenderersBuilder;
import com.yapovich.cjzs.vendor.mediaplayer.trackrenderer.ExtractorRenderersBuilder;
import com.yapovich.cjzs.vendor.mediaplayer.trackrenderer.HlsRenderersBuilder;
import com.yapovich.cjzs.vendor.mediaplayer.trackrenderer.SmoothStreamingRenderersBuilder;

import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

public class MediaPlayerController {
  private static final String TAG = "MediaPlayerController";

  private final Context context;
  private final ExoPlayer exoPlayer;
  private final Handler mainHandler;

  private String uri;

  private final InternalEventListener internalEventListener = new InternalEventListener();
  private final List<EventListener> eventListeners = new LinkedList<>();

  private TrackRenderersBuilder trackRenderersBuilder;
  private TrackRenderer videoTrackRenderer;
  private TrackRenderer audioTrackRenderer;

  private final AspectRatioFrameLayout aspectRatioFrameLayout;
  private TextureView textureView;
  private SurfaceTexture surfaceTexture;

  private boolean ended = false;
  private boolean loop = false;
  private boolean muted = false;


  public MediaPlayerController(Context context) {
    this.context = context;
    this.exoPlayer = ExoPlayer.Factory.newInstance(TrackRenderersBuilder.TRACK_RENDER_COUNT, 1000, 1000);
    this.exoPlayer.addListener(internalEventListener);
    this.exoPlayer.setPlayWhenReady(false);
    this.mainHandler = new Handler(Looper.getMainLooper());


    this.aspectRatioFrameLayout = new AspectRatioFrameLayout(context);
    this.textureView = new TextureView(aspectRatioFrameLayout.getContext());
    this.textureView.setSurfaceTextureListener(new TextureView.SurfaceTextureListener() {
      @Override
      public void onSurfaceTextureAvailable(SurfaceTexture surface, int width, int height) {
        Log.d(TAG, "onSurfaceTextureAvailable...w=" + width + ", h=" + height + ", surface=" + surface);
        if(surfaceTexture != null) {
          Log.d(TAG, "onSurfaceTextureAvailable...reuse old surfaceTexture");
          textureView.setSurfaceTexture(surfaceTexture);
          return;
        }
        setSurfaceTexture(surface);
      }

      @Override
      public void onSurfaceTextureSizeChanged(SurfaceTexture surface, int width, int height) {
        Log.d(TAG, "onSurfaceTextureSizeChanged...w=" + width + ", h=" + height);
      }

      @Override
      public boolean onSurfaceTextureDestroyed(SurfaceTexture surface) {
        Log.d(TAG, "onSurfaceTextureDestroyed...");
        return false;
      }

      @Override
      public void onSurfaceTextureUpdated(SurfaceTexture surface) {
      }
    });
    this.aspectRatioFrameLayout.addView(textureView, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
  }

  public void setContentUri(String uri) {
    if(uri != null && uri.equals(this.uri))
      return;
    this.uri = uri;
    resetPlayerForReuse();
  }

  public void setMuted(boolean muted) {
    this.muted = muted;
    if(audioTrackRenderer != null) {
      if(muted) {
        exoPlayer.sendMessage(audioTrackRenderer, MediaCodecAudioTrackRenderer.MSG_SET_VOLUME, 0f);
      } else {
        exoPlayer.sendMessage(audioTrackRenderer, MediaCodecAudioTrackRenderer.MSG_SET_VOLUME, 1f);
      }
    }
  }

  public void prepareToPlay() {
    if(trackRenderersBuilder == null && this.uri != null) {
      renderTracks(this.uri);
    }
  }

  private void resetPlayerForReuse() {
    this.exoPlayer.stop();
    this.exoPlayer.seekTo(0);
    if (this.trackRenderersBuilder != null) {
      this.trackRenderersBuilder.cancel();
      this.trackRenderersBuilder = null;
    }
  }

  private void renderTracks(String uri) {
    this.trackRenderersBuilder = createTrackRenderersBuilder(context, uri);
    this.trackRenderersBuilder.build(new TrackRenderersBuilder.Callback() {
      @Override
      public void onFinish(TrackRenderer[] trackRenderers) {
        Log.d(TAG, "renderTracks...track renderers built");
        for (int i = 0; i < TrackRenderersBuilder.TRACK_RENDER_COUNT; i++) {
          if (trackRenderers[i] == null) {
            // Convert a null renderer to a dummy renderer.
            trackRenderers[i] = new DummyTrackRenderer();
          }
        }
        videoTrackRenderer = trackRenderers[TrackRenderersBuilder.TRACK_VIDEO_INDEX];
        audioTrackRenderer = trackRenderers[TrackRenderersBuilder.TRACK_AUDIO_INDEX];
        exoPlayer.prepare(trackRenderers);

        if (surfaceTexture != null) {
          setSurface(new Surface(surfaceTexture));
        }

        if (muted) {
          setMuted(true);
        }
      }

      @Override
      public void onError(Exception e) {
        Log.e(TAG, "renderTracks...failed to build track renderers", e);
        notifyError(e);
      }
    });
  }

  private TrackRenderersBuilder createTrackRenderersBuilder(Context context, String uriString) {
    final Uri uri = Uri.parse(uriString);
    final int contentType = Util.inferContentType(uri.getLastPathSegment());
    final String userAgent = Util.getUserAgent(context, "cjllxt");

    switch (contentType) {
      case Util.TYPE_DASH:
        return new DashRenderersBuilder(context, userAgent, uriString, mainHandler, mediaDrmCallback, internalEventListener, internalEventListener, internalEventListener, bandwidthMeterListener, exoPlayer.getPlaybackLooper());
      case Util.TYPE_HLS:
        return new HlsRenderersBuilder(context, userAgent, uriString, mainHandler, internalEventListener, internalEventListener, internalEventListener, internalEventListener, bandwidthMeterListener);
      case Util.TYPE_SS:
        return new SmoothStreamingRenderersBuilder(context, userAgent, uriString, mainHandler, mediaDrmCallback, internalEventListener, internalEventListener, internalEventListener, bandwidthMeterListener, exoPlayer.getPlaybackLooper());
      case Util.TYPE_OTHER:
        return new ExtractorRenderersBuilder(context, userAgent, uri, mainHandler, internalEventListener, internalEventListener, internalEventListener, bandwidthMeterListener);
      default:
        throw new IllegalStateException("Unsupported content type: " + contentType);
    }
  }

  public void setLoop(boolean loop) {
    this.loop = loop;
  }

  public void setPlayWhenReady(boolean playWhenReady) {
    exoPlayer.setPlayWhenReady(playWhenReady);
  }

  public boolean getPlayWhenReady() {
    return exoPlayer.getPlayWhenReady();
  }

  public void play() {
    Log.d(TAG, "play...");
    exoPlayer.setPlayWhenReady(true);
    if (ended) {
      seekTo(0);
    }

    if(trackRenderersBuilder == null) {
      prepareToPlay();
    }
  }

  public void pause() {
    Log.d(TAG, "pause...");
    exoPlayer.setPlayWhenReady(false);
  }

  public void seekTo(long positionMs) {
    Log.d(TAG, "seekTo..." + positionMs);
    exoPlayer.seekTo(positionMs);
  }

  public void stop() {
    Log.d(TAG, "stop...");
    exoPlayer.stop();
  }

  public long getCurrentPosition() {
    return exoPlayer.getCurrentPosition();
  }

  public long getDuration() {
    return exoPlayer.getDuration();
  }

  public long getBufferedPosition() {
    return exoPlayer.getBufferedPosition();
  }

  public void release() {
    if (trackRenderersBuilder != null) {
      trackRenderersBuilder.cancel();
      trackRenderersBuilder = null;
    }
    if (surfaceTexture != null) {
      surfaceTexture.release();
      surfaceTexture = null;
    }
    exoPlayer.release();
  }

  private void setSurface(Surface surface) {
    if (videoTrackRenderer != null) {
      if (surface == null) {
        exoPlayer.blockingSendMessage(videoTrackRenderer, MediaCodecVideoTrackRenderer.MSG_SET_SURFACE, null);
      } else {
        exoPlayer.sendMessage(videoTrackRenderer, MediaCodecVideoTrackRenderer.MSG_SET_SURFACE, surface);
      }
    } else {
      Log.w(TAG, "setSurface...video track not ready");
    }
  }

  public void setSurfaceTexture(SurfaceTexture surfaceTexture) {
    this.surfaceTexture = surfaceTexture;
    setSurface(surfaceTexture == null ? null : new Surface(surfaceTexture));
  }

  public final View getView() {
    return aspectRatioFrameLayout;
  }

  public void addEventListener(EventListener listener) {
    synchronized (eventListeners) {
      eventListeners.add(listener);
    }
  }

  public void removeEventListener(EventListener listener) {
    synchronized (eventListeners) {
      while (eventListeners.contains(listener)) {
        eventListeners.remove(listener);
      }
    }
  }




  private class InternalEventListener implements MediaCodecVideoTrackRenderer.EventListener, MediaCodecAudioTrackRenderer.EventListener, TextRenderer, ExoPlayer.Listener, MetadataTrackRenderer.MetadataRenderer<List<Id3Frame>> {

    @Override
    public void onAudioTrackInitializationError(AudioTrack.InitializationException e) {

    }

    @Override
    public void onAudioTrackWriteError(AudioTrack.WriteException e) {
      notifyError(e);
    }

    @Override
    public void onAudioTrackUnderrun(int bufferSize, long bufferSizeMs, long elapsedSinceLastFeedMs) {

    }

    @Override
    public void onDroppedFrames(int count, long elapsed) {
      Log.d(TAG, "onDroppedFrames...count=" + count + ", elapsed=" + elapsed);
    }

    @Override
    public void onVideoSizeChanged(int width, int height, int unappliedRotationDegrees, float pixelWidthHeightRatio) {
      notifyVideoSizeChanged(width, height, unappliedRotationDegrees, pixelWidthHeightRatio);
    }

    @Override
    public void onDrawnToSurface(Surface surface) {
      Log.i(TAG, "onDrawnToSurface...");
      
    }

    @Override
    public void onDecoderInitializationError(MediaCodecTrackRenderer.DecoderInitializationException e) {
      notifyError(e);
    }

    @Override
    public void onCryptoError(MediaCodec.CryptoException e) {
      notifyError(e);
    }

    @Override
    public void onDecoderInitialized(String decoderName, long elapsedRealtimeMs, long initializationDurationMs) {

    }

    @Override
    public void onCues(List<Cue> cues) {
      notifyCues(cues);
    }

    @Override
    public void onPlayerStateChanged(boolean playWhenReady, int playbackState) {
      notifyPlayerStateChanged(playWhenReady, playbackState);
    }

    @Override
    public void onPlayWhenReadyCommitted() {

    }

    @Override
    public void onPlayerError(ExoPlaybackException error) {
      notifyError(error);
    }

    @Override
    public void onMetadata(List<Id3Frame> metadata) {

    }
  }

  private void notifyError(Exception e) {
    synchronized (eventListeners) {
      for (EventListener listener : eventListeners) {
        listener.onError(e);
      }
    }
  }

  private void notifyVideoSizeChanged(int width, int height, int unappliedRotationDegrees, float pixelWidthHeightRatio) {
    Log.d(TAG, "videoSize...w=" + width + ", h=" + height);

    aspectRatioFrameLayout.setAspectRatio(height == 0 ? 0 : (width * pixelWidthHeightRatio) / height);

    synchronized (eventListeners) {
      for (EventListener listener : eventListeners) {
        listener.onVideoSizeChanged(width, height, unappliedRotationDegrees, pixelWidthHeightRatio);
      }
    }
  }

  private void notifyPlayerStateChanged(boolean playWhenReady, int playbackState) {
    if (playbackState == ExoPlayer.STATE_ENDED) {
      ended = true;
      if(loop) {
        exoPlayer.seekTo(0);
      }
    } else {
      ended = false;
    }
    synchronized (eventListeners) {
      for (EventListener listener : eventListeners) {
        listener.onPlayerStateChanged(playWhenReady, playbackState);
      }
    }
  }

  private void notifyCues(List<Cue> cues) {
    synchronized (eventListeners) {
      for (EventListener listener : eventListeners) {
        listener.onCues(cues);
      }
    }
  }


  public interface EventListener {
    void onError(Exception e);

    /**
     * Invoked each time there's a change in the size of the video being rendered.
     *
     * @param width                    The video width in pixels.
     * @param height                   The video height in pixels.
     * @param unappliedRotationDegrees For videos that require a rotation, this is the clockwise
     *                                 rotation in degrees that the application should apply for the video for it to be rendered
     *                                 in the correct orientation. This value will always be zero on API levels 21 and above,
     *                                 since the renderer will apply all necessary rotations internally. On earlier API levels
     *                                 this is not possible. Applications that use {@link TextureView} can apply the rotation by
     *                                 calling {@link TextureView#setTransform}. Applications that do not expect to encounter
     *                                 rotated videos can safely ignore this parameter.
     * @param pixelWidthHeightRatio    The width to height ratio of each pixel. For the normal case
     *                                 of square pixels this will be equal to 1.0. Different values are indicative of anamorphic
     *                                 content.
     */
    void onVideoSizeChanged(int width, int height, int unappliedRotationDegrees, float pixelWidthHeightRatio);

    void onPlayerStateChanged(boolean playWhenReady, int playbackState);

    /**
     * Invoked each time there is a change in the {@link Cue}s to be rendered.
     *
     * @param cues The {@link Cue}s to be rendered, or an empty list if no cues are to be rendered.
     */
    void onCues(List<Cue> cues);

    /**
     * Invoked each time there is a metadata associated with current playback time.
     *
     * @param metadata
     */
    void onMetadata(List<Id3Frame> metadata);
  }

  public static class BaseEventListener implements EventListener {

    @Override
    public void onError(Exception e) {

    }

    @Override
    public void onVideoSizeChanged(int width, int height, int unappliedRotationDegrees, float pixelWidthHeightRatio) {

    }

    @Override
    public void onPlayerStateChanged(boolean playWhenReady, int playbackState) {

    }

    @Override
    public void onCues(List<Cue> cues) {

    }

    @Override
    public void onMetadata(List<Id3Frame> metadata) {

    }
  }

  private final MediaDrmCallback mediaDrmCallback = new MediaDrmCallback() {
    @Override
    public byte[] executeProvisionRequest(UUID uuid, MediaDrm.ProvisionRequest request) throws Exception {
      return new byte[0];
    }

    @Override
    public byte[] executeKeyRequest(UUID uuid, MediaDrm.KeyRequest request) throws Exception {
      return new byte[0];
    }
  };

  private final BandwidthMeter.EventListener bandwidthMeterListener = new BandwidthMeter.EventListener() {
    @Override
    public void onBandwidthSample(int elapsedMs, long bytes, long bitrate) {
      Log.d(TAG, "onBandwidthSample...elapsedMs=" + elapsedMs + ", bitrate=" + bitrate);
    }
  };
}
