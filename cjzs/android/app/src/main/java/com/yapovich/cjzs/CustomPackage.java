package com.yapovich.cjzs;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.yapovich.cjzs.components.Contacts;
import com.yapovich.cjzs.components.SystemInfo;
import com.yapovich.cjzs.components.ToastCustom;
import com.yapovich.cjzs.components.dialog.DialogAndroid;
import com.yapovich.cjzs.components.mediaplayer.ReactMediaPlayerViewManager;
import com.yapovich.cjzs.components.qrcode.QRCodeModule;
import com.yapovich.cjzs.components.sqlite.SQLitePlugin;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by yebo on 2016/7/11.
 */
public class CustomPackage implements ReactPackage {
    private List<NativeModule> modules=new ArrayList<>();
    private List<ViewManager> vms=new ArrayList<>();

    public List<NativeModule> getModules() {
        return modules;
    }

    public List<ViewManager> getVms() {
        return vms;
    }
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        modules.add(new ToastCustom(reactContext));
        modules.add(new SystemInfo(reactContext));
        modules.add(new DialogAndroid(reactContext));
        modules.add(new Contacts(reactContext));
        modules.add(new QRCodeModule(reactContext));
        modules.add(new SQLitePlugin(reactContext));
        return modules;
    }
    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        vms.add(new ReactMediaPlayerViewManager());
        return vms;
    }
}