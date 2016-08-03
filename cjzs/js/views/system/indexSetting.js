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
    Text,
    View,
    ScrollView,
    Alert,
    NativeModules
} from 'react-native';
import Components from '../../components';
import Environment from "../../environment";
var SystemInfo=NativeModules.SystemInfoAndroid
module.exports=React.createClass({
    getInitialState(){
        return {
            isNeedUpdate:false,
            newVersionName:''
        };
    },
    jump(name){
        if(this.props.navigator){
            this.props.navigator.push({name:name});
        }
    },
    getIsNeedUpdate(){
        if(!this.state.isNeedUpdate) {
            SystemInfo.getIsNeedUpdate(function (newVersionName) {
                this.setState({isNeedUpdate: newVersionName ? true : false, newVersionName: newVersionName});
            }.bind(this));
        }
    },
    handleUpdate(){
        if(this.state.isNeedUpdate){
            Alert.alert(
                '',
                '确定要升级到最新版本('+this.state.newVersionName+')吗？',
                [
                    {text: '取消', onPress: () => console.log('Cancel Pressed')},
                    {text: '确定', onPress: () => console.log('OK Pressed')}
                ]
            );
        };
    },
    render() {
        return (
            <Components.FlexLayout>
            <ScrollView style={{flex:1}}>
                        <Components.ListNavigator
                        icons={[
                            {text:<Text>&#xf004;</Text>,label:'首选项'},
                            [
                                {
                                    text:<Text>&#xf019;</Text>,
                                    label:'软件升级',
                                    rightComponent:<View style={{flexDirection:'row',alignItems:'center'}}>
                                        {this.state.isNeedUpdate? <Components.Icon
                                            text={<Text>&#xf111;</Text>}
                                            size={8}
                                            color="#ff0000"
                                            margin={5}
                                          />:null}
                                        <Text>{Environment.APP_VERSION_NAME}</Text>
                                    </View>,
                                    action:this.handleUpdate
                                },
                                {text:<Text>&#xf1b2;</Text>,label:'关于采集录入系统',action:()=>this.jump("about")}
                            ]
                        ]}
                       />
              </ScrollView>
          </Components.FlexLayout>
        );
    },
    componentDidMount() {
        this.getIsNeedUpdate();
    },
    componentDidUpdate() {
        this.getIsNeedUpdate();
    }
});