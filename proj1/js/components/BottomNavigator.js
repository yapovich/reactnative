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
import {BottomNavigatorStyle} from '../stylesheets/componentStyle';
class BottomNavigator extends Component {
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
            borderColor: '#ccc',
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
                      btn=g.text ?
                          <Icon size={20} color={BottomNavigatorStyle.hoverColor} text={g.activeText?g.activeText:g.text}/> :
                          <Icon size={20} source={g.activeSource?g.activeSource:g.source}/>
                       label=<Text style={{marginTop:3,fontSize:10,color:BottomNavigatorStyle.hoverColor}}>{g.label}</Text>
                   }else{
                      btn=g.text ?
                          <Icon size={20} color={BottomNavigatorStyle.color} text={g.text}/> :
                          <Icon size={20} source={g.source}/>
                       label=<Text style={{marginTop:3,fontSize:10,color:BottomNavigatorStyle.color}}>{g.label}</Text>
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
module.exports=BottomNavigator;