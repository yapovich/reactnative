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
    ScrollView,
    NativeModules
} from 'react-native';
import Components from '../../components';
import systeminfo from "../../systeminfo";
var SystemInfo=NativeModules.SystemInfoAndroid
module.exports=React.createClass({
    getInitialState(){
        return null;
    },
    jump(name){
        if(this.props.navigator){
            this.props.navigator.push({name:name});
        }
    },
    getIsNeedUpdate(){
        SystemInfo.getIsNeedUpdate(function(need){
            alert(need);
        })
    },
    render() {
        return (
            <Components.FlexLayout>
                <Components.NavigatorBar
                    title="配置"
                    alignCenter={true}
                    rightBtn={
                        [
                            {text:<Text>&#xf1b2;</Text>}
                            ]
                    }
                />
            <ScrollView style={{flex:1}}>
                        <Components.ListNavigator
                        icons={[
                            {text:<Text>&#xf004;</Text>,label:'首选项'},
                            [
                                {
                                    text:<Text>&#xf019;</Text>,
                                    label:'软件更新',
                                    rightComponent:<Text>{systeminfo.APP_VERSION_NAME}</Text>,
                                    action:this.getIsNeedUpdate
                                },
                                {text:<Text>&#xf1b2;</Text>,label:'关于系统'}
                            ]
                        ]}
                       />
              </ScrollView>
          </Components.FlexLayout>
        );
    },
    componentDidMount() {

    }
});