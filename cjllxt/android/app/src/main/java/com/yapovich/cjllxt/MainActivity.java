package com.yapovich.cjllxt;

import android.content.pm.ActivityInfo;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.facebook.react.views.scroll.ReactScrollView;
import com.facebook.react.views.text.ReactTextView;
import com.facebook.react.views.view.ReactViewGroup;
import com.yapovich.cjllxt.module.MessageProxy;
import com.yapovich.vendor.slidingmenu.SlidingMenu;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "cjllxt";
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Log.d("采集录入系统Activity", getClass().getSimpleName());
        super.onCreate(savedInstanceState);
        final Window window = getWindow();
        //初始化时全屏
        window.setFlags(
                WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            window.setFlags(
                    WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS,
                    WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        }
        Handler handler = new Handler() {
            @Override
            public void handleMessage(Message msg) {
                if(msg!=null) {
                    if (msg.what == MessageProxy.SCREEN_NOT_FULL) {//取消全屏
                        window.setFlags(
                                WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN,
                                WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
                    } else if (msg.what == MessageProxy.SCREEN_FULL) {//全屏
                        window.setFlags(
                                WindowManager.LayoutParams.FLAG_FULLSCREEN,
                                WindowManager.LayoutParams.FLAG_FULLSCREEN);
                    }
                    else if (msg.what == MessageProxy.SCREEN_ORIENTATION_LANDSCAPE) {//横屏
                        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
                    } else if (msg.what == MessageProxy.SCREEN_ORIENTATION_PORTRAIT) {//竖屏
                        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
                    }else if (msg.what == MessageProxy.SLIDINGMENU_CREATE) {//显示侧边栏
                        createSlidingMenu();
                    }else if (msg.what == MessageProxy.SLIDINGMENU_SHOW) {//显示侧边栏
                        showSlidingMenu();
                    }else if (msg.what == MessageProxy.SLIDINGMENU_HIDE) {//隐藏侧边栏
                        hideSlidingMenu();
                    }
                }
            }
        };
        MessageProxy.registerHandler("mainActivityHandler", handler);
    }
    private SlidingMenu menu;
    private void createSlidingMenu(){
        if(menu==null) {
            menu = new SlidingMenu(this);
            menu.setMode(SlidingMenu.LEFT);
            menu.setTouchModeAbove(SlidingMenu.TOUCHMODE_NONE);
            menu.setShadowWidthRes(R.dimen.shadow_width);
            menu.setShadowDrawable(R.drawable.shadow);
            menu.setBehindOffsetRes(R.dimen.slidingmenu_offset);
            menu.setFadeDegree(0.35f);
            menu.attachToActivity(this, SlidingMenu.SLIDING_CONTENT);
            //menu.setMenu(R.layout.slidingmenumain);
        }
    }
    private void showSlidingMenu(){
        if(menu!=null)
            menu.toggle();
    }
    private void hideSlidingMenu(){

    }
}
