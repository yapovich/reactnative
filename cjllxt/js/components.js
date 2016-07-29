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
    /*常用操作*/
    //对话框
    get Dialog(){
        var dialog=require('./components/Dialog');
        var global=this.global;
        return {
          //确认对话框
          confirm(msg,okAction){
              global.showModal(dialog.confirm(msg,()=>{
                  global.hideModal();
                  if(okAction)
                      okAction();
              },()=>{
                  global.hideModal();
              }));
          }
      }
    }
}
module.exports=components;