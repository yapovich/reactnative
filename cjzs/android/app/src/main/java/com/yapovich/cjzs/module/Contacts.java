package com.yapovich.cjzs.module;


import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;
import com.yapovich.cjzs.util.Converter;

import org.json.JSONArray;
import org.json.JSONObject;

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
            for (int i = 0; i < 10; i++) {
                JSONObject obj = new JSONObject();
                obj.put("name", "Ò¶²¨");
                obj.put("tel", "18969196213");
                array.put(obj);
            }
            if (successCallback != null)
                successCallback.invoke(Converter.jsonToReact(array));
        }catch(Exception ex){

        }
    }

}
