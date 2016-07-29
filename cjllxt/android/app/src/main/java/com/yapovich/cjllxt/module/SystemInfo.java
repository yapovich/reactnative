package com.yapovich.cjllxt.module;

import android.os.Build;
import android.os.Message;
import android.view.LayoutInflater;
import android.view.Window;
import android.view.WindowManager;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.views.modal.ReactModalHostManager;
import com.facebook.react.views.modal.ReactModalHostView;
import com.facebook.react.views.scroll.ReactScrollView;
import com.facebook.react.views.view.ReactViewGroup;
import com.yapovich.cjllxt.R;

import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Created by yebo on 2016/7/12.
 */
public class SystemInfo extends ReactContextBaseJavaModule {
    private String packageName;
    public SystemInfo(ReactApplicationContext reactContext) {
        super(reactContext);
        packageName=this.getReactApplicationContext().getResources().getString(R.string.package_name);
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
                int versionCode = getReactApplicationContext().getPackageManager().getPackageInfo(packageName, 0).versionCode;
                json.put("appVersionCode",versionCode);
                //应用程序版本名称
                String versionName = getReactApplicationContext().getPackageManager().getPackageInfo(packageName, 0).versionName;
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
                final int localVersionCode = getReactApplicationContext().getPackageManager().getPackageInfo(packageName, 0).versionCode;
                //获取json
                //创建okHttpClient对象
                OkHttpClient mOkHttpClient = new OkHttpClient();
                //创建一个Request
                final Request request = new Request.Builder()
                        .url(this.getReactApplicationContext().getResources().getString(R.string.updateApk_url))
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
                            String versionName=json.getString("versionName");
                            successCallback.invoke(versionCode>localVersionCode?versionName:null);
                        }catch (Exception ex){

                        }
                    }
                });
            }catch(Exception ex){

            }
        }
    }
    /**
     * 是否需要更新
     */
    @ReactMethod
    public void doUpdateApk(final Callback successCallback) {
        if(successCallback!=null) {
            try {

            }catch(Exception ex){

            }
        }
    }
    /**
     *设置全屏
     * */
    @ReactMethod
    public void setFullScreen(boolean isFullScreen) {
        final Window window=this.getCurrentActivity().getWindow();
        //.getCurrentActivity().getWindow();
        Message msg=new Message();
        if (!isFullScreen)
            msg.what=MessageProxy.SCREEN_NOT_FULL;
        else
            msg.what=MessageProxy.SCREEN_FULL;
        MessageProxy.sendMessage(msg);
    }
    /**
     *设置横屏
     * */
    @ReactMethod
    public void setLandscape(boolean isLandscape) {
        final Window window=this.getCurrentActivity().getWindow();
        //.getCurrentActivity().getWindow();
        Message msg=new Message();
        if (isLandscape)
            msg.what=MessageProxy.SCREEN_ORIENTATION_LANDSCAPE;
        else
            msg.what=MessageProxy.SCREEN_ORIENTATION_PORTRAIT;
        MessageProxy.sendMessage(msg);
    }
}
