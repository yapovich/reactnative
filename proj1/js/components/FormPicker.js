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
    Picker
} from 'react-native';
import {FormPickerStyle} from '../stylesheets/componentStyle';
class FormPicker extends Component {
    render() {
        var color=FormPickerStyle.color?FormPickerStyle.color:'#000'
        var borderColor=FormPickerStyle.borderColor?FormPickerStyle.borderColor:'#000'
        var labelColor=FormPickerStyle.labelColor?FormPickerStyle.labelColor:'#000'
        var placeholderTextColor=FormPickerStyle.placeholderTextColor?FormPickerStyle.placeholderTextColor:"#ccc";
        var style = {
            textInputBorder: {
                borderRadius: 2,
                borderColor: borderColor,
                borderStyle: 'solid',
                borderWidth: 1,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 10,
                paddingRight:10
            },
            textInputLabel: {
                fontSize: 12,
                color:labelColor
            },
            picker: {
                flex: 1,
                color: this.props.selectedValue?color:placeholderTextColor,
                height:38,
                opacity:1
            }
        };
        return (
            <View style={style.textInputBorder}>
                <Text style={[style.textInputLabel,{width:57}]}>{this.props.label}</Text>
                <Picker
                    style={style.picker}
                    prompt={this.props.prompt}
                    mode={this.props.mode}
                    enabled={this.props.enabled}
                    selectedValue={this.props.selectedValue}
                    onValueChange={this.props.onValueChange}>
                    {
                        this.props.options?
                        this.props.options.map(function(g,index){
                            return <Picker.Item key={"pk_"+(index+1)} label={g.label} value={g.value}/>
                        }):null
                    }
                </Picker>
                {
                    this.props.unitLabel?<Text style={style.textInputLabel}>{this.props.unitLabel}</Text>:null
                }

            </View>
        )
    }
}
module.exports=FormPicker;