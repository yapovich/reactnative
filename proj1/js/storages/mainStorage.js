/**
 * Created by yebo on 2016/7/14.
 */
import React from 'react';
import {
    AsyncStorage,
    NativeModules
} from 'react-native';
import HashMap from '../entries/HashMap';
var ToastCustomAndroid= NativeModules.ToastCustomAndroid;
var STORAGE_KEY='@MainStorage:';
module.exports={
    //获取文件夹信息
    getFolders(cb){
        var name="Folders";
        AsyncStorage.getItem(STORAGE_KEY+name,(err,result)=>{
            if(result) {
                ToastCustomAndroid.show("OK，我是已经存在的数据", ToastCustomAndroid.SHORT);
                if(cb){
                    var json=JSON.parse(result)
                    var rs=[];
                    for(var key in json){
                      rs.push(json[key]);
                    }
                    cb(rs);
                }

            }
            else {
                ToastCustomAndroid.show("我还不存在，开始创建吧", ToastCustomAndroid.SHORT);
                var result={}
                var rs=[];

                for(var i=0;i<10;i++) {
                    var propName="folder_"+(Math.random()+"").replace('.','');
                    result[propName]={name: '波波维奇'+(i+1), createdTime: new Date().toDateString(), count: 20};
                    rs.push(result[propName]);
                }
                AsyncStorage.setItem(STORAGE_KEY + name, JSON.stringify(result),()=>{
                    if(cb)
                        cb(rs);
                })
            }
        });
    },
    addFolder(folderData,cb){
        if(folderData){

        }
    }
}