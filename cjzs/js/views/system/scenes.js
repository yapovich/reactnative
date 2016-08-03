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
import Message from "../../message";
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
            update:require("./update"),
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

            if (navigator && navigator.getCurrentRoutes().length > 1) {
                if(navigator.getCurrentRoutes().length>2) {
                    navigator.pop();
                    return true;
                }else{
                    //var indexRoute=navigator.getCurrentRoutes()[1];
                    Message.sendMessage({
                        what:'closeDrawer',
                        handler:(isDrawerOpened)=>{
                            if(!isDrawerOpened){
                                Components.Dialog.show({
                                    content:'确定要退出应用程序吗？',
                                    positiveText: '确定',
                                    negativeText: '取消',
                                    onPositive:()=>BackAndroid.exitApp(0)
                                });

                            }
                        }
                    })
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