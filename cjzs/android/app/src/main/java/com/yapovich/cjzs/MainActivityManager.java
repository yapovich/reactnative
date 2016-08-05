package com.yapovich.cjzs;

import android.app.Activity;

import java.lang.ref.WeakReference;

/**
 * Created by Administrator on 2016/8/5.
 */
public class MainActivityManager  {
    private static MainActivityManager sInstance = new MainActivityManager();
    private WeakReference<Activity> sCurrentActivityWeakRef;


    private MainActivityManager() {

    }

    public static MainActivityManager getInstance() {
        return sInstance;
    }

    public Activity getCurrentActivity() {
        Activity currentActivity = null;
        if (sCurrentActivityWeakRef != null) {
            currentActivity = sCurrentActivityWeakRef.get();
        }
        return currentActivity;
    }

    public void setCurrentActivity(Activity activity) {
        sCurrentActivityWeakRef = new WeakReference<Activity>(activity);
    }


}
