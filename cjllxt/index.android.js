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
  Alert
} from 'react-native';
import Scenes from "./js/views/system/scenes";
import Environment from "./js/environment";
import Components from "./js/components";
var SystemInfo=NativeModules.SystemInfoAndroid;
import {glyphMap} from './js/components/MaterialDesign/style/MaterialIcons';
var cjllxt=React.createClass({
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
        /*
         var WelCome=require("./js/views/system/welcome");
         var comp = <Scenes></Scenes>
         return (this.state.inited ?
         <View style={{flex: 1}}>
         {comp}
         </View> :
         <WelCome statusText="正在初始化..."/>
         );*/
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
                <Components.MD.Card
                    style={{
                        marginTop:64
                    }}
                    onPress={()=>Components.Dialog.show({
                        content:'my name is boboweiqi'
                    })}
                >
                    <Components.MD.RadioButtonGroup
                        onSelect={(value)=>{}}
                        selected="wc"
                        items={[
                            {label:'yebo',value:'yebo'},
                            {label:'wc',value:'wc'}
                        ]}
                    />
                    <Components.MD.CheckboxGroup
                        onSelect={(value)=>{}}
                        checked={["wc"]}
                        items={[
                            {label:'yebo',value:'yebo'},
                            {label:'wc',value:'wc',disabled:true}
                        ]}
                    />
                </Components.MD.Card>
                </View>
        );
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
AppRegistry.registerComponent('cjllxt', () => cjllxt);
