package com.yapovich.vendor.slidingmenu;

import android.os.Message;
import android.view.View;
import android.widget.Toast;

import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.image.ReactImageView;
import com.facebook.react.views.scroll.ReactScrollView;
import com.facebook.react.views.text.ReactTextView;
import com.facebook.react.views.view.ReactViewGroup;
import com.yapovich.cjllxt.module.MessageProxy;

/**
 * Created by yebo on 2016/7/29.
 */
public class SlidingMenuViewManager extends ViewGroupManager<ReactScrollView> {
    public static final String REACT_CLASS = "RCTSlidingMenuView";
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected ReactScrollView createViewInstance(ThemedReactContext themedReactContext) {
        Message msg=new Message();
        msg.what= MessageProxy.SLIDINGMENU_CREATE;
        MessageProxy.sendMessage(msg);
        return new ReactScrollView(themedReactContext);
    }
    @ReactProp(
            name = "visible"
    )
    public void setVisible(ReactScrollView view, boolean visible) {
        if(visible){
            Message msg=new Message();
            msg.what= MessageProxy.SLIDINGMENU_SHOW;
            MessageProxy.sendMessage(msg);
        }
    }
}
