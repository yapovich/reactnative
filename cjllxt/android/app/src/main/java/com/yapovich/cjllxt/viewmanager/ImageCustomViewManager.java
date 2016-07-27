package com.yapovich.cjllxt.viewmanager;

import android.content.pm.ApplicationInfo;
import android.content.res.AssetManager;
import android.content.res.Resources;
import android.graphics.BitmapFactory;
import android.graphics.PorterDuff;
import android.graphics.PorterDuff.Mode;
import com.facebook.csslayout.CSSConstants;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.drawee.controller.AbstractDraweeControllerBuilder;
import com.facebook.infer.annotation.Assertions;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.annotations.ReactPropGroup;
import com.facebook.react.views.image.ImageLoadEvent;
import com.facebook.react.views.image.ImageResizeMode;
import com.facebook.react.views.image.ReactImageView;
import com.facebook.react.views.imagehelper.ImageSource;
import com.yapovich.cjllxt.R;

import java.util.Map;
import javax.annotation.Nullable;

/**
 * Created by yebo on 2016/7/20.
 */
public class ImageCustomViewManager extends SimpleViewManager<ReactImageView> {
    @Nullable
    private AbstractDraweeControllerBuilder mDraweeControllerBuilder;
    @Nullable
    private final Object mCallerContext;

    public String getName() {
        return "ImageCustomViewAndroid";
    }

    public ImageCustomViewManager(AbstractDraweeControllerBuilder draweeControllerBuilder, Object callerContext) {
        this.mDraweeControllerBuilder = draweeControllerBuilder;
        this.mCallerContext = callerContext;
    }

    public ImageCustomViewManager() {
        this.mDraweeControllerBuilder = null;
        this.mCallerContext = null;
    }

    public AbstractDraweeControllerBuilder getDraweeControllerBuilder() {
        if(this.mDraweeControllerBuilder == null) {
            this.mDraweeControllerBuilder = Fresco.newDraweeControllerBuilder();
        }

        return this.mDraweeControllerBuilder;
    }

    public Object getCallerContext() {
        return this.mCallerContext;
    }

    public ReactImageView createViewInstance(ThemedReactContext context) {
        return new ReactImageView(context, this.getDraweeControllerBuilder(), this.getCallerContext());
    }

    @ReactProp(
            name = "src"
    )
    public void setSource(ReactImageView view, @javax.annotation.Nullable ReadableArray sources) {
        if(sources != null && sources.size() != 0) {
            if(sources.size() == 1) {
                int resID = Resources.getSystem().getIdentifier(sources.getMap(0).getString("uri"), "drawable",Resources.getSystem().getString(R.string.package_name));
                BitmapFactory.decodeResource(Resources.getSystem(), resID);
            } else {
                for(int idx = 0; idx < sources.size(); ++idx) {
                    ReadableMap source = sources.getMap(idx);
                    int resID = Resources.getSystem().getIdentifier(source.getString("uri"), "drawable", Resources.getSystem().getString(R.string.package_name));
                    BitmapFactory.decodeResource(Resources.getSystem(), resID);
                }
            }
        }
        view.setSource(sources);
    }

    @ReactProp(
            name = "loadingIndicatorSrc"
    )
    public void setLoadingIndicatorSource(ReactImageView view, @javax.annotation.Nullable String source) {
        view.setLoadingIndicatorSource(source);
    }

    @ReactProp(
            name = "borderColor",
            customType = "Color"
    )
    public void setBorderColor(ReactImageView view, @javax.annotation.Nullable Integer borderColor) {
        if(borderColor == null) {
            view.setBorderColor(0);
        } else {
            view.setBorderColor(borderColor.intValue());
        }

    }

    @ReactProp(
            name = "overlayColor"
    )
    public void setOverlayColor(ReactImageView view, @javax.annotation.Nullable Integer overlayColor) {
        if(overlayColor == null) {
            view.setOverlayColor(0);
        } else {
            view.setOverlayColor(overlayColor.intValue());
        }

    }

    @ReactProp(
            name = "borderWidth"
    )
    public void setBorderWidth(ReactImageView view, float borderWidth) {
        view.setBorderWidth(borderWidth);
    }

    @ReactPropGroup(
            names = {"borderRadius", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"},
            defaultFloat = 0f
    )
    public void setBorderRadius(ReactImageView view, int index, float borderRadius) {
        if(!CSSConstants.isUndefined(borderRadius)) {
            borderRadius = PixelUtil.toPixelFromDIP(borderRadius);
        }

        if(index == 0) {
            view.setBorderRadius(borderRadius);
        } else {
            view.setBorderRadius(borderRadius, index - 1);
        }

    }

    @ReactProp(
            name = "resizeMode"
    )
    public void setResizeMode(ReactImageView view, @javax.annotation.Nullable String resizeMode) {
        view.setScaleType(ImageResizeMode.toScaleType(resizeMode));
    }

    @ReactProp(
            name = "tintColor",
            customType = "Color"
    )
    public void setTintColor(ReactImageView view, @javax.annotation.Nullable Integer tintColor) {
        if(tintColor == null) {
            view.clearColorFilter();
        } else {
            view.setColorFilter(tintColor.intValue(), PorterDuff.Mode.SRC_IN);
        }

    }

    @ReactProp(
            name = "progressiveRenderingEnabled"
    )
    public void setProgressiveRenderingEnabled(ReactImageView view, boolean enabled) {
        view.setProgressiveRenderingEnabled(enabled);
    }

    @ReactProp(
            name = "fadeDuration"
    )
    public void setFadeDuration(ReactImageView view, int durationMs) {
        view.setFadeDuration(durationMs);
    }

    @ReactProp(
            name = "shouldNotifyLoadEvents"
    )
    public void setLoadHandlersRegistered(ReactImageView view, boolean shouldNotifyLoadEvents) {
        view.setShouldNotifyLoadEvents(shouldNotifyLoadEvents);
    }

    @Nullable
    public Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(ImageLoadEvent.eventNameForType(ImageLoadEvent.ON_LOAD_START), MapBuilder.of("registrationName", "onLoadStart"), ImageLoadEvent.eventNameForType(2), MapBuilder.of("registrationName", "onLoad"), ImageLoadEvent.eventNameForType(3), MapBuilder.of("registrationName", "onLoadEnd"));
    }

    protected void onAfterUpdateTransaction(ReactImageView view) {
        super.onAfterUpdateTransaction(view);
        view.maybeUpdateView();
    }
}
