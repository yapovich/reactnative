package com.yapovich.cjzs.components.qrcode.zxing.activity;

import android.app.Activity;
import android.os.Bundle;
import android.support.v4.widget.SwipeRefreshLayout;
import android.webkit.WebView;

import com.yapovich.cjzs.R;

public class CaptureResultActivity extends Activity implements SwipeRefreshLayout.OnRefreshListener {
    private SwipeRefreshLayout mSwipeRefreshWidget;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_capture_result);


        String url=getIntent().getExtras().getString("result");
        WebView webView=(WebView)findViewById(R.id.capture_webview);
        if(url!=null)
          webView.loadUrl(url);
    }

    @Override
    public void onRefresh() {

    }
}
