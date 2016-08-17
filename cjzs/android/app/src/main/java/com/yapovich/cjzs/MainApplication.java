package com.yapovich.cjzs;

import android.app.Activity;
import android.app.Application;
import android.os.Bundle;
import android.support.multidex.MultiDexApplication;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.yapovich.cjzs.components.sqlite.SQLitePlugin;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {
  private CustomPackage customPackage=null;
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      customPackage=new CustomPackage();
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(), customPackage
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }

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
         /*if(customPackage!=null) {
           int len=customPackage.getModules().size();
           if(len>0) {
             SQLitePlugin sqLitePlugin = (SQLitePlugin) customPackage.getModules().get(len - 1);
             //sqLitePlugin.closeAllOpenDatabases();
             //Toast.makeText(activity.getApplicationContext(),"关闭所有数据库连接",Toast.LENGTH_LONG);
           }
         }*/
      }
    });
  }
}
