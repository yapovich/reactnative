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
    RecyclerViewBackedScrollView
} from 'react-native';
import {mainStyle} from '../stylesheets/main';
import MainUpdate from './main_update';
class main extends Component {
    constructor(props) {
        super(props);
        //绑定上下文
        this.handleNewBtn = this.handleNewBtn.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this._renderSeperator=this._renderSeperator.bind(this);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var arry=[]
        for(var i=0;i<50;i++){
            arry.push("row"+i);
        }
        this.state = {
            modalVisible: false,
            dataSource:ds.cloneWithRows(arry)
        };
    }
    handleNewBtn(){
        this.setState({modalVisible: true});
    }
    handleBack(){
        this.setState({modalVisible: false});
    }
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
   }
    render() {
        return (
            <View style={mainStyle.wrapper}>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}>
                    <MainUpdate backAction={this.handleBack}/>
                </Modal>
                <ListView
                    style={mainStyle.content}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                    <Text>{rowData}</Text>
                    }
                    renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                    renderSeparator={this._renderSeperator}

                />
                <View style={mainStyle.bottomBar}>
                    <TouchableOpacity onPress={this.handleNewBtn}>
                        <View style={mainStyle.bottomBarBtn}>
                         <Text style={{fontFamily: 'fontawesome',fontSize:20}}>&#xf0f6;</Text>
                         <Text style={{fontSize:12,marginTop:1}}>新建</Text>
                       </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={mainStyle.bottomBarBtn}>
                          <Text style={{fontFamily: 'fontawesome',fontSize:20}}>&#xf013;</Text>
                          <Text style={{fontSize:12,marginTop:1}}>设置</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
module.exports=main;