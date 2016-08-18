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
            dataSource: ds.cloneWithRows([]),
            initialPosition: 'unknown',
            lastPosition: 'unknown'
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
        /*
        infoDao.exportToExcel(()=> {
            Components.Toast.short("导出成功了！");
        }, ()=> {
            Components.Toast.short("导出失败了！");
        })*/
        /*
        infoDao.updateInfo("892826",{
              "名称":"波波维奇",
              "样品号":"我的样品号"
        },(result)=> {
            Components.Toast.short("更新成功了！"+result.insertId);
        }, ()=> {
            Components.Toast.short("更新失败了！");
        })*/
        /*
        infoDao.removeInfoByIds(["892824","892825","892827","892829"],(result)=> {
            Components.Toast.short("删除成功了！"+result.insertId);
        }, ()=> {
            Components.Toast.short("删除失败了！");
        })*/
        /*
        infoDao.getInfoById("832017",(result)=> {
            Components.Toast.short(JSON.stringify(result));
        }, ()=> {
            Components.Toast.short("查询失败了！");
        })*/
        /*
        fetch("https://raw.githubusercontent.com/yapovich/reactnative/master/cjzs/android/app/package/update.json")
            .then((response)=>{
                response.text().then((text)=>{
                    Components.Toast.long(text);
                })
            })*/
    },
    loadData(){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        infoDao.getAllInfos((result)=>{
            if(result&&result.length>0)
              this.setState({dataSource:ds.cloneWithRows(result)});
            this.setState({refreshing: false});
            this.exportData();
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
            primaryText={rowData["名称"]}
            secondaryText={rowData["样品名"]}
            captionText={rowData["ID"]}
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
                <Text>
                    <Text>Current position: </Text>
                    {this.state.lastPosition}
                </Text>
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
        /*
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = JSON.stringify(position);
                this.setState({initialPosition});
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );*/
        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lastPosition = JSON.stringify(position);
            this.setState({lastPosition});
        });
    }
});