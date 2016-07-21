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
import {FormTextInputStyle} from '../stylesheets/componentStyle';
class FormPicker extends Component {
    render() {
        var color=FormTextInputStyle.color?FormTextInputStyle.color:'#000'
        var borderColor=FormTextInputStyle.borderColor?FormTextInputStyle.borderColor:'#000'
        var labelColor=FormTextInputStyle.labelColor?FormTextInputStyle.labelColor:'#000'
        var placeholderTextColor=FormTextInputStyle.placeholderTextColor?FormTextInputStyle.placeholderTextColor:"#ccc";
        var style = {
            textInputBorder: {
                borderRadius: 2,
                borderColor: borderColor,
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
                <Text style={[style.textInputLabel,{minWidth:57}]}>
                    {this.props.label}
                    {this.props.required?<Text style={{color:'#ff0000'}}>*</Text>:null}
                </Text>
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