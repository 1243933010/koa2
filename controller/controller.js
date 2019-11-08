const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors'); //解决跨域
const bodyParser = require('koa-bodyparser');  //解析post请求
const router = require('koa-router')();   //路由
const koaBody = require('koa-body'); //文件上传
const statics = require('koa-static'); //静态文件
const path = require('path'); 



const url = require('../config/url') //路由地址
const { index, userModify, userDel, userList, hello,loginUrl,registerUrl,uploadUrl} = url;

const customMiddleware = require('./user') //user自定义中间件
let {routerBefore,insertUser,findtUser,removetUser,modifyUser,indexRoute} = customMiddleware;

const login = require('./login'); //登录处理函数
let {findLogin} = login;

const register = require('./register'); //注册处理函数逻辑
let {registerFnc} = register;

const upload = require('./upload'); //上传处理函数逻辑
let {uploadImg} = upload;


app.use(routerBefore);//自定义中间件
router.get(hello, insertUser)//增加
router.post(userList,findtUser)//用户列表
router.post(userDel,removetUser)//删除
router.post(userModify, modifyUser)//修改
router.get(index, indexRoute); //主页路由
router.post(loginUrl,findLogin) //登录界面
router.post(registerUrl,registerFnc) //注册界面
router.post(uploadUrl,uploadImg) //图片上传


module.exports={
    cors,
    bodyParser,
    router,
    koaBody,
    statics,
    path
}