package com.yapovich.cjllxt.module;

import android.os.Handler;
import android.os.Message;

import java.util.HashMap;
import java.util.Iterator;

/**
 * Created by yebo on 2016/7/27.
 */
public class MessageProxy {
    private static HashMap<String,Handler> handlers=new  HashMap<String,Handler>();
    public static void registerHandler(String name,Handler handler){
        handlers.put(name,handler);
    }
    public static void sendMessage(Message msg){
        Iterator iterator=handlers.values().iterator();
        while (iterator.hasNext()){
            Handler handler=(Handler)iterator.next();
            handler.sendMessage(msg);
        }
    }
}
