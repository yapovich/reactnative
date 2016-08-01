package com.yapovich.cjllxt;

import android.app.Activity;
import android.app.Application;
import android.os.Bundle;
import android.util.Log;

import com.baidu.mapapi.SDKInitializer;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.yapovich.vendor.VendorPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
    @Override
    public void onCreate() {
        registerActivityLifecycleCallbacks(new ActivityLifecycleCallbacks() {
            @Override
            public void onActivityCreated(Activity activity, Bundle savedInstanceState) {
            }
            @Override
            public void onActivityStarted(Activity activity) {
            }
            @Override
            public void onActivityResumed(Activity activity) {
                MainActivityManager.getInstance().setCurrentActivity(activity);
            }
            @Override
            public void onActivityPaused(Activity activity) {

            }
            @Override
            public void onActivityStopped(Activity activity) {

            }

            @Override
            public void onActivitySaveInstanceState(Activity activity, Bundle outState) {

            }

            @Override
            public void onActivityDestroyed(Activity activity) {

            }
        });
    }
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {

      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new CustomPackage(),
              new VendorPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
