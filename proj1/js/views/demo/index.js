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
    NativeModules,
} from 'react-native';
import Components from '../../components';
import IndexComponents from './indexComponents'
import IndexSetting from './indexSetting'
module.exports=React.createClass({
    getInitialState(){
        return {
            viewPage:0,
        };
    },
    jump(name){
        if(this.props.navigator){
            this.props.navigator.push({name:name});
        }
    },
    render() {
        return (
            <Components.FlexLayout>
                <Components.NavigatorBar
                    title="采集录入系统"
                />
                <Components.BottomNavigator
                    icons={[
                        {text:<Text>&#xf015;</Text>,label:'示例'},
                        {text:<Text>&#xf013;</Text>,label:'表格'},
                        {text:<Text>&#xf279;</Text>,label:'地图'}
                    ]}
                >
                    <View><IndexComponents  navigator={this.props.navigator}/></View>
                    <View><IndexSetting navigator={this.props.navigator}/></View>
                    <View><IndexSetting navigator={this.props.navigator}/></View>
                </Components.BottomNavigator>
            </Components.FlexLayout>
        );
    },
    componentDidMount() {

    }
});