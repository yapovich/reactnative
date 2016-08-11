package com.yapovich.cjzs.components.qrcode;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Rect;
import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.WindowManager;
import android.view.animation.Animation;
import android.view.animation.TranslateAnimation;
import android.widget.ImageView;
import android.widget.RelativeLayout;

import com.facebook.csslayout.CSSConstants;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewGroup;
import com.google.zxing.Result;
import com.yapovich.cjzs.R;
import com.yapovich.cjzs.components.qrcode.zxing.camera.CameraManager;
import com.yapovich.cjzs.components.qrcode.zxing.decode.DecodeThread;
import com.yapovich.cjzs.components.qrcode.zxing.utils.BeepManager;
import com.yapovich.cjzs.components.qrcode.zxing.utils.CaptureActivityHandler;

import java.io.IOException;
import java.lang.reflect.Field;

/**
 * Created by yebo on 2016/8/11.
 */
public class QRCodeViewManager extends SimpleViewManager<View> implements SurfaceHolder.Callback {
    private SurfaceView scanPreview = null;
    private RelativeLayout scanContainer;
    private RelativeLayout scanCropView;
    private ImageView scanLine;
    private ThemedReactContext context;
    private CameraManager cameraManager;
    private BeepManager beepManager;
    private boolean isHasSurface=false;
    private Rect mCropRect = null;
    private QRCodeHandler handler;

    public Handler getHandler() {
        return handler;
    }
    public Rect getCropRect() {
        return mCropRect;
    }
    public CameraManager getCameraManager() {
        return cameraManager;
    }
    @Override
    public String getName() {
        return "RCTQRCodeAndroid";
    }

    @Override
    protected View createViewInstance(ThemedReactContext themedReactContext) {
        this.context=themedReactContext;
        LayoutInflater inflater=LayoutInflater.from(themedReactContext);
        View view = inflater.inflate(R.layout.activity_capture,null);
        view.setLayoutParams(new WindowManager.LayoutParams(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.MATCH_PARENT));
        return view;
    }
    @Override
    public void surfaceCreated(SurfaceHolder holder) {
        if (holder == null) {

        }
        if (!isHasSurface) {
            isHasSurface = true;
            initCamera(holder);
        }
    }

    @Override
    public void surfaceDestroyed(SurfaceHolder holder) {
        isHasSurface = false;
    }
    @Override
    public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {

    }
    @ReactProp(name = "animation")
    public void setAnimation(View view,@Nullable boolean animation) {
        if(animation){
            LayoutInflater inflater=LayoutInflater.from(this.context);
            scanPreview = (SurfaceView)  view.findViewById(R.id.capture_preview);
            scanContainer = (RelativeLayout) view.findViewById(R.id.capture_container);
            scanCropView = (RelativeLayout) view.findViewById(R.id.capture_crop_view);
            scanLine = (ImageView)view.findViewById(R.id.capture_scan_line);
            TranslateAnimation ani = new TranslateAnimation(Animation.RELATIVE_TO_PARENT, 0.0f, Animation
                    .RELATIVE_TO_PARENT, 0.0f, Animation.RELATIVE_TO_PARENT, 0.0f, Animation.RELATIVE_TO_PARENT,
                    0.9f);
            ani.setDuration(4500);
            ani.setRepeatCount(-1);
            ani.setRepeatMode(Animation.RESTART);
            scanLine.startAnimation(ani);
            initCamera(scanPreview.getHolder());
        }
    }
    public void handleDecode(Result rawResult, Bundle bundle) {
        /*inactivityTimer.onActivity();
        beepManager.playBeepSoundAndVibrate();
        Intent resultIntent = new Intent();
        bundle.putInt("width", mCropRect.width());
        bundle.putInt("height", mCropRect.height());
        bundle.putString("result", rawResult.getText());
        resultIntent.putExtras(bundle);
        this.setResult(RESULT_OK, resultIntent);
        CaptureActivity.this.finish();*/
    }
    private void initCamera(SurfaceHolder surfaceHolder) {
        if(cameraManager==null)
          cameraManager = new CameraManager(this.context);
        if(beepManager==null)
          beepManager = new BeepManager(this.context.getCurrentActivity());
        if (surfaceHolder == null) {
            throw new IllegalStateException("No SurfaceHolder provided");
        }
        if (cameraManager.isOpen()) {
            return;
        }
        try {
            cameraManager.openDriver(surfaceHolder);
            // Creating the handler starts the preview, which can also throw a
            // RuntimeException.
            if (handler == null) {
                handler = new QRCodeHandler(this, cameraManager, DecodeThread.ALL_MODE);
            }
            initCrop();
        } catch (IOException ioe) {
        } catch (RuntimeException e) {
        }
    }
    /**
     * 初始化截取的矩形区域
     */
    private void initCrop() {
        int cameraWidth = cameraManager.getCameraResolution().y;
        int cameraHeight = cameraManager.getCameraResolution().x;

        /** 获取布局中扫描框的位置信息 */
        int[] location = new int[2];
        scanCropView.getLocationInWindow(location);

        int cropLeft = location[0];
        int cropTop = location[1]-getStatusBarHeight();

        int cropWidth = scanCropView.getWidth();
        int cropHeight = scanCropView.getHeight();

        /** 获取布局容器的宽高 */
        int containerWidth = scanContainer.getWidth();
        int containerHeight = scanContainer.getHeight();

        /** 计算最终截取的矩形的左上角顶点x坐标 */
        int x = cropLeft * cameraWidth / containerWidth;
        /** 计算最终截取的矩形的左上角顶点y坐标 */
        int y = cropTop * cameraHeight / containerHeight;

        /** 计算最终截取的矩形的宽度 */
        int width = cropWidth * cameraWidth / containerWidth;
        /** 计算最终截取的矩形的高度 */
        int height = cropHeight * cameraHeight / containerHeight;

        /** 生成最终的截取的矩形 */
        mCropRect = new Rect(x, y, width + x, height + y);
    }
    private int getStatusBarHeight() {
        try {
            Class<?> c = Class.forName("com.android.internal.R$dimen");
            Object obj = c.newInstance();
            Field field = c.getField("status_bar_height");
            int x = Integer.parseInt(field.get(obj).toString());
            return this.context.getResources().getDimensionPixelSize(x);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }
}
