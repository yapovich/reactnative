package com.yapovich.cjllxt.component;

import android.content.Context;
import android.graphics.Typeface;
import android.util.AttributeSet;
import android.widget.TextView;


/**
 * Created by yebo on 2016/1/26.
 */
public class IconTextView extends TextView {
    private Typeface font;
    public IconTextView(Context context){
        super(context);
    }
    public IconTextView(Context context, AttributeSet attrs)
    {
        super(context, attrs);
        font = Typeface.createFromAsset(context.getAssets(), "fonts/fontawesome.ttf");
        this.setTypeface(font);
    }
}
