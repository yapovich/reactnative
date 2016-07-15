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
            MC:'',
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
        if(this.props.navigator)
            this.props.navigator.pop()
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
                   leftBtn={{text:<Text>&#xf060;</Text>,action:this.handleBack}}
                   rightBtn={[
                       {text:<Text>&#xf00c;</Text>,action:this.handleSaveBtn}
                   ]}
                />
                <ScrollView style={MainStyle.content}>
                    <View style={MainStyle.textInputWrapper}>
                        <View style={MainStyle.textInputBorder}>
                            <Text>名称：</Text>
                            <TextInput value={this.state.MC}
                                onChangeText={(MC) => this.setState({MC})}
                                style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                        </View>
                        <Text style={MainStyle.textInputRequiredText}>*</Text>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <View style={MainStyle.textInputBorder}>
                          <Text style={MainStyle.textInputLabel}>样品号：</Text>
                           <TextInput value={this.state.YPH}
                                   onChangeText={(YPH) => this.setState({YPH})}
                                   style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                        </View>
                        <Text style={MainStyle.textInputRequiredText}>*</Text>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <View style={MainStyle.textInputBorder}>
                            <Text>原始样号：</Text>
                            <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <View style={MainStyle.textInputBorder}>
                        <Text>EW坐标：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <View style={MainStyle.textInputBorder}>
                        <Text>SN坐标：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <View style={MainStyle.textInputBorder}>
                        <Text>取样深度：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <View style={MainStyle.textInputBorder}>
                        <Text>颜色：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <View style={MainStyle.textInputBorder}>
                        <Text>成因：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <View style={MainStyle.textInputBorder}>
                        <Text>地貌：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <View style={MainStyle.textInputBorder}>
                        <Text>坡度：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <View style={MainStyle.textInputBorder}>
                        <Text>质地：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                         </View>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <View style={MainStyle.textInputBorder}>
                        <Text>污染：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <View style={MainStyle.textInputBorder}>
                        <Text>土地利用：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <View style={MainStyle.textInputBorder}>
                        <Text>作物种类：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <View style={MainStyle.textInputBorder}>
                        <Text>备注：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <View style={MainStyle.textInputBorder}>
                        <Text>采样人：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={MainStyle.textInputWrapper}>
                        <View style={MainStyle.textInputBorder}>
                        <Text>采样时间：</Text>
                        <TextInput style={MainStyle.textInput} multiline={true} numberOfLines={4} underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
});
module.exports=update;