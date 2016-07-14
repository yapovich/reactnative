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
import Components from '../components';
var ToastCustomAndroid= NativeModules.ToastCustomAndroid;
var update=React.createClass({
    getInitialState() {
        return {
            archiveName:'boboweiqi'
        }
    },
    handleSaveBtn(){

    },
    handleBack(){
        if(this.props.navigator)
          this.props.navigator.pop()
    },
    render() {
        return (
            <View style={MainStyle.wrapper}>
                <Components.NavigatorBar
                   title="创建归档文件夹"
                   leftBtn={{text:<Text>&#xf060;</Text>,action:this.handleBack}}
                   rightBtn={[
                       {text:<Text>&#xf00c;</Text>,action:this.handleSaveBtn}
                   ]}
                />
                <View style={MainStyle.content}>
                    <View  style={MainStyle.textInputWrapper}>
                          <View style={MainStyle.textInputBorder}>
                            <Text style={MainStyle.textInputLabel}>归档名称：</Text>
                            <TextInput value={this.state.archiveName}
                                   style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                          </View>
                          <Text style={MainStyle.textInputRequiredText}>*</Text>
                    </View>

                </View>
            </View>
        );
    }
});
module.exports=update;