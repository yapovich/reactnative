package com.proj1.module;

import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.proj1.R;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by yebo on 2016/7/12.
 */
public class TagSelectInput extends ReactContextBaseJavaModule {
    public TagSelectInput(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String getName() {
        return "TagSelectInputAndroid";
    }
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        return constants;
    }

    /**
     * @param message
     * @param duration
     */
    @ReactMethod
    public void show(String message, int duration) {

    }
}
