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
    Image,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    ToastAndroid
} from 'react-native';
import {mainStyle} from '../stylesheets/main';
import CustomToast from '../components/native/CustomToast'
class main extends Component {
    constructor(props) {
        super(props);
        this.handleSaveBtn=this.handleSaveBtn.bind(this);
        this.state={
            YPH:''
        }
    }
    handleSaveBtn(){
        //CustomToast.text="boboweiqi";
        //ToastAndroid.show(this.state.YPH,ToastAndroid.SHORT);
        CustomToast.show("boboweiqi",ToastAndroid.SHORT);
    }
    render() {
        return (
            <View style={mainStyle.wrapper}>
                <View style={mainStyle.backToolbar}>
                    <TouchableOpacity onPress={this.props.backAction}>
                      <Image source={{uri: 'backicon'}} style={{width:48,height:48}}/>
                    </TouchableOpacity>
                    <Text style={{fontSize:18,color:'#000'}}>新建</Text>
                </View>
                <ScrollView style={mainStyle.content}>
                    <View style={mainStyle.textInputWrapper}>
                        <Text>样品号：</Text>
                        <TextInput value={this.state.YPH}
                                   onChange={(event) => this.setState({YPH:event.nativeEvent.text})}
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
                </ScrollView >
                <View style={mainStyle.bar}>
                    <TouchableOpacity  style={mainStyle.saveBtn} onPress={this.handleSaveBtn}>
                        <Text style={mainStyle.saveText}>保  存</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
module.exports=main;