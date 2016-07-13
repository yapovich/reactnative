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
    Modal,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ListView,
    RecyclerViewBackedScrollView,
    ViewPagerAndroid,
    NativeModules
} from 'react-native';
import {mainStyle} from '../stylesheets/main';
import MainUpdate from './main_update';
var ToastCustomAndroid= NativeModules.ToastCustomAndroid;
var main=React.createClass({
    getInitialState(){
        //super(props);
        //绑定上下文
        /*this.handleNewBtn = this.handleNewBtn.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleViewPageSelected=this.handleViewPageSelected.bind(this);
        this.handlePageSelect=this.handlePageSelect.bind(this);
        this._renderSeperator=this._renderSeperator.bind(this);
        this._renderRow=this._renderRow.bind(this);
        this.componentDidMount=this.componentDidMount.bind(this);*/
        return {
            modalVisible: false,
            viewPage:0,
            dataSource:null
        };
    },
    handleNewBtn(){
        this.setState({modalVisible: true});
    },
    handleBack(){
        this.setState({modalVisible: false});
    },
    handleViewPageSelected(e){
        this.setState({viewPage: e.nativeEvent.position});
    },
    handlePageSelect(page){
        this.viewPager.setPage(page);
        this.setState({viewPage: page});
    },
    _renderSeperator(sectionID, rowID, adjacentRowHighlighted) {
    return (
        <View
            key={`${sectionID}-${rowID}`}
            style={{
              height: adjacentRowHighlighted ? 4 : 1,
              backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
           }}
        />
    );
   },
    _renderRow(rowData, sectionID, rowID) {
        return (
            <View style={rowID==0?mainStyle.blockListItemFirst:mainStyle.blockListItem}>
                <View style={mainStyle.blockListItemLeft}>
                  <View style={{width:32,height:32,backgroundColor:'#ff0000',marginRight:14}}></View>
                  <Text style={mainStyle.blockListItemLeftText}>{rowData.label}</Text>
                </View>
                <Text style={mainStyle.blockListItemRightFont}>&#xf105;</Text>
            </View>
        );
    },
    render() {
        var listView=<View></View>
        if(this.state.dataSource){
            listView=<ListView
                style={mainStyle.wrapper}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}/>
        }
        return (
            <View style={mainStyle.wrapper}>
                <View style={mainStyle.toolbar}>
                    <Text style={mainStyle.toolbarTitleText}>采集录入系统</Text>
                    <TouchableOpacity activeOpacity={1} style={mainStyle.toolbarNavIcon}  onPress={this.handleNewBtn}>
                        <Text style={mainStyle.toolbarNavFont}>&#xf067;</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType={"fade"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}>
                    <MainUpdate backAction={this.handleBack}/>
                </Modal>
                <ViewPagerAndroid
                    ref={viewPager => this.viewPager = viewPager}
                    style={mainStyle.wrapper}
                    onPageSelected={this.handleViewPageSelected}
                    initialPage={this.state.viewPage}>
                    <View style={mainStyle.wrapper}>
                        {listView}
                    </View>
                    <View style={mainStyle.wrapper}>
                        <Text>波波维奇</Text>
                    </View>
                </ViewPagerAndroid>
                <View style={mainStyle.bottomBar}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.handlePageSelect(0)}>
                        <View style={mainStyle.bottomBarBtn}>
                         <Text style={this.state.viewPage==0?mainStyle.bottomBarBtnIconSelected:mainStyle.bottomBarBtnIcon}>&#xf0f6;</Text>
                         <Text style={this.state.viewPage==0?mainStyle.bottomBarBtnTextSelected:mainStyle.bottomBarBtnText}>首页</Text>
                       </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.handlePageSelect(1)}>
                        <View style={mainStyle.bottomBarBtn}>
                          <Text style={this.state.viewPage==1?mainStyle.bottomBarBtnIconSelected:mainStyle.bottomBarBtnIcon}>&#xf013;</Text>
                          <Text style={this.state.viewPage==1?mainStyle.bottomBarBtnTextSelected:mainStyle.bottomBarBtnText}>配置</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    },
    componentDidMount() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var arry=[]
        for(var i=0;i<50;i++){
            arry.push({label:'土壤地球化学调查采样'});
        }
        this.setState({
            dataSource:ds.cloneWithRows(arry)
        });
        //ToastCustomAndroid.show("样品号不能为空", ToastCustomAndroid.SHORT);
    }
});
module.exports=main;