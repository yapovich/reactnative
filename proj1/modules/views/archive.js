/**
 * Created by yebo on 2016/7/8.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React,{ Component} from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    ToastAndroid,
    NativeModules
} from 'react-native';
import {MainStyle} from '../styles';
var ToastCustomAndroid= NativeModules.ToastCustomAndroid;
import Components from '../components';
var archive=React.createClass({
    getInitialState() {
        return {
            folders:[
                {name:'测试文件夹1'},
                {name:'测试文件夹2'},
                {name:'测试文件夹3'},
                {name:'测试文件夹4'},
                {name:'测试文件夹5'},
                {name:'测试文件夹6'}
                ]
        };
    },
    handleNewBtn(){
        if(this.props.navigator)
            this.props.navigator.push({name:'archive_add'});

    },
    handleBack(){
        if(this.props.navigator)
            this.props.navigator.pop()
    },
    render() {
        return (
            <View style={MainStyle.wrapper}>
                <Components.NavigatorBar
                    title={this.props.detail}
                    leftBtn={{text:<Text>&#xf060;</Text>,action:this.handleBack}}
                    rightBtn={[
                        {text:<Text>&#xf067;</Text>,action:this.handleNewBtn}
                    ]}
                />
                <View style={MainStyle.content}>
                    {
                        (this.state.folders&&this.state.folders.length>0)?
                            <View style={MainStyle.tipinfo}><Text>请至少创建一个归档文件夹</Text></View>:
                            this.state.folders.map(function(g){
                                return <View></View>;
                            })
                    }
                </View>
            </View>
        );
    }
});
module.exports=archive;