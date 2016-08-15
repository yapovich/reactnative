package com.yapovich.cjzs.components.sqlite;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;

/** 
 * ����SQLite���ݿ⣬����excel�ļ�
 * 
 * Created by liyu on 2015-9-8
 */
public class SqliteToExcel{

	private Context mContext;
	private SQLiteDatabase database;
	private String mDbName;
	private ExportListener mListener;
	private String mExportPath;
	
	private final static int MESSAGE_START = 0;
	private final static int MESSAGE_COMPLETE = 1;
	private final static int MESSAGE_ERROR = 2;
	
	/**
	 * ���캯��
	 * @param context ������
	 * @param dbName ���ݿ�����
	 */
	public SqliteToExcel(Context context,String dbName){
		mContext = context;
		mDbName = dbName;
		mExportPath = Environment.getExternalStorageDirectory().toString()+File.separator;
		try {
			database = SQLiteDatabase.openOrCreateDatabase(mContext.getDatabasePath(mDbName).getAbsolutePath(), null);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * 
	 * @param context ������
	 * @param dbName ���ݿ�����
	 * @param exportPath �����ļ���·�����������ļ�����
	 */
	public SqliteToExcel(Context context,String dbName,String exportPath){
		mContext = context;
		mDbName = dbName;
		mExportPath = exportPath;
		try {
			database = SQLiteDatabase.openOrCreateDatabase(mContext.getDatabasePath(mDbName).getAbsolutePath(), null);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * ��ȡ���ݿ������б���
	 * @return
	 */
	private ArrayList<String> getAllTables(){
		ArrayList<String> tables=new ArrayList<String>();
		Cursor cursor = database.rawQuery("select name from sqlite_master where type='table' order by name", null); 
		while(cursor.moveToNext()){  
			tables.add(cursor.getString(0));
	    }
		cursor.close();
		return tables;
	}
	
	/**
	 * ��ȡһ�������������
	 * @param table
	 * @return
	 */
	private ArrayList<String> getColumns(String table){
		ArrayList<String> columns=new ArrayList<String>();
		Cursor cursor = database.rawQuery("PRAGMA table_info("+table+")", null);
		while(cursor.moveToNext()){  
			columns.add(cursor.getString(1));
	    }
		cursor.close();
		return columns;
	}
	
	/**
	 * �������ݿ��е�����excel�ļ�
	 * @param table ����
	 * @param fileName ���ɵ�excel�ļ���
	 */
	private void exportItems(String table,String fileName){
		mHandler.sendEmptyMessage(MESSAGE_START);
		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFSheet sheet = workbook.createSheet(table);
		createSheet(table, sheet);
		FileOutputStream fos = null;
		try {
			File file = new File(mExportPath, fileName);
			fos = new FileOutputStream(file);
			workbook.write(fos);
		} catch (Exception e) {
			e.printStackTrace();
			mHandler.sendEmptyMessage(MESSAGE_ERROR);
		}finally{
			if (fos != null) 
            {
                try 
                {
                    fos.flush();
                    fos.close();
                }
                catch (IOException e) 
                {
                    e.printStackTrace();
                    mHandler.sendEmptyMessage(MESSAGE_ERROR);
                }
            }
		}
		try {
			workbook.close();
			mHandler.sendEmptyMessage(MESSAGE_COMPLETE);
		} catch (IOException e) {
			e.printStackTrace();
			mHandler.sendEmptyMessage(MESSAGE_ERROR);
		}
	}
	
	/**
	 * �������ݿ������б�excel�ļ�
	 * @param fileName ���ɵ�excel�ļ���
	 */
	private void exportAllItems(String fileName){
		mHandler.sendEmptyMessage(MESSAGE_START);
		ArrayList<String> tables = getAllTables();
		HSSFWorkbook workbook = new HSSFWorkbook();
		for(int i = 0;i<tables.size();i++){
			HSSFSheet sheet = workbook.createSheet(tables.get(i));
			createSheet(tables.get(i), sheet);
		}
		FileOutputStream fos = null;
		try {
			File file = new File(mExportPath, fileName);
			fos = new FileOutputStream(file);
			workbook.write(fos);
		} catch (Exception e) {
			e.printStackTrace();
			mHandler.sendEmptyMessage(MESSAGE_ERROR);
		}finally{
			if (fos != null) 
            {
                try 
                {
                    fos.flush();
                    fos.close();
                }
                catch (IOException e) 
                {
                    e.printStackTrace();
                    mHandler.sendEmptyMessage(MESSAGE_ERROR);
                }
            }
		}
		try {
			workbook.close();
			mHandler.sendEmptyMessage(MESSAGE_COMPLETE);
		} catch (IOException e) {
			e.printStackTrace();
			mHandler.sendEmptyMessage(MESSAGE_ERROR);
		}
	}
	
	/**
	 * ��ʼ���������������
	 * @param table ����
	 * @param fileName ���ɵ�excel�ļ���
	 * @param listener ���������
	 */
	public void startExportSingleTable(final String table,final String fileName,ExportListener listener){
		mListener = listener;
		new Thread(new Runnable() {
			
			@Override
			public void run() {
				exportItems(table, fileName);
			}
		}).start();
	}
	
	/**
	 * ��ʼ�������б�ĵ�����
	 * @param fileName ���ɵ�excel�ļ���
	 * @param listener ���������
	 */
	public void startExportAllTables(final String fileName,ExportListener listener){
		mListener = listener;
		new Thread(new Runnable() {
			
			@Override
			public void run() {
				exportAllItems(fileName);
			}
		}).start();
	}
	
	/**
	 * ����excel��sheet
	 * @param table ���ݿ����
	 * @param sheet �������е�sheet
	 */
	private void createSheet(String table,HSSFSheet sheet){
		HSSFRow rowA = sheet.createRow(0);
		ArrayList<String> columns = getColumns(table);
		for(int i = 0; i<columns.size();i++){
			HSSFCell cellA = rowA.createCell(i);
			cellA.setCellValue(new HSSFRichTextString(""+columns.get(i)));
		}
		insertItemToSheet(table, sheet, columns);
	}
	
	/**
	 * �������ݵ��������е�sheet
	 * @param table ���ݿ����
	 * @param sheet �������е�sheet
	 * @param columns ������
	 */
	private void insertItemToSheet(String table,HSSFSheet sheet,ArrayList<String> columns){
		Cursor cursor = database.rawQuery("select * from "+table, null);
		cursor.moveToFirst();
		int n=1;
		while(!cursor.isAfterLast())
		{
			HSSFRow rowA = sheet.createRow(n);
			for(int j=0;j<columns.size();j++){
			    HSSFCell cellA = rowA.createCell(j);
			    cellA.setCellValue(new HSSFRichTextString(cursor.getString(j)));
			}
			n++;
			cursor.moveToNext();
		}
		cursor.close();
	}
	
	/**
	 * ����������ӿ�
	 * @author yu.li
	 *
	 */
	public interface ExportListener{
		void onStart();
		void onComplete();
		void onError();
	}

	private Handler mHandler = new Handler() {  
        @Override  
        public void handleMessage(Message msg) {  
            super.handleMessage(msg);  
            int msgId = msg.what;  
            switch (msgId) {  
                case MESSAGE_START:
                	mListener.onStart();
                    break;    
                case MESSAGE_COMPLETE:
                	mListener.onComplete();
                	break;
                case MESSAGE_ERROR:
                	mListener.onError();
                	break;
            }  
        }  
    };
}
