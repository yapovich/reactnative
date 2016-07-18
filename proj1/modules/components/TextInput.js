/**
 * Created by yebo on 2016/7/14.
 * 正方形字体或图片图标
 */
import React,{ Component } from 'react';
import {
    Text,
    View,
    TextInput,
    Image
} from 'react-native';
import {TextInputStyle} from '../stylesheets/componentStyle';
class MyTextInput extends Component {
    render() {
        var style = {
            textInputBorder: {
                borderRadius: 5,
                borderColor: TextInputStyle.borderColor?TextInputStyle.borderColor:'#000',
                borderStyle: 'solid',
                borderWidth: 1,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 5,
                paddingRight:5
            },
            textInputLabel: {
                fontSize: 12,
                color:TextInputStyle.labelColor?TextInputStyle.labelColor:'#000'
            },
            textInput: {
                flex: 1,
                padding:5,
                borderWidth: 0,
                textAlign: 'center',
                color: TextInputStyle.color?TextInputStyle.color:'#000',
                fontSize: 14,
                height:38
            }
        };
        return (
            <View style={style.textInputBorder}>
                <Text style={style.textInputLabel}>{this.props.label}：</Text>
                <TextInput multiline={true}
                           underlineColorAndroid={'transparent'}
                           style={style.textInput}
                           {...this.props}
                           />
                {
                    this.props.unitLabel?<Text style={style.textInputLabel}>{this.props.unitLabel}</Text>:null
                }

            </View>
        )
    }
}
module.exports=MyTextInput;