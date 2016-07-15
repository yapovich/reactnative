/**
 * Created by yebo on 2016/7/14.
 */
var views={
    get Welcome(){return require('./views/welcome')},//欢迎页
    get Index(){return require('./views/index')},//主页
    get Update(){return require('./views/update')},//更新
    get Archive(){return require('./views/archive')},//归档
    get Archive_File(){return require('./views/archive_file')},//创建归档文件夹
}
module.exports=views;