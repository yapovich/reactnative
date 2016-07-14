/**
 * Created by yebo on 2016/7/14.
 */
var views={
    get Index(){return require('./views/index')},//主页
    get Update(){return require('./views/update')},//更新页
    get Welcome(){return require('./views/welcome')}//欢迎页
}
module.exports=views;