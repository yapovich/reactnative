package com.yapovich.cjzs;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.yapovich.cjzs.module.SystemInfo;
import com.yapovich.cjzs.module.ToastCustom;
import com.yapovich.cjzs.vendor.dialog.DialogAndroid;
import com.yapovich.cjzs.vendor.mediaplayer.ReactMediaPlayerViewManager;
import com.yapovich.cjzs.vendor.sqlite.SQLitePlugin;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by yebo on 2016/7/11.
 */
public class CustomPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules=new ArrayList<>();
        modules.add(new ToastCustom(reactContext));
        modules.add(new SystemInfo(reactContext));
        modules.add(new DialogAndroid(reactContext));
        modules.add(new SQLitePlugin(reactContext));
        return modules;
    }
    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> vms=new ArrayList<>();
        vms.add(new ReactMediaPlayerViewManager());
        return vms;
    }
}