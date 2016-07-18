/**
 * Created by yebo on 2016/7/14.
*/
import {
    NativeModules
} from 'react-native';
var components={
    get BottomNavigator(){return require('./components/BottomNavigator')},//底部导航复合组件
    get NavigatorBar(){return require('./components/NavigatorBar')},//导航条
    get Icon(){return require('./components/Icon')},//导航条
    get IconBar(){return require('./components/IconBar')},//图标操作栏
    get FlexLayout(){return require('./components/FlexLayout')},//flex布局视图
    get TextInput(){return require('./components/TextInput')},//文本输入框
    //获取本地模块
    get ToastCustomAndroidNative(){return NativeModules.ToastCustomAndroid}
}
module.exports=components;