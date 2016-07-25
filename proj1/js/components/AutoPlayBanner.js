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
    TouchableOpacity,
    Dimensions
} from 'react-native'
var AutoPlayBanner= React.createClass({
    getInitialState(){
        return {
            viewPage:0
        }
    },
    handleViewPageSelected(e){
        var page=e.nativeEvent.position;
        if(page==this.props.icons.length-1)
            page=0
        this.setState({viewPage: page});
    },
    handlePageSelect(page, noAnimate) {
        if(noAnimate)
            this.viewPager.setPageWithoutAnimation(page);
        else
            this.viewPager.setPage(page);
        this.setState({viewPage: page});
    },
    render() {
        var width=this.props.width?this.props.width:this.size.width;
        var height=width/(this.props.scale?this.props.scale:1);
        return (
            <View style={[{width:width,height:height},this.props.style]}>
             <ViewPagerAndroid
                 style={{flex:1}}
                 ref={viewPager => this.viewPager = viewPager}
                 onPageSelected={this.handleViewPageSelected}
                 initialPage={this.state.viewPage}>
                 {
                     this.props.icons.map(function(g,index){
                         return <View key={"icons_"+index}>
                             <Image source={g.source} style={{height:height}}/>
                         </View>
                     }.bind(this))
                 }
                 </ViewPagerAndroid>
               <View style={{position:'absolute',
                   width:width,height:15,left:0,bottom:0,justifyContent:'center',alignItems:this.props.align?this.props.align:'center'}}
               >
                   <Text style={{fontFamily:'fontawesome'}}>
                   {
                       this.props.icons.length>1?
                       this.props.icons.map(function(g,index){
                            if(index==this.props.icons.length-1)
                              return null;
                            else {
                                var flag=(this.state.viewPage == index || (index == 0 && this.state.viewPage == (this.props.icons.length - 1)));
                                return <Text key={"text_"+index} style={{fontSize: 5, color: flag?'#48c2f0':'#fff'}}>&nbsp;&#xf111;&nbsp;</Text>;
                            }
                       }.bind(this)):null
                   }
                   </Text>
               </View>
            </View>
        )
    },
    componentDidMount(){
        var total=this.props.icons.length;
        if(total>1) {
            var delay=this.props.delay ? this.props.delay : 2000;
            this.time = setInterval(function () {
                if (this.state.viewPage == total-1) {
                    this.handlePageSelect(0, true);
                }
                this.handlePageSelect(this.state.viewPage + 1)
            }.bind(this), delay);
        }
    },
    componentWillUnmount(){
        clearInterval(this.time);
    },
    componentWillMount(){
        this.size=Dimensions.get('window');
    },
    shouldComponentUpdate(){
        return true;
    }
});
module.exports=AutoPlayBanner;