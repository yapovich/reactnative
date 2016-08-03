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
    NativeModules
} from 'react-native';
import Components from '../../components';
module.exports=React.createClass({
    getInitialState(){
        return {
            viewPage:0,
        };
    },
    pop(){
        if(this.props.navigator){
            this.props.navigator.pop();
        }
    },
    jump(name){
        if(this.props.navigator){
            this.props.navigator.push({name:name});
        }
    },
    render() {
        return (
            <Components.FlexLayout>
                <Components.MD.Toolbar
                    icon="arrow-back"
                    theme="dark"
                    title={this.props.title}
                    onIconPress={()=>this.pop()}
                    actions={[
                        {icon:'add',onPress:()=>this.jump("update")}
                    ]}
                />
                <ScrollView contentContainerStyle={{flex:1,backgroundColor:'#fff'}}>
                </ScrollView>
            </Components.FlexLayout>
        );
    },
    componentDidMount() {

    }
});