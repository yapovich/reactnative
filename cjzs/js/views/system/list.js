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
    RecyclerViewBackedScrollView
} from 'react-native';
import Components from '../../components';
module.exports=React.createClass({
    getInitialState(){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            showMenu:false,
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
    refreshData(){
          var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          var result=[];
          for(var i=0;i<20;i++)
              result.push({mainTitle:'我的名字',subTitle:'yebo'+i})
          //this.setState({dataSource:ds.cloneWithRows(result)})
    },
    getListComponent(rowData, sectionID, rowID, highlightRow){
        /*
        return <Components.MD.List
            splitLine={rowID<this.state.dataSource.length-1?1:0}
            primaryText={rowData.mainTitle}
            secondaryText={rowData.subTitle}
            captionText="8月8日8月8日"
            captionIcon={<Components.MD.Icon name="email"/>}
            leftIcon={<Image source={{uri:'icon1'}} style={{width:56,height:56}}/>}
        />;*/
        return (<Text>boboweiqi</Text>);
    },
    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
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
    render() {
        return (
            <Components.FlexLayout>
                <Components.MD.Toolbar
                    style={{elevation:1}}
                    icon="arrow-back"
                    theme="dark"
                    title={this.props.title}
                    onIconPress={()=>this.pop()}
                    actions={[
                        /*{icon:'add',onPress:()=>this.jump("update")}*/
                    ]}
                />
                <Components.MD.AvatarNavigator index={0} visible={true}
                                               backgroundColor={Components.MD.PRIMARY}
                                               name={this.state.showMenu?"keyboard-arrow-down":"keyboard-arrow-up"}
                                               onPress={()=>this.setState({showMenu:!this.state.showMenu})}/>
                <Components.MD.AvatarNavigator index={1} visible={this.state.showMenu}
                                               backgroundColor='googleGreen'
                                               name="grid-on"
                                               onPress={()=>this.jump("update")}/>
                <Components.MD.AvatarNavigator index={2} visible={this.state.showMenu}
                                               name="add"
                                               onPress={()=>this.jump("update")}/>
                <ListView
                        style={{flex:1,backgroundColor:'#fff'}}
                        dataSource={this.state.dataSource}
                        renderRow={this.getListComponent}
                        renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                        renderSeparator={this.renderSeparator}
                />
            </Components.FlexLayout>
        );
    },
    componentDidMount() {
        //this.refreshData();
    }
});