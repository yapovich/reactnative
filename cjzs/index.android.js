/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Text,
    Modal,
    NativeModules,
    ScrollView,
    Alert,
    Image
} from 'react-native';
import Scenes from "./js/views/system/scenes";
import Environment from "./js/environment";
import Components from "./js/components";
var SystemInfo=NativeModules.SystemInfoAndroid;
var cjzs=React.createClass({
  getInitialState() {
    return {
      inited: false,
      comein: false
    };
  },
  handleComeinBtn(){
    this.setState({comein: true});
  },
  render() {
    var WelCome=require("./js/views/system/welcome");
    var comp = <Scenes></Scenes>
    return (this.state.inited ?
            <View style={{flex: 1}}>
              {comp}
            </View> :
            <WelCome loading={true}/>
    );
    /*
     return (
     <View style={{flex:1}}>
     <Components.MD.Toolbar
     icon="menu"
     theme="dark"
     title="采集录入系统"
     actions={[
     {icon:'add',onPress:()=>Components.Dialog.show({content:'cctv'})}
     ]}
     />
     <Components.MD.Avatar
     icon="add"
     size={30}
     backgroundColor="#333"
     />
     <View style={{justifyContent:'center',alignItems:'flex-end'}}>
     <Components.MD.IconToggle
     color="#ff0000"
     percent={50}
     badge={{
     value:99
     }}
     >
     <Components.MD.Icon
     name="email"
     size={36}
     />
     </Components.MD.IconToggle>
     </View>
     </View>
     );*/
  },
  componentDidMount(){
    Components.global=this;
    SystemInfo.getInfo((info)=>{
      var json=JSON.parse(info);
      Environment.ANDROID_VERSION_CODE=json.androidVersionCode;
      Environment.APP_VERSION_CODE=json.appVersionCode;
      Environment.APP_VERSION_NAME=json.appVersionName;
      if(Environment.ANDROID_VERSION_CODE>=19)
        Environment.IMMERSE_OFFSET=25
      this.setState({inited:true});
      //alert("安卓版本："+systeminfo.ANDROID_VERSION_CODE+";应用程序版本："+systeminfo.APP_VERSION_CODE+";应用程序版本名称："+systeminfo.APP_VERSION_NAME);
    });
  },
  componentWillMount(){
  }
});
AppRegistry.registerComponent('cjzs', () => cjzs);
