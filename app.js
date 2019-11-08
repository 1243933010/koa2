//引入模块
const Koa = require('koa');

 //官方模块化工具
const controller = require('./controller/controller') 

//实例化
const app = new Koa();


//使用中间件
app.use(controller.statics(controller.path.join(__dirname,'./static')));//显示本地静态文件
app.use(controller.cors()); //解决跨域问题
app.use(controller.bodyParser()); //解决post提交问题
app.use(controller.koaBody({multipart: true,formidable: {maxFileSize: 200*1024*1024} })); //默认上传文件2m

app.use(controller.router.routes());

app.listen(8000);
console.log('app started at port 8000...');

