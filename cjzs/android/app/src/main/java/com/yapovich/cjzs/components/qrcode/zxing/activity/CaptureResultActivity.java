package com.yapovich.cjzs.components.qrcode.zxing.activity;

import android.app.Activity;
import android.os.Bundle;
import android.support.v4.widget.SwipeRefreshLayout;
import android.view.View;
import android.webkit.WebView;

import com.yapovich.cjzs.R;
import com.yapovich.cjzs.components.materialrefresh.MaterialRefreshLayout;
import com.yapovich.cjzs.components.materialrefresh.MaterialRefreshListener;

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
        String url = getIntent().getExtras().getString("result");
        WebView webView = (WebView) findViewById(R.id.capture_webview);
        if (url != null)
            webView.loadUrl(url);
    }

    @Override
    public void onRefresh() {

    }
}
