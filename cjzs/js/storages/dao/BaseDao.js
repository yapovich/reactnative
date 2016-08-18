/**
 * Created by yebo on 2016/8/9.
 */
import SQLite from '../../libs/sqlite';
import DateUtil from '../../libs/dateUtil';
var defaultDbName="mytest";
export default class BaseDao{
    constructor(){
        this.db=null;
    }
    opendb(success,error){
        this.db = SQLite.openDatabase({
            name : defaultDbName,
            createFromLocation:"~/database/"+defaultDbName+".db"
        },()=>{
            if(success)success()
        },()=>{
            if(error)error()
        });
    }
    closedb(){
         if(this.db&&this.db.close)
             this.db.close();
    }
    execute(sql,params,success,error) {
        this.opendb(
            ()=> {
                this.db.transaction((tx) => {
                    tx.executeSql(sql, params, (tx, result)=> {
                        if (success)success(result)
                    }, ()=> {
                        if (error)error()
                    });
                }, ()=> {
                    if (error)error()
                });
            });
    }
    getCount(tableName,success,error) {
        this.execute('select count(*) count from '+tableName,[],(result)=>{
            if(success)success(result.rows.item(0)["count"])
        },error)
    }
    getById(tableName,id,success,error){
        this.execute("select * from '"+tableName+"' where id='"+id+"'",[],(result)=>{
            if(success)success(result.rows.raw())
        },error)
    }
    getAll(tableName,success,error) {
        this.execute('select * from '+tableName+' order by id desc',[],(result)=>{
            if(success)success(result.rows.raw())
        },error)
    }
    createByObject(tableName,obj,success,error){
        var fields="",params="",values=[];
        for(var key in obj){
            var value=obj[key];
            fields+=','+key;
            params += ',?';
            values.push(value);
        }
        if(values.length>0){
            fields=fields.substr(1);
            params=params.substr(1);
            var sql="insert into "+tableName+" ("+fields+") values ("+params+")";
            this.execute(sql,values,(result)=>{
                if(success)success(result);
            },error)
        }
    }
    updateByObject(tableName,id,obj,success,error){
        var fields="",values=[];
        for(var key in obj){
            var value=obj[key];
            fields+=','+key+"=?";
            values.push(value);
        }
        if(values.length>0){
            fields=fields.substr(1);
            var sql="update "+tableName+" set "+fields+" where id='"+id+"'";
            this.execute(sql,values,(result)=>{
                if(success)success(result);
            },error)
        }
    }
    removeObjectByIds(tableName,ids,success,error){
        if(ids.length>0&&ids.length<100){
            var params=""
            for(var i=0;i<ids.length;i++)
                params += ',?';
            params=params.substr(1);
            this.execute("delete from "+tableName+" where id in ("+params+")",ids,success,error);
        }
    }
    exportToExcel(tableName,success,error){
        var name=DateUtil.getCurrentTimeStr();
        var excelPath="/excels/"+tableName+"_"+name+".xls"
        var sql="insert into excel (type,path) values (?,?)";
        this.opendb(
            ()=>{
                SQLite.startExportSingleTable(defaultDbName,tableName, excelPath,()=>{
                    this.execute(sql,[tableName,name+'.xls'],success,error);
                },error)
            },
            ()=>{
               if(error)error();
            }
        );
    }

}