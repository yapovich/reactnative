package com.yapovich.cjzs.components.qrcode;


import android.app.Activity;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.graphics.Bitmap;
import android.os.AsyncTask;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.WindowManager;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.yapovich.cjzs.R;
import com.yapovich.cjzs.components.qrcode.zxing.activity.CaptureActivity;
import com.yapovich.cjzs.util.MessageProxy;

import java.io.File;
import java.io.FileOutputStream;

/**
 * Created by yebo on 2016/8/9.
 */
public class QRCodeModule extends ReactContextBaseJavaModule{
    public QRCodeModule(ReactApplicationContext reactContext){
        super(reactContext);
    }
    @Override
    public String getName() {
        return "QRCodeAndroid";
    }
    /*
     * 生成二维码
     * */
    @ReactMethod
    public void createQRCode(final int width,final int height,final Callback successCallback){
        new AsyncTask<Void, Void, Void>() {
            @Override
            protected Void doInBackground(Void... params) {
                try {
                    Bitmap logo=QRCodeHelper.getImageFromAssetsFile(getReactApplicationContext(), R.drawable.icon1);
                    Bitmap bitmap = QRCodeHelper.createQRCode("http://www.baidu.com", width, height, logo);
                    String fileName="boboweiqi.png";
                    FileOutputStream out;
                    //如果存在外置SD卡，保存到外部存储，否则保存到内部存储
                    if(Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)){
                        File sdCardDir = Environment.getExternalStorageDirectory();//获取SDCard目录
                        File saveFile = new File(sdCardDir,fileName);
                        out = new FileOutputStream(saveFile);
                    }else{
                        out = getReactApplicationContext().openFileOutput(fileName,getReactApplicationContext().MODE_PRIVATE);
                    }
                    bitmap.compress(Bitmap.CompressFormat.PNG, 100, out);
                    out.flush();
                    out.close();
                    if (successCallback != null) successCallback.invoke("success");
                }catch(Exception ex){
                    if(successCallback!=null)successCallback.invoke(ex.getMessage());
                }
                return null;
            }
        }.execute();

    }
    /*
     * 扫描二维码
     * */
    @ReactMethod
    public void scanQRCode(final Callback successCallback){
        try {
            Activity activity = this.getCurrentActivity();
            activity.startActivity(new Intent(activity, CaptureActivity.class));
            //Intent result = (Intent)CaptureActivity.myBlockingQueue.take();
            //String strResult = result.getStringExtra("result");
            //if (successCallback != null) successCallback.invoke(strResult);
        }catch(Exception ex){
            if (successCallback != null) successCallback.invoke(false);
        }
    }

}
