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
        if(this.props.navigator)
          this.props.navigator.pop()
    },
    render() {
        return (
            <View style={MainStyle.wrapper}>
                <Components.NavigatorBar
                   title="新建"
                   leftBtn={{text:<Text>&#xf104;</Text>,action:this.handleBack()}}
                   rightBtn={[
                       {text:<Text>&#xf00c;</Text>,action:this.handleSaveBtn}
                   ]}
                />
                <View style={MainStyle.detailTitle}>
                    <Text style={MainStyle.detailTitleFont}>&#xf0f6;</Text>
                    <Text style={MainStyle.detailTitleText}>{this.props.detail}</Text>
                </View>
                <ScrollView style={MainStyle.content}>
                    <View style={MainStyle.textInputWrapper}>
                        <Text>样品号：</Text>
                        <TextInput value={this.state.YPH}
                                   onChangeText={(YPH) => this.setState({YPH})}
                                   style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <Text>EW坐标：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <Text>SN坐标：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <Text>原始样号：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <Text>取样深度：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <Text>颜色：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <Text>成因：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <Text>地貌：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <Text>坡度：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <Text>质地：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <Text>污染：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <Text>土地利用：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <Text>作物种类：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <Text>名称：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <Text>备注：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <Text>采样人：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <Text>采样时间：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
});
module.exports=update;