/**
 * Created by yebo on 2016/7/14.
 */
import React from 'react';
import {AsyncStorage} from 'react-native';
module.exports={
    STORAGE_KEY:'@MainStorage',
    create(name){
        //await AsyncStorage.getItem(this.STORAGE_KEY+name);
    },
    getItem(key){

    }
}