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
import {mainStyle} from '../stylesheets/main';
var ToastCustomAndroid= NativeModules.ToastCustomAndroid;
var main=React.createClass({
    getInitialState() {
        return {
            YPH:''
        }
    },
    handleSaveBtn(){
        //CustomToast.text="boboweiqi";
        //ToastAndroid.show(this.state.YPH,ToastAndroid.SHORT);
        if(!this.state.YPH) {
            ToastCustomAndroid.show("样品号不能为空", ToastCustomAndroid.SHORT);
            return;
        }
    },
    handleBack(){
        ToastCustomAndroid.show("后退", ToastCustomAndroid.SHORT);
        this.props.navigator.pop()
    },
    render() {
        return (
            <View style={mainStyle.wrapper}>
                <View style={mainStyle.toolbar}>
                    <View style={mainStyle.toolbarNav}>
                        <TouchableOpacity activeOpacity={1} style={mainStyle.toolbarNavIcon} onPress={()=>{this.handleBack()}}>
                            <Text style={mainStyle.toolbarNavFont}>&#xf104;</Text>
                        </TouchableOpacity>
                        <Text style={mainStyle.toolbarTitleText}>新建</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.5}  style={mainStyle.toolbarNavIcon} onPress={this.handleSaveBtn}>
                        <Text style={mainStyle.toolbarNavFont}>&#xf00c;</Text>
                    </TouchableOpacity>
                </View>
                <View style={mainStyle.detailTitle}>
                    <Text style={mainStyle.detailTitleFont}>&#xf0f6;</Text>
                    <Text style={mainStyle.detailTitleText}>{this.props.detail}</Text>
                </View>
                <ScrollView style={mainStyle.content}>
                    <View style={mainStyle.textInputWrapper}>
                        <Text>样品号：</Text>
                        <TextInput value={this.state.YPH}
                                   onChangeText={(YPH) => this.setState({YPH})}
                                   style={mainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={mainStyle.textInputWrapper}>
                        <Text>EW坐标：</Text>
                        <TextInput style={mainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={mainStyle.textInputWrapper}>
                        <Text>SN坐标：</Text>
                        <TextInput style={mainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={mainStyle.textInputWrapper}>
                        <Text>原始样号：</Text>
                        <TextInput style={mainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={mainStyle.textInputWrapper}>
                        <Text>取样深度：</Text>
                        <TextInput style={mainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={mainStyle.textInputWrapper}>
                        <Text>颜色：</Text>
                        <TextInput style={mainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={mainStyle.textInputWrapper}>
                        <Text>成因：</Text>
                        <TextInput style={mainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={mainStyle.textInputWrapper}>
                        <Text>地貌：</Text>
                        <TextInput style={mainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={mainStyle.textInputWrapper}>
                        <Text>坡度：</Text>
                        <TextInput style={mainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={mainStyle.textInputWrapper}>
                        <Text>质地：</Text>
                        <TextInput style={mainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={mainStyle.textInputWrapper}>
                        <Text>污染：</Text>
                        <TextInput style={mainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={mainStyle.textInputWrapper}>
                        <Text>土地利用：</Text>
                        <TextInput style={mainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={mainStyle.textInputWrapper}>
                        <Text>作物种类：</Text>
                        <TextInput style={mainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={mainStyle.textInputWrapper}>
                        <Text>名称：</Text>
                        <TextInput style={mainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={mainStyle.textInputWrapper}>
                        <Text>备注：</Text>
                        <TextInput style={mainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={mainStyle.textInputWrapper}>
                        <Text>采样人：</Text>
                        <TextInput style={mainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={mainStyle.textInputWrapper}>
                        <Text>采样时间：</Text>
                        <TextInput style={mainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
});
module.exports=main;