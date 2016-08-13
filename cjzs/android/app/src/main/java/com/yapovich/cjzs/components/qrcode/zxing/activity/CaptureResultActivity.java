package com.yapovich.cjzs.components.qrcode.zxing.activity;

import android.app.Activity;
import android.graphics.Bitmap;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.widget.SwipeRefreshLayout;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.TextView;

import com.tencent.smtt.sdk.WebChromeClient;
import com.tencent.smtt.sdk.WebSettings;
import com.tencent.smtt.sdk.WebView;
import com.tencent.smtt.sdk.WebViewClient;
import com.yapovich.cjzs.R;
import com.yapovich.cjzs.components.materialrefresh.MaterialRefreshLayout;
import com.yapovich.cjzs.components.materialrefresh.MaterialRefreshListener;

import java.net.URLEncoder;

public class CaptureResultActivity extends Activity implements SwipeRefreshLayout.OnRefreshListener {
    private MaterialRefreshLayout refreshLayout;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_capture_result);

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
        final TextView urlFromTxtView=(TextView)findViewById(R.id.urlFromTxt);
        String url = getIntent().getExtras().getString("result");
        WebView webView = (WebView) findViewById(R.id.capture_webview);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
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
        if(url!=null&&!url.isEmpty())
            webView.loadUrl(url);
    }

    @Override
    public void onRefresh() {

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
