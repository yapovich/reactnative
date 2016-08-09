/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React,{ Component } from 'react';
import {
    AppRegistry,
    Navigator,
    BackAndroid,
    Alert,
    NativeModules
} from 'react-native';
import Components from "./js/components";
import Message from "./js/message";
var ToastCustomAndroid= NativeModules.ToastCustomAndroid;
var cjzs=React.createClass({
  render() {

    var initialRouteStack=[
      {name:'index'},
      {name:'list'}
    ]
    var allRouteComp={
      welcome:require("./js/views/system/welcome"),
      index:require("./js/views/system/index"),
      list:require("./js/views/system/list"),
      update:require("./js/views/system/update"),
      about:require("./js/views/system/about")
    };
    return (
        <Navigator
            ref={(nav)=>this.nav=nav}
            initialRouteStack={initialRouteStack}
            configureScene={(route, routeStack) => {
              return route.name=="welcome"?
                  Navigator.SceneConfigs.FloatFromLeft:
                  Navigator.SceneConfigs.PushFromRight;
            }}
            renderScene={(route, navigator) => {
              var Component;
              this._navigator = navigator;
              if(route.name&&allRouteComp[route.name]){
                Component=allRouteComp[route.name];
              }
              return (<Component {...route} navigator={navigator}></Component>);
            }
            }
        />
    );
  },
  componentDidMount() {
    var navigator = this._navigator;
    var flag=false;
    BackAndroid.addEventListener('hardwareBackPress', function() {
      var len=navigator.getCurrentRoutes().length;
      if (navigator && len > 0 && navigator.getCurrentRoutes()[len-1].name!="welcome") {
        if(len>1) {
          navigator.pop();
          return true;
        }else{
          //var indexRoute=navigator.getCurrentRoutes()[1];
          Message.sendMessage({
            what:'closeDrawer',
            handler:(isDrawerOpened)=>{
              if(!isDrawerOpened){
                if(!flag) {
                  flag=true;
                  Components.Toast.short("再按一次退出程序哦！");
                  setTimeout(()=>flag=false,2000);
                }else{
                  Components.Toast.cancel();
                  BackAndroid.exitApp(0)
                }
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
AppRegistry.registerComponent('cjzs', () => cjzs);
