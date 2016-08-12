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
    ListView
} from 'react-native';
import Components from '../../components';
module.exports=React.createClass({
    getInitialState(){
        return {
            info:""
        };
    },
    jump(name){
        if(this.props.navigator){
            this.props.navigator.push({name:name});
        }
    },
    pop(){
        if(this.props.navigator){
            this.props.navigator.pop();
        }
    },
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <Components.MD.Toolbar
                    style={{elevation:1}}
                    icon="clear"
                    theme="dark"
                    onIconPress={()=>this.pop()}
                />
                <Text>{this.props.info}</Text>
            </View>
        );
    },
    componentDidMount() {

    }
});