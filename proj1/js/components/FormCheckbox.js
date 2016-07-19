/**
 * Created by yebo on 2016/7/14.
 * 正方形字体或图片图标
 */
import React,{ Component } from 'react';
import {
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';
import {FormCheckboxOrRadioStyle} from '../stylesheets/componentStyle';
class FormCheckbox extends Component {
    render() {
        var style = {
            text: {
                fontSize:FormCheckboxOrRadioStyle.fontSize?FormCheckboxOrRadioStyle.fontSize:14,
                fontFamily:'fontawesome'
            },
            color:FormCheckboxOrRadioStyle.color?FormCheckboxOrRadioStyle.color:'#000',
            selectedColor:FormCheckboxOrRadioStyle.selectedColor?FormCheckboxOrRadioStyle.selectedColor:'#109d59',
            disabledColor:FormCheckboxOrRadioStyle.disabledColor?FormCheckboxOrRadioStyle.disabledColor:"#ccc"
        };
        var _text,_label;
        if(this.props.checked=="checked"){
            if(this.props.disabled=="disabled")
                _text=<Text style={{color:style.disabledColor}}>&#xf14a;</Text>
            else
                _text=<Text style={{color:style.selectedColor}}>&#xf14a;</Text>
        }else{
            if(this.props.disabled=="disabled")
                _text=<Text style={{color:style.disabledColor}}>&#xf096;</Text>
            else
                _text=<Text style={{color:style.color}}>&#xf096;</Text>
        }
        _label=this.props.label?<Text style={{marginLeft:5,
            color:FormCheckboxOrRadioStyle.labelColor?FormCheckboxOrRadioStyle.labelColor:null
        }}>&nbsp;&nbsp;{this.props.label}&nbsp;&nbsp;</Text>:null;
        return (
            <TouchableOpacity activeOpacity={1} onPress={this.props.onPress}>
                <Text style={style.text}>{_text}{_label}</Text>
            </TouchableOpacity>
        )
    }
}
module.exports=FormCheckbox;