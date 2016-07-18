/**
 * Created by yebo on 2016/7/8.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React,{ Component} from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    ToastAndroid,
    NativeModules
} from 'react-native';
import {MainStyle} from '../styles';
import Components from '../components';
var ToastCustomAndroid= NativeModules.ToastCustomAndroid;
var update=React.createClass({
    getInitialState() {
        return {
            MC:'体育他几个人他依然体育',
            YPH:'',
            DM:'地貌信息'
        }
    },
    handleSaveBtn(){
        if(!this.state.YPH) {
            ToastCustomAndroid.show("样品号不能为空哦！",ToastCustomAndroid.SHORT);
            return;
        }
        if(this.props.navigator)
            this.props.navigator.pop()
    },
    handleBack(){
        if(this.props.navigator)
          this.props.navigator.pop()
    },
    testHandle(){

    },
    render() {
        return (
            <Components.FlexLayout>
                <Components.NavigatorBar
                   title="新建"
                   alignCenter={true}
                   leftBtn={{text:<Text>&#xf060;</Text>,action:this.handleBack}}
                   rightBtn={[
                       {text:<Text>&#xf00c;</Text>,action:this.handleSaveBtn}
                   ]}
                />
                <ScrollView style={MainStyle.content}>
                    <View style={{margin:14}}>
                        <Components.TextInput
                            label="地貌"
                            keyboardType="default"
                            value={this.state.DM}
                            onChangeText={(DM) => this.setState({DM})}
                        />
                    </View>
                    <View style={{margin:14}}>
                      <Components.TextInput
                         label="名称"
                         unitLabel="米"
                         value={this.state.MC}
                         onPress={this.testHandle}
                         onChangeText={(MC) => this.setState({MC})}
                      />
                    </View>
                    <View style={{margin:14}}>
                        <Components.TextInput
                            label="样品号"
                            value={this.state.YPH}
                            onChangeText={(YPH) => this.setState({YPH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.TextInput
                            label="原始样号"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.TextInput
                            label="EW坐标"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.TextInput
                            label="SN坐标"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.TextInput
                            label="取样深度"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.TextInput
                            label="颜色"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.TextInput
                            label="成因"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.TextInput
                            label="坡度"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.TextInput
                            label="质地"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.TextInput
                            label="污染"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.TextInput
                            label="土地利用"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.TextInput
                            label="作物种类"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.TextInput
                            label="备注"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.TextInput
                            label="采样人"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                    <View style={{margin:14}}>
                        <Components.TextInput
                            label="采用时间"
                            value={this.state.YSYH}
                            onChangeText={(YSYH) => this.setState({YSYH})}
                        />
                    </View>
                </ScrollView>
            </Components.FlexLayout>
        );
    }
});
module.exports=update;