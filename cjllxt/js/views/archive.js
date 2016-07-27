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
    Modal,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    ToastAndroid,
    NativeModules,
    ActivityIndicator
} from 'react-native';
import {MainStyle} from '../styles';
var ToastCustomAndroid= NativeModules.ToastCustomAndroid;
import Components from '../components';
import MainStorage from '../storages/mainStorage';
var archive=React.createClass({
    getInitialState() {
        return {
            edit:false,
            selectedCount:0,
            isloading:true,
            folders:[]/*[
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
                ]*/,
            addfolderVisible:false
        };
    },
    handleLongPress(){
        this.setState({edit:true,selectedCount:1})
    },
    handlePress(name,index){
        if(!this.state.edit){
            if(this.props.navigator)
                this.props.navigator.push({name:'archive_file',detail:this.props.detail,folderName:name});
        }
    },
    handleBack(){
        if(this.props.navigator)
            this.props.navigator.pop()
    },
    handleClose(){
        this.setState({edit:false,selectedCount:0})
    },
    //新建文件夹
    handleAddFolder(){
        this.setState({addfolderVisible:true});
    },
    render() {
        return (
            <View style={MainStyle.wrapper}>
                {
                    this.state.edit ?
                        <Components.NavigatorBar
                            title={"已选择(" + this.state.selectedCount + ")"}
                            alignCenter={true}
                            leftBtn={{text: <Text>&#xf00d;</Text>, action: this.handleClose}}
                        /> : <Components.NavigatorBar
                        title={this.props.detail}
                        alignCenter={false}
                        leftBtn={{text: <Text>&#xf060;</Text>, action: this.handleBack}}
                    />
                }
                {
                    (!this.state.isloading) ?
                        <ScrollView
                            contentContainerStyle={[MainStyle.folderWrapper]}
                        >{
                            this.state.folders.map(function (g, index) {
                                return <TouchableHighlight key={"folder_" + index} underlayColor="#eee"
                                                           onLongPress={this.handleLongPress}
                                                           onPress={()=>this.handlePress(g.name, index)}
                                                           style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={MainStyle.folderContainer}>
                                        <View style={MainStyle.folderIcon}><Text
                                            style={MainStyle.folderIconFont}>&#xf07b;</Text></View>
                                        <View style={MainStyle.folderTitle}>
                                            <Text style={MainStyle.folderTitleText1}>{g.name}</Text>
                                            <Text style={MainStyle.folderTitleText2}>
                                                创建时间：{g.createdTime}&nbsp;&nbsp;&nbsp;数量：{g.count}
                                            </Text>
                                        </View>
                                        <View style={{position: 'absolute', right: 10}}><Text>1</Text></View>
                                    </View>
                                </TouchableHighlight>;
                            }.bind(this))}
                        </ScrollView>:
                        <View style={{flex:1}}>
                            <ActivityIndicator
                                animating={true}
                                style={[{height: 100}]}
                                size="large"
                            />
                        </View>
                }
                {
                    !this.state.edit ?
                        <Components.IconBar
                            icons={[
                                {text:<Text>&#xf0f6;</Text>,label:'新建文件夹',action:this.handleAddFolder}
                            ]}
                        /> :
                    <Components.IconBar
                        icons={[
                            {text:<Text>&#xf00d;</Text>,label:'删除',enabled:false},
                            {text:<Text>&#xf044;</Text>,label:'重命名',enabled:false},
                            {text:<Text>&#xf05d;</Text>,label:'全选',enabled:false},
                            {text:<Text>&#xf0ee;</Text>,label:'导出'},
                        ]}
                    />
                }
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.addfolderVisible}
                    onRequestClose={()=> {
                        this.setState({addfolderVisible: false})
                    }}
                >
                    <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <View style={{margin: 20, borderRadius: 5, backgroundColor: '#fff', height: 150}}>
                            <Text style={{textAlign: 'center'}}>波波维奇</Text>
                        </View>
                    </View>

                </Modal>
            </View>
        );
    },
    componentDidMount(){
        //ToastCustomAndroid.show("数据不存在222",ToastCustomAndroid.SHORT);
        MainStorage.getFolders(function(data){
            this.setState({folders:data?data:[],isloading:false});
        }.bind(this));
    }
});
module.exports=archive;