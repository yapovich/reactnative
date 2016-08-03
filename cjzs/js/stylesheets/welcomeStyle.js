/**
 * Created by yebo on 2016/7/8.
 */
import {StyleSheet} from 'react-native';
module.exports= StyleSheet.create({
    //欢迎页容器
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    //欢迎页主标题
    mainTitle: {
        fontSize: 40,
        marginTop: 100,
        color: '#fff'
    },
    //欢迎页副标题
    subTitle: {
        fontSize: 16,
        marginTop:20,
        marginBottom: 10,
        color: '#aaa'
    },
    //欢迎页按钮容器
    btns: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 60
    },
    //欢迎页进入按钮
    comeinBtn: {
        borderWidth: 1,
        borderColor: '#fff',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10
    },
    //欢迎页进入按钮
    comeinText: {
        color: '#fff',
        fontSize: 14
    }
})
