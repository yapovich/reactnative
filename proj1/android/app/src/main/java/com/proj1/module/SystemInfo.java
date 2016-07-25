package com.proj1.module;

import android.os.Build;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.proj1.R;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by yebo on 2016/7/12.
 */
public class SystemInfo extends ReactContextBaseJavaModule {
    public SystemInfo(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String getName() {
        return "SystemInfoAndroid";
    }
    /**
     * 获取当前Android版本
     */
    @ReactMethod
    public void getVersion(Callback successCallback) {
        if(successCallback!=null)
            successCallback.invoke(Build.VERSION.SDK_INT);
    }
}
