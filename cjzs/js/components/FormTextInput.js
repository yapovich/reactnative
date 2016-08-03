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
import {FormTextInputStyle} from '../stylesheets/componentStyle';
class FormTextInput extends Component {
    render() {
        var style = {
            textInputBorder: {
                borderRadius: 2,
                borderColor: FormTextInputStyle.borderColor?FormTextInputStyle.borderColor:'#000',
                borderStyle: 'solid',
                borderWidth: 1,
                backgroundColor: FormTextInputStyle.backgroundColor?FormTextInputStyle.backgroundColor:'#fff',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 10,
                paddingRight:10
            },
            textInputLabel: {
                fontSize: FormTextInputStyle.labelFontSize?FormTextInputStyle.labelFontSize:16,
                color:FormTextInputStyle.labelColor?FormTextInputStyle.labelColor:'#000'
            },
            textInput: {
                flex: 1,
                padding:5,
                borderWidth: 0,
                textAlign: this.props.align?this.props.align:'left',
                color: FormTextInputStyle.color?FormTextInputStyle.color:'#000',
                fontSize: FormTextInputStyle.fontSize?FormTextInputStyle.fontSize:16,
                height:38
            }
        };
        return (
            <View style={style.textInputBorder}>
                <Text style={[style.textInputLabel,{minWidth:60}]}>
                    {this.props.label}
                    {this.props.required?<Text style={{color:'#ff0000'}}>*</Text>:null}
                    </Text>
                <TextInput multiline={true}
                           underlineColorAndroid={'transparent'}
                           style={style.textInput}
                           placeholderTextColor={FormTextInputStyle.placeholderTextColor?FormTextInputStyle.placeholderTextColor:"#ccc"}
                           {...this.props}
                           />
                {
                    this.props.unitLabel?<Text style={style.textInputLabel}>{this.props.unitLabel}</Text>:null
                }

            </View>
        )
    }
}
module.exports=FormTextInput;