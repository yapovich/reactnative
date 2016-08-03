/**
 * Created by yebo on 2016/7/14.
 * 正方形字体或图片图标
 */
import React,{ Component } from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    DatePickerAndroid
} from 'react-native';
import {FormTextInputStyle} from '../stylesheets/componentStyle';
import Icon from './Icon';
class FormDatePicker extends Component {
    constructor(props){
        super(props);
        this.handleSelectDate=this.handleSelectDate.bind(this);
    }
    handleSelectDate(){
        try {
            DatePickerAndroid.open({
                //date: new Date(2020, 4, 25)
            }).done(function(result){
                if (result.action !== DatePickerAndroid.dismissedAction) {
                    var month=result.month+1;
                    month=month<10?("0"+month):month;
                    var day=result.day;
                    day=day<10?("0"+day):day;
                    var date=result.year+"-"+month+"-"+day
                    if(this.props.onValueChange)
                        this.props.onValueChange(date);
                }
            }.bind(this));

        } catch ({code, message}) {
            //console.warn('Cannot open date picker', message);
        }
    }
    render() {
        var labelFontSize=FormTextInputStyle.labelFontSize?FormTextInputStyle.labelFontSize:16;
        var borderColor=FormTextInputStyle.borderColor?FormTextInputStyle.borderColor:'#000';
        var labelColor=FormTextInputStyle.labelColor?FormTextInputStyle.labelColor:'#000';
        var frontColor=FormTextInputStyle.color?FormTextInputStyle.color:'#000';
        var phcolor=FormTextInputStyle.placeholderTextColor?FormTextInputStyle.placeholderTextColor:"#ccc"
        var color=this.props.value?frontColor:phcolor;
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
                fontSize: labelFontSize,
                color:labelColor
            },
            textInput: {
                flex: 1,
                padding:5,
                borderWidth: 0,
                flexDirection:'row',
                alignItems:'center',
                justifyContent: this.props.align?this.props.align:'flex-start',
                height:38
            },
            textInputText:{
                fontSize: FormTextInputStyle.fontSize?FormTextInputStyle.fontSize:16
            }
        };
        return (
            <TouchableOpacity activeOpacity={1} onPress={this.handleSelectDate}>
              <View style={style.textInputBorder}>
                  <Text style={[style.textInputLabel,{minWidth:60}]}>
                      {this.props.label}
                      {this.props.required?<Text style={{color:'#ff0000'}}>*</Text>:null}
                  </Text>
                <View style={style.textInput}><Text style={[style.textInputText,{color:color}]}>{this.props.value?this.props.value:this.props.placeholder}</Text></View>
                <Icon
                    color={labelColor}
                    text={<Text>&#xf105;</Text>}
                    size={labelFontSize}
                  />
              </View>
           </TouchableOpacity>
        )
    }
}
module.exports=FormDatePicker;