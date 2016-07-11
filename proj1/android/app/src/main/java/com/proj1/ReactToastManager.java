package com.proj1;

import android.support.annotation.Nullable;
import android.view.Gravity;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.ReactShadowNode;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.image.ReactImageView;

import org.w3c.dom.Text;

import java.util.Arrays;
import java.util.List;

/**
 * Created by yebo on 2016/7/11.
 */
public class ReactToastManager extends SimpleViewManager<TextView> {
    public static final String REACT_CLASS = "RCTToast";
    @Override
    public String getName() {
        return REACT_CLASS;
    }
    @Override
    public TextView createViewInstance(ThemedReactContext context) {
        return new TextView(context);
    }
    @ReactMethod
    public void show(@Nullable String message, @Nullable int duration) {
        //view.setText(text);
        Toast toast = Toast.makeText(null, message, duration);
        toast.setGravity(Gravity.CENTER, 0, 0);
        toast.show();
    }

}
