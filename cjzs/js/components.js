/**
 * Created by yebo on 2016/7/14.
*/
import React from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    NativeModules
} from 'react-native';
var components={
    //二维码模块------------------------------------------------------------
    get QRCode(){
        return {
            createQRCode(width,height,cb){
                NativeModules.RCTQRCodeAndroid.createQRCode(width,height,cb)
            },
            scanQRCode(cb){
                NativeModules.RCTQRCodeAndroid.scanQRCode(cb)
            }
        }
    },
    //Material Design风格组件------------------------------------------------------------
    get MD(){return require('./components/MaterialDesign/index')},
    //数据存储组件------------------------------------------------------------
    get DAO(){return require('./storages/dao/index')},
    //模块组件------------------------------------------------------------
    get Toast(){
        return {
            short(text){
                NativeModules.ToastCustomAndroid.show(text,NativeModules.ToastCustomAndroid.SHORT)
            },
            long(text){
                NativeModules.ToastCustomAndroid.show(text,NativeModules.ToastCustomAndroid.LONG)
            },
            cancel(){
                NativeModules.ToastCustomAndroid.cancel();
            }
        }
    },
    //视图组件------------------------------------------------------------
    get SlidingMenu(){return require('./components/SlidingMenu')},
    get MediaPlayer(){return require('./components/MediaPlayer/index')},//媒体播放器
    get AutoPlayBanner(){return require('./components/AutoPlayBanner')},//自动播放公告板
    get GridNavigator(){return require('./components/GridNavigator')},//网格导航复合组件
    get ListNavigator(){return require('./components/ListNavigator')},//列表导航复合组件
    get BottomNavigator(){return require('./components/BottomNavigator')},//底部导航复合组件
    get NavigatorBar(){return require('./components/NavigatorBar')},//导航条
    get Icon(){return require('./components/Icon')},//导航条
    get IconBar(){return require('./components/IconBar')},//图标操作栏
    get FlexLayout(){return require('./components/FlexLayout')},//flex布局视图
    /*表单组件*/
    get FormTextInput(){return require('./components/FormTextInput')},//文本输入框
    get FormCheckbox(){return require('./components/FormCheckbox')},//多选框
    get FormRadio(){return require('./components/FormRadio')},//单选框
    get FormPicker(){return require('./components/FormPicker')},//下拉框
    get FormDatePicker(){return require('./components/FormDatePicker')},//日期输入框
    get FormTimePicker(){return require('./components/FormTimePicker')},//时间输入框
    /*其他组件*/
    get BaiduMap(){return require('./components/BaiduMap')},
    /*常用操作*/
    //对话框
    get Dialog() {return new (require('./components/Dialog'))}
}
module.exports=components;