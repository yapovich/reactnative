package com.yapovich.cjzs.components.qrcode.zxing.activity;

import android.app.Activity;
import android.graphics.Bitmap;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.view.ViewCompat;
import android.support.v4.view.ViewPropertyAnimatorCompat;
import android.support.v4.widget.SwipeRefreshLayout;
import android.view.KeyEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.view.animation.DecelerateInterpolator;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.tencent.smtt.sdk.WebChromeClient;
import com.tencent.smtt.sdk.WebSettings;
import com.tencent.smtt.sdk.WebView;
import com.tencent.smtt.sdk.WebViewClient;
import com.yapovich.cjzs.R;
import com.yapovich.cjzs.components.materialrefresh.MaterialRefreshLayout;
import com.yapovich.cjzs.components.materialrefresh.MaterialRefreshListener;
import com.yapovich.cjzs.util.FormatChecker;

import java.net.URLEncoder;

public class CaptureResultActivity extends Activity{
    private MaterialRefreshLayout refreshLayout;
    private ProgressBar myProgressBar;
    private WebView webView;
    private String ISBNPreUrl="https://api.douban.com/v2/book/isbn/:";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_capture_result);
        myProgressBar=(ProgressBar)findViewById(R.id.myProgressBar);
        refreshLayout = (MaterialRefreshLayout) findViewById(R.id.refresh);
        refreshLayout.setMaterialRefreshListener(new MaterialRefreshListener() {
            @Override
            public void onRefresh(final MaterialRefreshLayout materialRefreshLayout) {
                //����ˢ��...
                refreshLayout.finishRefresh();
            }

            @Override
            public void onRefreshLoadMore(MaterialRefreshLayout materialRefreshLayout) {
                //����ˢ��...
                refreshLayout.finishRefreshLoadMore();
            }
        });
        refreshLayout.setIsOverLay(false);
        refreshLayout.setWaveShow(false);
        refreshLayout.setLoadMore(false);
        //refreshLayout.setBackgroundColor(0x333333);
        refreshLayout.setIsProgressShow(false);
        refreshLayout.setHeader(getLayoutInflater().inflate(R.layout.refresh_webview, null));
        webView = (WebView) findViewById(R.id.capture_webview);
        final TextView urlFromTxtView=(TextView)findViewById(R.id.urlFromTxt);
        String url = getIntent().getExtras().getString("result");
        if(url!=null&&!url.isEmpty()) {
            WebSettings webSettings = webView.getSettings();
            webSettings.setJavaScriptEnabled(true);
            webSettings.setPluginsEnabled(true);
            webSettings.setSupportZoom(true);  //支持缩放
            webSettings.setDefaultTextEncodingName("utf-8");
            webView.setWebViewClient(new WebViewClient() {
                @Override
                public boolean shouldOverrideUrlLoading(WebView view, String url) {
                    view.loadUrl(url);
                    return true;
                }

                @Override
                public void onPageStarted(WebView webView, String s, Bitmap bitmap) {
                    super.onPageStarted(webView, s, bitmap);
                    //if(!textView.getText().toString().isEmpty())
                    try {
                        urlFromTxtView.setText("网页由" + GetUrlRelativePath(s) + "提供");
                    } catch (Exception ex) {

                    }
                }
            });
            webView.setWebChromeClient(new WebChromeClient() {
                //进度处理
                @Override
                public void onProgressChanged(WebView webView, int i) {
                    if (i == 100) {
                        myProgressBar.setProgress(i);
                        ViewPropertyAnimatorCompat viewPropertyAnimatorCompat = ViewCompat.animate(myProgressBar);
                        viewPropertyAnimatorCompat.setDuration(200);
                        viewPropertyAnimatorCompat.alpha(0);
                        viewPropertyAnimatorCompat.setInterpolator(new DecelerateInterpolator());
                        viewPropertyAnimatorCompat.start();
                    } else {
                        myProgressBar.setAlpha(1);
                        myProgressBar.setVisibility(View.VISIBLE);
                        myProgressBar.setProgress(i);
                    }
                }
            });

            if(FormatChecker.checkISBN(url)){ //如果是ISBN条形码，获取ISBN详细信息
                webView.loadUrl(ISBNPreUrl+url);
            }else if(url.indexOf("http")>-1){//如果是网址，直接访问
               webView.loadUrl(url);
            }else{//其他情况直接显示扫描结果
               webView.loadData(url, "text/plain", "utf-8");
            }
        }
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if ((keyCode == KeyEvent.KEYCODE_BACK) && webView.canGoBack()) {
            webView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    private String GetUrlRelativePath(String urlString) {
        int index = urlString.indexOf("://");
        if (index != -1) {
            urlString = urlString.substring(index + 3);
        }
        index = urlString.indexOf("/");
        if (index != -1) {
            urlString = urlString.substring(0, index);
        }
        return urlString;
    }
}
