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
import com.facebook.react.common.network.OkHttpCallUtil;
import com.fasterxml.jackson.core.JsonParser;
import com.proj1.R;

import org.json.JSONObject;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.internal.http.HttpEngine;
import okhttp3.internal.http.HttpMethod;

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
    public void getIsNeedUpdate(final Callback successCallback) {
        if(successCallback!=null) {
            try {
                final int localVersionCode = getReactApplicationContext().getPackageManager().getPackageInfo("com.proj1", 0).versionCode;
                //获取json
                //创建okHttpClient对象
                OkHttpClient mOkHttpClient = new OkHttpClient();
                //创建一个Request
                final Request request = new Request.Builder()
                        .url("https://raw.githubusercontent.com/yapovich/reactnative/master/proj1/packages/android/last/update.json")
                        .build();
                Call call = mOkHttpClient.newCall(request);
                //请求加入调度
                call.enqueue(new okhttp3.Callback() {
                    @Override
                    public void onFailure(Call call, IOException e) {

                    }
                    @Override
                    public void onResponse(Call call, Response response) throws IOException {
                        try {
                            JSONObject json = new JSONObject(response.body().string());
                            int versionCode=json.getInt("versionCode");
                            successCallback.invoke(versionCode>localVersionCode);
                        }catch (Exception ex){

                        }
                    }
                });
            }catch(Exception ex){

            }
        }
    }

}
