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
    Picker,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    ToastAndroid,
    NativeModules,
    ToolbarAndroid,
    Switch,
    Slider,
    ProgressBarAndroid,
    TimePickerAndroid,
    DatePickerAndroid
} from 'react-native';
import {MainStyle} from '../styles';
import Components from '../components';
var ToastCustomAndroid= NativeModules.ToastCustomAndroid;
var update=React.createClass({
    getInitialState() {

        return {
            colorTrueSwitchIsOn:false,
            MC:'',
            YPH:'',
            DM:'',
            CYRQ:'',
            CYSJ:''
        }
    },
    handleSaveBtn(){
        if(!this.state.YPH) {
            ToastCustomAndroid.show("样品号不能为空哦！",ToastCustomAndroid.SHORT);
            return;
        }
        if(this.props.navigator)
            this.props.navigator.pop()
    },
    handleBack(){
        if(this.props.navigator)
          this.props.navigator.pop()
    },
    testHandle(){

    },
    render() {
        return (
            <Components.FlexLayout>
                <Components.NavigatorBar
                    title="新建"
                    alignCenter={true}
                    leftBtn={{text:<Text>&#xf060;</Text>,action:this.handleBack}}
                    rightBtn={[
                        {text:<Text>&#xf00c;</Text>,action:this.handleSaveBtn}
                    ]}
                />
                <ScrollView style={MainStyle.content}>

                    <View style={{margin:14}}>
                        <Components.FormDatePicker
                            placeholder="请输入采样日期"
                            label={<Text>采样日期<Text style={{color:'#ff0000'}}>*</Text></Text>}
                            value={this.state.CYRQ}
                            onValueChange={(CYRQ) => this.setState({CYRQ})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.FormTimePicker
                            placeholder="请输入采样时间"
                            label={<Text>采样时间<Text style={{color:'#ff0000'}}>*</Text></Text>}
                            value={this.state.CYSJ}
                            onValueChange={(CYSJ) => this.setState({CYSJ})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Slider
                            style={{flex:1}}
                            onValueChange={(value) => this.setState({value: value})} />
                        <ProgressBarAndroid progress={0.6} indeterminate={true} styleAttr="Horizontal" color="#ff0000"/>
                    </View>
                    <View style={{margin:14,flexDirection:"row",justifyContent:'flex-start'}}>
                        <Components.FormCheckbox
                           checked="checked"
                           label="音乐"
                        />
                        <Components.FormCheckbox
                            checked="checked"
                            disabled="disabled"
                            label="音乐"
                        />
                        <Components.FormCheckbox
                            label="音乐"
                        />
                        <Components.FormCheckbox
                            disabled="disabled"
                            label="音乐"
                        />
                        <Switch
                            thumbTintColor="#ff0000"
                            onValueChange={(value) => this.setState({colorTrueSwitchIsOn: value})}
                            value={this.state.colorTrueSwitchIsOn} />
                    </View>
                    <View style={{margin:14,flexDirection:"row",justifyContent:'flex-start'}}>
                        <Components.FormRadio
                            checked="checked"
                            label="男"
                        />
                        <Components.FormRadio
                            checked="checked"
                            disabled="disabled"
                            label="男"
                        />
                        <Components.FormRadio
                            label="男"
                        />
                        <Components.FormRadio
                            disabled="disabled"
                            label="男"
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.FormPicker
                            label={<Text>地貌<Text style={{color:'#ff0000'}}>*</Text></Text>}
                            selectedValue={this.state.DM}
                            onValueChange={(DM) => this.setState({DM})}
                            options={[
                                {label:'请选择',value:''},
                                {label:'平原',value:'平原'},
                                {label:'丘陵',value:'丘陵'}
                            ]}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.FormTextInput
                            label={<Text>地貌<Text style={{color:'#ff0000'}}>*</Text></Text>}
                            keyboardType="default"
                            value={this.state.DM}
                            onChangeText={(DM) => this.setState({DM})}
                        />
                    </View>
                    <View style={{margin:14}}>
                      <Components.FormTextInput
                         label={<Text>名称<Text style={{color:'#ff0000'}}>*</Text></Text>}
                         placeholder="请输入名称"
                         value={this.state.MC}
                         onPress={this.testHandle}
                         onChangeText={(MC) => this.setState({MC})}
                      />
                    </View>
                    <View style={{margin:14}}>
                        <Components.FormTextInput
                            placeholder="请输入样品号"
                            label="样品号"
                            value={this.state.YPH}
                            onChangeText={(YPH) => this.setState({YPH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.FormTextInput
                            label="原始样号"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.FormTextInput
                            label="EW坐标"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.FormTextInput
                            label="SN坐标"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.FormTextInput
                            label="取样深度"
                            unitLabel="米"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.FormTextInput
                            label="颜色"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.FormTextInput
                            label="成因"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.FormTextInput
                            label="坡度"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.FormTextInput
                            label="质地"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.FormTextInput
                            label="污染"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.FormTextInput
                            label="土地利用"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.FormTextInput
                            label="作物种类"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.FormTextInput
                            label="备注"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.FormTextInput
                            label="采样人"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.FormTextInput
                            label="采用时间"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                </ScrollView>
            </Components.FlexLayout>
        );
    }
});
module.exports=update;