package com.yapovich.cjzs;

import android.content.pm.ActivityInfo;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.Window;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;
import com.yapovich.cjzs.util.MessageProxy;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "cjzs";
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        final Window window = getWindow();
        //?????????
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
                if (msg != null) {
                    if (msg.what == MessageProxy.SCREEN_NOT_FULL) {//??????
                        window.setFlags(
                                WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN,
                                WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
                    } else if (msg.what == MessageProxy.SCREEN_FULL) {//???
                        window.setFlags(
                                WindowManager.LayoutParams.FLAG_FULLSCREEN,
                                WindowManager.LayoutParams.FLAG_FULLSCREEN);
                    } else if (msg.what == MessageProxy.SCREEN_ORIENTATION_LANDSCAPE) {//????
                        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
                    } else if (msg.what == MessageProxy.SCREEN_ORIENTATION_PORTRAIT) {//????
                        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
                    }
                }
            }
        };
        MessageProxy.registerHandler("mainActivityHandler",handler);
    }
}
