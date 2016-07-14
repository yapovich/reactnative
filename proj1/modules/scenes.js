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
    TouchableOpacity,
    TouchableHighlight,
    Text,
    View,
    Navigator,
    BackAndroid
} from 'react-native';
import Views from "./views";
var scenes=React.createClass({
    render() {
        var initialRoute={
            name:'update',
            detail:'土壤地球化学调查采样记录卡'
        };
        return (
            <Navigator
                initialRoute={initialRoute}
                renderScene={(route, navigator) => {
                    var Component;
                    this._navigator = navigator;
                    switch (route.name) {
                        case "index":
                            Component = Views.Index;
                            break;
                        case "update":
                            Component = Views.Update;
                            break;
                        default: //default view
                            Component = View;
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
                navigator.pop();
                return true;
            }
            return false;
        });
    },
    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    },
});
module.exports=scenes;