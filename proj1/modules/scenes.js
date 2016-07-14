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
            name:'index'
        }
        var initialRouteComp={
            index:Views.Index,
            update:Views.Update,
            archive:Views.Archive,
            archive_add:Views.Archive_Add
        };
        return (
            <Navigator
                initialRoute={initialRoute}
                configureScene={(route, routeStack) =>
                    Navigator.SceneConfigs.PushFromRight}
                renderScene={(route, navigator) => {
                    var Component;
                    this._navigator = navigator;
                    if(route.name&&initialRouteComp[route.name]){
                        Component=initialRouteComp[route.name];
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