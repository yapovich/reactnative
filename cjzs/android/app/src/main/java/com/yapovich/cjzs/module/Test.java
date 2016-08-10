package com.yapovich.cjzs.module;


import android.database.Cursor;
import android.graphics.Bitmap;
import android.os.AsyncTask;
import android.os.Environment;
import android.provider.ContactsContract;
import android.util.Log;

import com.facebook.imageutils.BitmapUtil;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.yapovich.cjzs.R;
import com.yapovich.cjzs.util.Converter;
import com.yapovich.cjzs.util.QRCodeHelper;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.HashMap;

/**
 * Created by yebo on 2016/8/9.
 */
public class Test extends ReactContextBaseJavaModule {
    public Test(ReactApplicationContext reactContext){
        super(reactContext);
    }
    @Override
    public String getName() {
        return "TestAndroid";
    }
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

}
