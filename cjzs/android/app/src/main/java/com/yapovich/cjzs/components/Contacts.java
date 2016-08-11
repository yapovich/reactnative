package com.yapovich.cjzs.components;


import android.database.Cursor;
import android.provider.ContactsContract;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.yapovich.cjzs.util.Converter;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.HashMap;

/**
 * Created by yebo on 2016/8/9.
 */
public class Contacts extends ReactContextBaseJavaModule {
    public Contacts(ReactApplicationContext reactContext){
        super(reactContext);
    }
    @Override
    public String getName() {
        return "ContactsAndroid";
    }
    @ReactMethod
    public void getAllContacts(Callback successCallback){
        try {
            JSONArray array = new JSONArray();
            Cursor cursor = getReactApplicationContext().getContentResolver().query
                    (
                            ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                            null,
                            null,
                            null,
                            "sort_key COLLATE LOCALIZED asc"

                    );     // 获取手机联系人
            HashMap<String,String> hashMap=new HashMap<String,String>();
            while (cursor.moveToNext()) {

                int indexPeopleName = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME);    // 联系人名称
                int indexPhoneNum = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER);            // 电话号码
                String strPeopleName = cursor.getString(indexPeopleName);
                String strPhoneNum = cursor.getString(indexPhoneNum);
                if(!hashMap.containsKey(strPeopleName)) {
                    hashMap.put(strPeopleName,strPeopleName);
                    JSONObject obj = new JSONObject();
                    obj.put("peopleName", strPeopleName);
                    obj.put("phoneNum", strPhoneNum);
                    array.put(obj);
                }
            }
            if(!cursor.isClosed()){
                cursor.close();
                cursor = null;
            }
            if (successCallback != null)
                successCallback.invoke(Converter.jsonToReact(array));
        }catch(Exception ex){

        }
    }

}
