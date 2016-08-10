package com.yapovich.cjzs.util;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.drawable.Drawable;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import java.io.IOException;
import java.io.InputStream;
import java.util.Hashtable;

/**
 * Created by yebo on 2016/8/10.
 */
public class QRCodeHelper {
    //private static final int IMAGE_HALFWIDTH = 40;//宽度值，影响中间图片大小
    /*
    扫描二维码
     */
    public static void scanQRCode(Activity activity){
    }
    /*
    创建二维码(带LOGO)
    */
    public static Bitmap createQRCode(String content,int width,int height,Bitmap bitmap){
        try {
            int IMAGE_HALFWIDTH=width/20;
            Matrix m = new Matrix();
            float sx = (float) 2 * IMAGE_HALFWIDTH / bitmap.getWidth();
            float sy = (float) 2 * IMAGE_HALFWIDTH / bitmap.getHeight();
            m.setScale(sx, sy);//设置缩放信息
            //将logo图片按martix设置的信息缩放
            bitmap = Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(), bitmap.getHeight(), m, false);
            MultiFormatWriter writer = new MultiFormatWriter();
            Hashtable hst = new Hashtable();
            hst.put(EncodeHintType.CHARACTER_SET, "UTF-8");//设置字符编码
            BitMatrix matrix = writer.encode(content, BarcodeFormat.QR_CODE, width, height, hst);//生成二维码矩阵信息
            int halfW = width / 2;
            int halfH = height / 2;
            int[] pixels = new int[width * height];//定义数组长度为矩阵高度*矩阵宽度，用于记录矩阵中像素信息
            for (int y = 0; y < height; y++) {//从行开始迭代矩阵
                for (int x = 0; x < width; x++) {//迭代列
                    if (x > halfW - IMAGE_HALFWIDTH && x < halfW + IMAGE_HALFWIDTH
                            && y > halfH - IMAGE_HALFWIDTH
                            && y < halfH + IMAGE_HALFWIDTH) {//该位置用于存放图片信息
                        //记录图片每个像素信息
                        pixels[y * width + x] = bitmap.getPixel(x - halfW
                                + IMAGE_HALFWIDTH, y - halfH + IMAGE_HALFWIDTH);
                    } else {
                        if (matrix.get(x, y)) {//如果有黑块点，记录信息
                            pixels[y * width + x] = Color.BLACK;//记录黑块信息
                        }else{
                            pixels[y * width + x] = Color.WHITE;//记录黑块信息
                        }
                    }
                }
            }
            Bitmap _bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.RGB_565);
            // 通过像素数组生成bitmap
            _bitmap.setPixels(pixels, 0, width, 0, 0, width, height);
            return _bitmap;
        }catch (WriterException ex) {
        }
        return null;
    }
    /*
    创建二维码(无LOGO)
    */
    public static Bitmap createQRCode(String content,int width,int height) {
        try {
            QRCodeWriter writer = new QRCodeWriter();
            BitMatrix matrix = writer.encode(content, BarcodeFormat.QR_CODE, width, height);
            int w = matrix.getWidth();
            int h = matrix.getHeight();
            int[] rawData = new int[w * h];
            for (int i = 0; i < w; i++) {
                for (int j = 0; j < h; j++) {
                    int color = Color.WHITE;
                    if (matrix.get(i, j)) {
                        color = Color.BLACK;
                    }
                    rawData[i + (j * w)] = color;
                }
            }
            Bitmap bitmap = Bitmap.createBitmap(w, h, Bitmap.Config.RGB_565);
            bitmap.setPixels(rawData, 0, w, 0, 0, w, h);
            return bitmap;
        } catch (WriterException ex) {
        }
        return null;
    }
    public static Bitmap getImageFromAssetsFile(Context context,int id)
    {
        return  BitmapFactory.decodeResource(context.getResources(), id);
    }
}
