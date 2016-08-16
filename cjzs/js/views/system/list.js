/**
 * Created by yebo on 2016/7/8.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React,{ Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Alert,
    Image,
    NativeModules,
    ListView,
    RefreshControl
} from 'react-native';
import Components from '../../components';
var infoDao=new Components.DAO.InfoDao();
var Contacts=NativeModules.ContactsAndroid;
module.exports=React.createClass({
    getInitialState(){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            showMenu:false,
            refreshing:false,
            editMode:false,
            dataSource: ds.cloneWithRows([])
        };
    },
    pop(){
        if(this.props.navigator){
            this.props.navigator.pop();
        }
    },
    jump(name){
        if(this.props.navigator){
            this.props.navigator.push({name:name});
        }
    },
    exportData(){
        Components.SQLite.openDatabase({
            name : "mytest",
            createFromLocation:"~/database/mytest.db"
        },()=>{
            Components.SQLite.startExportSingleTable("mytest","info","mytest.xls",function(){
                Components.Toast.short("导出成功");
            },function(){
                Components.Toast.short("导出失败");
            })
        },()=>{
            console.log("连接失败！");
        })
    },
    loadData(){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        infoDao.getAllInfos((result)=>{
            if(result&&result.length>0)
              this.setState({dataSource:ds.cloneWithRows(result)});
            this.setState({refreshing: false});
        });
        /*
        Contacts.getAllContacts((result)=>{
            if(result&&result.length>0)
                this.setState({dataSource:ds.cloneWithRows(result)});
            this.setState({refreshing: false});
        });*/

    },
    getListComponent(rowData, sectionID, rowID, highlightRow){

        return <Components.MD.List
            splitLine={rowID<this.state.dataSource.length-1?1:0}
            primaryText={rowData.name}
            secondaryText={rowData.yph}
            captionText={rowData.id}
            captionIcon={<Components.MD.Icon name="email" color={Components.MD.getColor("googleGrey300")}/>}
            leftIcon={<Image source={{uri:'icon1'}} style={{width:56,height:56}}/>}
            onLongPress={this.showEditMode}
        />;
        //return <View><Text>{rowData.peopleName}</Text><Text>{rowData.phoneNum}</Text></View>

    },
    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#ddd',
                }}
            />
        );
    },
    onRefresh(){
        this.setState({refreshing: true});
        this.loadData();
    },
    //编辑模式
    showEditMode(){
        this.setState({editMode: true});
    },
    //取消编辑模式
    cancelEditMode(){
        this.setState({editMode: false});
    },
    render() {
        /*
        * <Components.MD.AvatarNavigator index={0} visible={false}
         backgroundColor={Components.MD.PRIMARY}
         name={this.state.showMenu?"keyboard-arrow-down":"keyboard-arrow-up"}
         onPress={()=>this.setState({showMenu:!this.state.showMenu})}/>
         <Components.MD.AvatarNavigator index={1} visible={this.state.showMenu}
         backgroundColor='googleGreen'
         name="grid-on"
         onPress={()=>this.jump("create")}/>
         <Components.MD.AvatarNavigator index={2} visible={this.state.showMenu}
         name="add"
         onPress={()=>this.jump("create")}/>
        * */
        return (
            <Components.FlexLayout>
                <Components.MD.Toolbar
                    style={{elevation:1}}
                    icon="arrow-back"
                    theme="dark"
                    title={this.props.title}
                    onIconPress={()=>this.pop()}
                    actions={[
                        {icon:'add',onPress:()=>this.jump("create")}
                    ]}
                />
                <ListView
                        enableEmptySections={true}
                        style={{flex:1,backgroundColor:'#fff'}}
                        dataSource={this.state.dataSource}
                        renderRow={this.getListComponent}
                        renderScrollComponent={props => <ScrollView {...props} />}
                        renderSeparator={this.renderSeparator}
                        refreshControl={
                            <RefreshControl
                                colors={[Components.MD.getColor(Components.MD.PRIMARY)]}
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                            />
                        }
                />
                {
                    this.state.editMode?
                    <Components.MD.IconBar
                        items={[
                            {name: 'add', label: '删除'},
                            {name: 'add', label: '删除', enabled: false},
                            {name: 'add', label: '删除'},
                            {name: 'add', label: '删除'}
                        ]}
                    />:null
                }
            </Components.FlexLayout>
        );
    },
    componentDidMount() {
        //this.loadData();
        this.exportData();
    }
});