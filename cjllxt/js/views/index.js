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
        if(this.props.navigator)
          this.props.navigator.push({name:'archive',detail:data.label});
    },
    render() {
        var listView=<View></View>
        if(this.state.dataSource){
            listView=<ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}/>
        }
        return (
            <Components.FlexLayout>
                <Components.NavigatorBar
                    title="采集录入系统"
                />
                <Components.BottomNavigator
                    icons={[
                        {text:<Text>&#xf015;</Text>,label:'首页'},
                        {text:<Text>&#xf279;</Text>,label:'地图'},
                        {text:<Text>&#xf24a;</Text>,activeText:<Text>&#xf249;</Text>,label:'便签'},
                        {text:<Text>&#xf013;</Text>,label:'配置'}
                    ]}
                >
                    <View>{listView}</View>
                    <View><Text>导航页面</Text></View>
                    <View><Text>便签页面</Text></View>
                    <View><Text>配置页面</Text></View>
                </Components.BottomNavigator>
            </Components.FlexLayout>
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