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
                <ScrollView>
                    <View style={{height:500}}>
                    <Components.ListNavigator
                        icons={[
                            {
                                iconSize:80,
                                source:{uri:'icon1'},
                                label: '首页',
                                sublabel:'微信号：yeboweiqi',
                                action: ()=>alert("boboweiqi"),
                                rightComponent:<Components.Icon source={{uri:'icon1'}} size={16}/>
                        },
                            [
                             {text:<Text>&#xf002;</Text>,label:'地图'},
                             {text:<Text>&#xf003;</Text>,label:'首页'}
                            ],
                            {text:<Text>&#xf004;</Text>,label:'地图'},
                            {text:<Text>&#xf105;</Text>,label:'首页'},
                            [
                                {text:<Text>&#xf002;</Text>,label:'地图'},
                                {text:<Text>&#xf003;</Text>,label:'首页'}
                            ]
                        ]}
                    />
                    </View>
                    <Components.GridNavigator
                        column={4}
                        size={24}
                        icons={[
                            {text:<Text>&#xf001;</Text>,label:'首页'},
                            {text:<Text>&#xf002;</Text>,label:'地图'},
                            {text:<Text>&#xf003;</Text>,label:'首页'},
                            {text:<Text>&#xf004;</Text>,label:'地图'},
                            {text:<Text>&#xf105;</Text>,label:'首页'},
                            {text:<Text>&#xf006;</Text>,label:'地图'},
                            {text:<Text>&#xf107;</Text>,label:'首页'},
                            {text:<Text>&#xf008;</Text>,label:'地图'},
                            {text:<Text>&#xf209;</Text>,label:'首页'},
                            {text:<Text>&#xf017;</Text>,label:'地图'},
                            {text:<Text>&#xf011;</Text>,label:'首页'},
                            {text:<Text>&#xf112;</Text>,label:'地图'},
                            {text:<Text>&#xf013;</Text>,label:'首页'},
                            {text:<Text>&#xf014;</Text>,label:'地图'},
                            {text:<Text>&#xf015;</Text>,label:'首页'},
                            {text:<Text>&#xf016;</Text>,label:'地图'},
                            {text:<Text>&#xf217;</Text>,label:'首页'},
                            {text:<Text>&#xf018;</Text>,label:'地图'},
                            {text:<Text>&#xf019;</Text>,label:'首页'},
                            {text:<Text>&#xf020;</Text>,label:'地图'},
                            {text:<Text>&#xf021;</Text>,label:'首页'},
                            {text:<Text>&#xf022;</Text>,label:'地图'},
                            {text:<Text>&#xf023;</Text>,label:'首页'},
                            {text:<Text>&#xf024;</Text>,label:'地图'},
                            {text:<Text>&#xf24a;</Text>,activeText:<Text>&#xf249;</Text>,label:'便签'},
                            {text:<Text>&#xf013;</Text>,label:'配置'}
                        ]}
                    />
                    <View style={{margin:14}}>
                        <Components.FormDatePicker
                            required={true}
                            placeholder="请输入采样日期"
                            label="采样日期"
                            value={this.state.CYRQ}
                            onValueChange={(CYRQ) => this.setState({CYRQ})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.FormTimePicker
                            required={true}
                            placeholder="请输入采样时间"
                            label="采样时间"
                            value={this.state.CYSJ}
                            onValueChange={(CYSJ) => this.setState({CYSJ})}
                        />
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
                            required={true}
                            label="地貌"
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
                            required={true}
                            label={<Text>地貌</Text>}
                            keyboardType="default"
                            value={this.state.DM}
                            onChangeText={(DM) => this.setState({DM})}
                        />
                    </View>
                    <View style={{margin:14}}>
                      <Components.FormTextInput
                          required={true}
                         label={<Text>名称</Text>}
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
                            required={true}
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