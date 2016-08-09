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
import Components from '../../components';
var ToastCustomAndroid= NativeModules.ToastCustomAndroid;
var infoDao=new Components.DAO.InfoDao();
var update=React.createClass({
    getInitialState() {
        return {
            name:'',
            yph:''
        }
    },
    handleSaveBtn(){
        if(!this.state.name) {
            Components.Toast.short("名称不能为空哦！");
            return;
        }
        if(!this.state.yph) {
            Components.Toast.short("样品号不能为空哦！");
            return;
        }
        infoDao.createInfo({
             name:this.state.name,
             yph:this.state.yph
        },(isOk)=>{
            if(isOk)
                Components.Toast.short("保存成功")
            else
                Components.Toast.short("保存失败")
        })
    },
    pop(){
        if(this.props.navigator)
          this.props.navigator.pop()
    },
    testHandle(){

    },
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <Components.MD.Toolbar
                    icon="arrow-back"
                    theme="dark"
                    title="新建"
                    onIconPress={()=>this.pop()}
                    actions={[
                        {icon:'done',onPress:this.handleSaveBtn}
                    ]}
                />
                <ScrollView contentContainerStyle={{marginHorizontal:16,marginTop:16}}>
                    <View style={{marginBottom:16}}>
                      <Components.FormTextInput
                          required={true}
                         label={<Text>名称</Text>}
                         placeholder="请输入名称"
                         value={this.state.name}
                         onPress={this.testHandle}
                         onChangeText={(name) => this.setState({name})}
                      />
                    </View>
                    <View style={{marginBottom:16}}>
                        <Components.FormTextInput
                            placeholder="请输入样品号"
                            label="样品号"
                            value={this.state.yph}
                            onChangeText={(yph) => this.setState({yph})}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
});
module.exports=update;