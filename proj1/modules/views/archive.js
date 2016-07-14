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
var ToastCustomAndroid= NativeModules.ToastCustomAndroid;
import Components from '../components';
var archive=React.createClass({
    getInitialState() {
        return {
            edit:false,
            selectedCount:0,
            folders:[
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
                ]
        };
    },
    handleNewBtn(){
        if(this.props.navigator)
            this.props.navigator.push({name:'archive_add'});

    },
    handleLongPress(){
        this.setState({edit:true,selectedCount:1})
    },
    handlePress(index){

    },
    handleBack(){
        if(this.props.navigator)
            this.props.navigator.pop()
    },
    handleClose(){
        this.setState({edit:false,selectedCount:0})
    },
    render() {
        return (
            <View style={MainStyle.wrapper}>
                {
                    this.state.edit?
                    <Components.NavigatorBar
                        title={"已选择("+this.state.selectedCount+")"}
                        alignCenter={true}
                        leftBtn={{text: <Text>&#xf00d;</Text>, action: this.handleClose}}
                    />:<Components.NavigatorBar
                        title={this.props.detail}
                        alignCenter={false}
                        leftBtn={{text: <Text>&#xf060;</Text>, action: this.handleBack}}
                        rightBtn={[
                            {text: <Text>&#xf067;</Text>, action: this.handleNewBtn}
                        ]}
                    />
                }
                    <ScrollView
                        contentContainerStyle={[MainStyle.folderWrapper]}
                    >
                    {
                        (this.state.folders&&this.state.folders.length>0)?
                        this.state.folders.map(function(g,index){
                            return <TouchableHighlight key={"folder_"+index} underlayColor="#eee"
                                                       onLongPress={this.handleLongPress}
                                                       onPress={()=>this.handlePress(index)}
                                                       style={{flex:1,flexDirection: 'row'}}>
                              <View style={MainStyle.folderContainer}>
                                <View style={MainStyle.folderIcon}><Text style={MainStyle.folderIconFont}>&#xf07b;</Text></View>
                                <View style={MainStyle.folderTitle}>
                                    <Text style={MainStyle.folderTitleText1}>{g.name}</Text>
                                    <Text style={MainStyle.folderTitleText2}>
                                        创建时间：{g.createdTime}&nbsp;&nbsp;&nbsp;数量：{g.count}
                                        </Text>
                                </View>
                                  <View style={{position:'absolute',right:10}}><Text>1</Text></View>
                              </View>
                            </TouchableHighlight>;
                        }.bind(this)):
                       <View style={MainStyle.tipinfo}><Text>请至少创建一个归档文件夹</Text></View>
                    }
                    </ScrollView>
                {
                    !this.state.edit?
                        <View style={MainStyle.bottomBar}>
                            <TouchableOpacity activeOpacity={1}>
                                <View style={MainStyle.bottomBarBtn}>
                                    <Text style={MainStyle.bottomBarBtnIcon}>&#xf0f6;</Text>
                                    <Text style={MainStyle.bottomBarBtnText}>新建文件夹</Text>
                                </View>
                            </TouchableOpacity>
                        </View>:
                        <View style={MainStyle.bottomBar}>
                            <TouchableOpacity activeOpacity={1}>
                                <View style={MainStyle.bottomBarBtn}>
                                    <Text style={MainStyle.bottomBarBtnIcon}>&#xf00d;</Text>
                                    <Text style={MainStyle.bottomBarBtnText}>删除</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1}>
                                <View style={MainStyle.bottomBarBtn}>
                                    <Text style={MainStyle.bottomBarBtnIcon}>&#xf044;</Text>
                                    <Text style={MainStyle.bottomBarBtnText}>重命名</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1}>
                                <View style={MainStyle.bottomBarBtn}>
                                    <Text style={MainStyle.bottomBarBtnIcon}>&#xf05d;</Text>
                                    <Text style={MainStyle.bottomBarBtnText}>全选</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1}>
                                <View style={MainStyle.bottomBarBtn}>
                                    <Text style={MainStyle.bottomBarBtnIcon}>&#xf0ee;</Text>
                                    <Text style={MainStyle.bottomBarBtnText}>导出</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                }

            </View>
        );
    }
});
module.exports=archive;