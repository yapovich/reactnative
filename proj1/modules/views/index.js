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
import {MainStyle} from '../styles';
var ToastCustomAndroid= NativeModules.ToastCustomAndroid;
import Components from '../components';
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
              <View style={MainStyle.blockListItem}>
                <View style={MainStyle.blockListItemLeft}>
                  <Text style={MainStyle.blockListItemLeftFont}>&#xf0f6;</Text>
                  <Text style={MainStyle.blockListItemLeftText}>{rowData.label}</Text>
                </View>
                <Text style={MainStyle.blockListItemRightFont}>&#xf105;</Text>
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
                style={MainStyle.wrapper}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}/>
        }
        return (
            <View style={MainStyle.wrapper}>
                <Components.NavigatorBar
                    title="采集录入系统"
                />
                <ViewPagerAndroid
                    ref={viewPager => this.viewPager = viewPager}
                    style={MainStyle.wrapper}
                    onPageSelected={this.handleViewPageSelected}
                    initialPage={this.state.viewPage}>
                    <View style={MainStyle.wrapper}>
                        {listView}
                    </View>
                    <View style={MainStyle.wrapper}>
                        <Text>波波维奇</Text>
                    </View>
                </ViewPagerAndroid>
                <View style={MainStyle.bottomBar}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.handlePageSelect(0)}>
                        <View style={MainStyle.bottomBarBtn}>
                         <Text style={this.state.viewPage==0?MainStyle.bottomBarBtnIconSelected:MainStyle.bottomBarBtnIcon}>&#xf0f6;</Text>
                         <Text style={this.state.viewPage==0?MainStyle.bottomBarBtnTextSelected:MainStyle.bottomBarBtnText}>首页</Text>
                       </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.handlePageSelect(1)}>
                        <View style={MainStyle.bottomBarBtn}>
                          <Text style={this.state.viewPage==1?MainStyle.bottomBarBtnIconSelected:MainStyle.bottomBarBtnIcon}>&#xf0ad;</Text>
                          <Text style={this.state.viewPage==1?MainStyle.bottomBarBtnTextSelected:MainStyle.bottomBarBtnText}>工具</Text>
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