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
import {mainStyle} from '../stylesheets/main';
import Main from "../views/main";
import MainUpdate from "../views/main_update";
var main=React.createClass({
    render() {
        return (
            <Navigator
                initialRoute={{name:'main'}}
                renderScene={(route, navigator) => {
                    var Component;
                    this._navigator = navigator;
                    switch (route.name) {
                        case "main":
                            Component = Main;
                            break;
                        case "update":
                            Component = MainUpdate;
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
module.exports=main;