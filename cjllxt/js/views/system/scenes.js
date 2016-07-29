/**
 * Created by yebo on 2016/7/8.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React,{ Component } from 'react';
import {
    Navigator,
    BackAndroid
} from 'react-native';
import Components from "../../components";
var scenes=React.createClass({
    render() {
        var initialRoute={
            name:'welcome',
            delay:1000
        }
        var initialRouteComp={
            welcome:require("./welcome"),
            index:require("./index"),
            list:require("./list"),
            about:require("./about")
        };
        return (
            <Navigator
                initialRoute={initialRoute}
                configureScene={(route, routeStack) =>
                    Navigator.SceneConfigs.PushFromRight}
                renderScene={(route, navigator) => {
                    var Component;
                    this._navigator = navigator;
                    if(route.name&&initialRouteComp[route.name]){
                        Component=initialRouteComp[route.name];
                    }
                    return (<Component {...route} navigator={navigator}></Component>);
                }
                }
            />
        );
    },
    componentDidMount() {
        var navigator = this._navigator;
        BackAndroid.addEventListener('hardwareBackPress', function() {
            //alert(navigator.getCurrentRoutes().length);
            if (navigator && navigator.getCurrentRoutes().length > 1) {
                if(navigator.getCurrentRoutes().length>2) {
                    navigator.pop();
                    return true;
                }else{
                    Components.Dialog.confirm("确定要退出应用程序吗？",()=>{
                        BackAndroid.exitApp(0)
                    });
                    return true;
                }
            }
            return false;
        });
    },
    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    },
});
module.exports=scenes;