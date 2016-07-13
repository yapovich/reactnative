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
    TouchableHighlight,
    ScrollView,
    ListView,
    RecyclerViewBackedScrollView,
    ViewPagerAndroid,
    NativeModules,
    Navigator
} from 'react-native';
import {mainStyle} from '../stylesheets/main';
var ToastCustomAndroid= NativeModules.ToastCustomAndroid;
var main=React.createClass({
    getInitialState(){
        return {
            rowID:-1,
            modalVisible: false,
            viewPage:0,
            dataSource:null
        };
    },
    handleBack(){
        this.setState({
            rowID:-1,
            rowTitle:'',
            modalVisible: false
        });
    },
    handleViewPageSelected(e){
        this.setState({viewPage: e.nativeEvent.position});
    },
    handlePageSelect(page){
        this.viewPager.setPage(page);
        this.setState({viewPage: page});
        ToastCustomAndroid.show("handlePageSelect("+page+")", ToastCustomAndroid.SHORT);
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
            <TouchableHighlight underlayColor="#333" onPress={()=>this._pressRow(rowID)} style={rowID==0?{marginTop:10,marginBottom:10}:{marginBottom:10}}>
              <View style={mainStyle.blockListItem}>
                <View style={mainStyle.blockListItemLeft}>
                  <Text style={mainStyle.blockListItemLeftFont}>&#xf0f6;</Text>
                  <Text style={mainStyle.blockListItemLeftText}>{rowData.label}</Text>
                </View>
                <Text style={mainStyle.blockListItemRightFont}>&#xf105;</Text>
              </View>
            </TouchableHighlight>
        );
    },
    _pressRow: function(rowID) {
        var data=this._pressData[rowID];
        this.props.navigator.push({name:'update',detail:data.label});
        /*
        this.setState({
            rowID:rowID,
            rowTitle:data.label,
            modalVisible: true
        })*/
        //ToastCustomAndroid.show(data.label, ToastCustomAndroid.SHORT);
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
                    <View style={mainStyle.toolbarNav}>
                        <Text style={mainStyle.toolbarTitleText}>采集录入系统</Text>
                    </View>
                </View>
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
                          <Text style={this.state.viewPage==1?mainStyle.bottomBarBtnIconSelected:mainStyle.bottomBarBtnIcon}>&#xf0ad;</Text>
                          <Text style={this.state.viewPage==1?mainStyle.bottomBarBtnTextSelected:mainStyle.bottomBarBtnText}>工具</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    },
    componentDidMount() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var arry=[]
        for(var i=0;i<10;i++){
            arry.push({label:'土壤地球化学调查采样记录卡'});
        }
        this._pressData=arry;
        this.setState({
            dataSource:ds.cloneWithRows(arry)
        });
    }
});
module.exports=main;