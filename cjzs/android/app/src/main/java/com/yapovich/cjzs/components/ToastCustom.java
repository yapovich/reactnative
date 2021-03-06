package com.yapovich.cjzs.components;

import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.yapovich.cjzs.R;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by yebo on 2016/7/12.
 */
public class ToastCustom extends ReactContextBaseJavaModule {
    private static final String DURATION_SHORT="SHORT";
    private static final String DURATION_LONG="LONG";
    private static Toast toast;
    public ToastCustom(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String getName() {
        return "ToastCustomAndroid";
    }
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG, Toast.LENGTH_LONG);
        return constants;
    }

    /**
     * @param message
     * @param duration
     */
    @ReactMethod
    public void show(String message, int duration) {
        toast = Toast.makeText(getReactApplicationContext(), message, duration);
        /*TextView textView = new TextView(getReactApplicationContext());
        textView.setText(message);
        textView.setBackgroundColor(0x1bfa5);
        textView.setTextColor(0xffffff);
        textView.setPadding(5,5,5,5);
        toast.setView(textView);*/
        LayoutInflater inflater=LayoutInflater.from(getReactApplicationContext());
        View layout = inflater.inflate(R.layout.toast_custom, null);
        TextView textView = (TextView) layout.findViewById(R.id.ToastCustomText);
        textView.setText(message);
        toast.setView(layout);
        toast.setGravity(Gravity.CENTER, 0, 0);
        toast.show();
    }
    @ReactMethod
    public void cancel() {
        if(toast!=null)
            toast.cancel();
    }

    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }
}
