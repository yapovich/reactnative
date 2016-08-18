/**
 * Created by yebo on 2016/8/9.
 */
import {default as BaseDao} from './BaseDao'
const tableName="info";
export default class InfoDao extends BaseDao {
    constructor(){
        super();
    }
    getInfoCount(success,error) {
        this.getCount(tableName,success,error);
    }
    getInfoById(id,success,error){
        this.getById(tableName,id,success,error);
    }
    getAllInfos(success,error) {
        this.getAll(tableName,success,error);
    }
    createInfo(info,success,error){
        this.createByObject(tableName,info,success,error)
    }
    updateInfo(id,info,success,error){
        this.updateByObject(tableName,id,info,success,error)
    }
    removeInfoByIds(ids,success,error){
        this.removeObjectByIds(tableName,ids,success,error)
    }
    exportInfoToExcel(success,error) {
        this.exportToExcel(tableName, success, error);
    }
}