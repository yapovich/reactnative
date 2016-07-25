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

import org.json.JSONObject;

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
     * 获取系统信息
     */
    @ReactMethod
    public void getInfo(Callback successCallback) {
        if(successCallback!=null)
            try {
                JSONObject json = new JSONObject();
                //安卓版本代码
                json.put("androidVersionCode",Build.VERSION.SDK_INT);
                //应用程序版本代码
                int versionCode = getReactApplicationContext().getPackageManager().getPackageInfo("com.proj1", 0).versionCode;
                json.put("appVersionCode",versionCode);
                //应用程序版本名称
                String versionName = getReactApplicationContext().getPackageManager().getPackageInfo("com.proj1", 0).versionName;
                json.put("appVersionName",versionName);
                successCallback.invoke(json.toString());
            }catch(Exception ex){

            }
    }
    /**
     * 是否需要更新
     */
    @ReactMethod
    public void getIsNeedUpdate(Callback successCallback) {
        if(successCallback!=null) {
            try {
                int versionCode = getReactApplicationContext().getPackageManager().getPackageInfo("com.proj1", 0).versionCode;

            }catch(Exception ex){

            }
        }
    }

}
