package com.yapovich.vendor.baidumap;

import android.app.ActivityManager;
import android.content.Context;
import android.widget.Toast;

import com.baidu.mapapi.SDKInitializer;
import com.baidu.mapapi.map.BaiduMap;
import com.baidu.mapapi.map.MapView;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.yapovich.cjllxt.MainActivityManager;

/**
 * Created by yebo on 2016/7/30.
 */
public class BaiduMapViewManager extends SimpleViewManager<MapView> {
    private Context mContext;
    private boolean isMapLoaded;
    @Override
    public String getName() {
        return "RCTBaiduMapAndroid";
    }

    @Override
    protected MapView createViewInstance(ThemedReactContext themedReactContext) {
        SDKInitializer.initialize(themedReactContext.getApplicationContext());
        MapView view=new MapView(MainActivityManager.getInstance().getCurrentActivity());
        view.getMap().setOnMapLoadedCallback(new BaiduMap.OnMapLoadedCallback() {
            @Override
            public void onMapLoaded() {
                BaiduMapViewManager.this.isMapLoaded = true;
            }
        });
        this.mContext = themedReactContext;
        //mapView.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,ViewGroup.LayoutParams.MATCH_PARENT));
        return view;
    }
    @ReactProp(name="zoomEnabled", defaultBoolean = true)
    public void setZoomEnabled(MapView mapView, Boolean enable) {
        mapView.getMap().getUiSettings().setZoomGesturesEnabled(enable);
    }
}
