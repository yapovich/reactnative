/**
 * Created by yebo on 2016/7/14.
 * 底部导航复合组件
 */
import React,{ Component } from 'react';
import {
    Text,
    Image,
    View,
    ViewPagerAndroid,
    TouchableOpacity
} from 'react-native'
import Icon from './Icon';
import {PRIMARY} from './config';
import {getColor} from './helpers';
export default class BottomBarNavigator extends Component {
    constructor(props){
        super(props);
        this.handlePageSelect=this.handlePageSelect.bind(this);
        this.handleViewPageSelected=this.handleViewPageSelected.bind(this);
        this.state={
            viewPage:0
        }
    }
    handleViewPageSelected(e){
        this.setState({viewPage: e.nativeEvent.position});
    }
    handlePageSelect(page) {
        if (this.props.animationEnabled)
            this.viewPager.setPage(page);
        else
            this.viewPager.setPageWithoutAnimation(page);
        this.setState({viewPage: page});
    }
    render() {
        var bottomBarStyle={
            height: 48,
            borderColor: "#eee",
            borderStyle: 'solid',
            borderTopWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems:'center',
            backgroundColor: '#fff'
        }
        var btns=null;
        if(this.props.icons){
           btns=<View style={bottomBarStyle}>
                 {
                   this.props.icons.map(function(g,index){
                   var btn;
                   var label;
                   if(this.state.viewPage==index){
                      btn=g.name ?
                          <Icon size={24} color={getColor(PRIMARY)} name={g.activeName?g.activeName:g.name}/> :
                          <Image size={20} source={g.activeSource?g.activeSource:g.source}/>
                       label=<Text style={{marginTop:0,fontSize:10,color:getColor(PRIMARY)}}>{g.label}</Text>
                   }else{
                      btn=g.name ?
                          <Icon size={24} color={getColor("googleGrey")} name={g.name}/> :
                          <Image size={2} source={g.source}/>
                       label=<Text style={{marginTop:0,fontSize:10,color:getColor("googleGrey")}}>{g.label}</Text>
                    }
                    return (<TouchableOpacity style={{flex:1}} key={"bnto_"+index} activeOpacity={1} onPress={() => this.handlePageSelect(index)}>
                        <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>{btn}{label}</View>
                        </TouchableOpacity>);
                  }.bind(this))
                 }</View>
        }
        return (
            <View style={{flex:1}}>
             <ViewPagerAndroid
                 scrollEnabled={this.props.scrollEnabled!=undefined?this.props.scrollEnabled:true}
                 style={{flex:1}}
                 ref={viewPager => this.viewPager = viewPager}
                 onPageSelected={this.handleViewPageSelected}
                 initialPage={this.state.viewPage}>{this.props.children}</ViewPagerAndroid>
                  {btns}
            </View>
        )
    }
}