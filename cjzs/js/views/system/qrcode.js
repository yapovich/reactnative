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
    Image,
    ListView,
    NativeModules
} from 'react-native';
import Components from '../../components';
module.exports=React.createClass({
    getInitialState(){
        return {};
    },
    render() {
        return (
            <View style={{flex:1}}>
                <Components.QRCode
                    animation={true}
                  style={{flex:1,backgroundColor:'#333'}}
                />
            </View>
        );
    },
    componentDidMount() {
    }
});