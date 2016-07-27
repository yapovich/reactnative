package com.yapovich.cjllxt.viewmanager;

import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.yapovich.cjllxt.component.WheelView;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by yebo on 2016/7/20.
 */
public class WheelViewManager extends SimpleViewManager<WheelView> {
    @Override
    public String getName(){
        return "WheelViewAndroid";
    }

    @Override
    protected WheelView createViewInstance(ThemedReactContext themedReactContext) {
        WheelView view=new WheelView(themedReactContext);
        view.setLayoutParams(new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        return view;
    }
    @ReactProp(name = "items")
    public void setItems(WheelView view,@Nullable String liststr) {
//          if(liststr!=null&&!liststr.isEmpty()) {
//
//              String[] array = liststr.split(",");
//              List<String> list=new ArrayList<String>();
//              for(int i=0;i<array.length;i++){
//                  list.add(array[i]);
//              }
//              view.setOffset(1);
//              view.setItems(list);
//          }
        ArrayList<String> list = new ArrayList<String>();
        list.add("2000");
        list.add("2001");
        list.add("2002");
        view.setLineColor(0xff00ff);
        view.setSelectedColor(0x00ff00);
        view.setControlHeight(200f);
        view.setSelectedFont(48f);
        view.setData(list);
    }
}
