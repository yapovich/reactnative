package com.yapovich.vendor;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.yapovich.vendor.baidumap.BaiduMapViewManager;
import com.yapovich.vendor.dialog.DialogAndroid;
import com.yapovich.vendor.mediaplayer.ReactMediaPlayerViewManager;
import com.yapovich.vendor.slidingmenu.SlidingMenuViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by yebo on 2016/7/11.
 */
public class VendorPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules=new ArrayList<>();
        modules.add(new DialogAndroid(reactContext));
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
        vms.add(new SlidingMenuViewManager());
        vms.add(new BaiduMapViewManager());
        return vms;
    }
}