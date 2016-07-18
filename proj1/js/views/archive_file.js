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
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    ToastAndroid,
    NativeModules
} from 'react-native';
import {MainStyle} from '../styles';
import Components from '../components';
var ToastCustomAndroid= NativeModules.ToastCustomAndroid;
var update=React.createClass({
    getInitialState() {
        return {
            files:[]/*[
                {name:'测试文件夹11',createdTime:new Date().toDateString(),count:20},
                {name:'测试文件夹12',createdTime:new Date().toDateString(),count:20},
                {name:'测试文件夹3',createdTime:new Date().toDateString(),count:20},
                {name:'测试文件夹4',createdTime:new Date().toDateString(),count:20},
                {name:'测试文件夹5',createdTime:new Date().toDateString(),count:20},
                {name:'测试文件夹6',createdTime:new Date().toDateString(),count:20},
                {name:'测试文件夹7',createdTime:new Date().toDateString(),count:20},
                {name:'测试文件夹8',createdTime:new Date().toDateString(),count:20},
                {name:'测试文件夹9',createdTime:new Date().toDateString(),count:20},
                {name:'测试文件夹10',createdTime:new Date().toDateString(),count:20},
                {name:'测试文件夹11',createdTime:new Date().toDateString(),count:20},
                {name:'测试文件夹12',createdTime:new Date().toDateString(),count:20}
            ]*/
        }
    },
    handleNewBtn(){
        if(this.props.navigator)
            this.props.navigator.push({name:'update'})
    },
    handleBack(){
        if(this.props.navigator)
          this.props.navigator.pop()
    },
    render() {
        return (
            <View style={MainStyle.wrapper}>
                <Components.NavigatorBar
                   title={this.props.detail}
                   leftBtn={{text:<Text>&#xf060;</Text>,action:this.handleBack}}
                   rightBtn={[
                       {text:<Text>&#xf067;</Text>,action:this.handleNewBtn}
                   ]}
                />
                <View style={MainStyle.detailTitle}>
                    <Text style={MainStyle.detailTitleFont}>&#xf0f6;</Text>
                    <Text style={MainStyle.detailTitleText}>/{this.props.folderName}</Text>
                </View>
                    <ScrollView
                        contentContainerStyle={MainStyle.folderWrapper}
                    >
                        {
                            (this.state.files&&this.state.files.length>0)?
                                this.state.files.map(function(g,index){
                                    return <TouchableHighlight key={"folder_"+index} underlayColor="#eee" style={{flex:1,flexDirection: 'row'}}>
                                        <View style={{flex:1,margin:20,marginTop:10,marginBottom:10,backgroundColor:'#ff0000'}}>
                                           <Text >波波维奇</Text>
                                            <Text >波波维奇</Text>
                                            <Text >波波维奇</Text>
                                        </View>
                                    </TouchableHighlight>;
                                }.bind(this)):
                                <View style={MainStyle.tipinfo}><Text></Text></View>
                        }
                    </ScrollView>
            </View>
        );
    },
    componentDidUpdate(){
        //ToastCustomAndroid.show("componentDidUpdate"+this.props.navigator.name,ToastCustomAndroid.SHORT);
    }
});
module.exports=update;