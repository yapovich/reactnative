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
    doExportToExcel(tableName,success,error){
        var name=DateUtil.getCurrentTimeStr();
        var excelPath="/excels/"+tableName+"_"+name+".xls"
        var sql="insert into excel (type,path) values (?,?)";
        this.opendb(
            ()=>{
                SQLite.startExportSingleTable(defaultDbName,tableName, excelPath,()=>{
                    this.execute(sql,['info',name+'.xls'],success,error);
                },error)
            },
            ()=>{
               if(error)error();
            }
        );
    }

}