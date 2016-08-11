package com.yapovich.cjzs.components;

import android.os.Handler;
import android.os.Message;

import java.util.HashMap;
import java.util.Iterator;

/**
 * Created by yebo on 2016/7/27.
 */
public class MessageProxy {
    public final static int SCREEN_NOT_FULL=101;
    public final static int SCREEN_FULL=102;
    public final static int SCREEN_ORIENTATION_LANDSCAPE=103;
    public final static int SCREEN_ORIENTATION_PORTRAIT=104;
    public final static int SLIDINGMENU_CREATE=105;
    public final static int SLIDINGMENU_SHOW=106;
    public final static int SLIDINGMENU_HIDE=107;

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
