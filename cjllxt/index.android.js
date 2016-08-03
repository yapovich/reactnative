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
         return (<View><Text>boboweiqi</Text></View>)
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
    },
    componentWillMount(){
    }
});
AppRegistry.registerComponent('cjllxt', () => cjllxt);
