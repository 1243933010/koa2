const fs = require('fs')
const path = require('path')

const user = require('../mongodb/user');
let { main, modify } = user;

let uploadImg = async (ctx, next) => {
    // console.log(ctx.request.files.file,'-----')
    //上传单个文件
    let file = ctx.request.files.file;
    //创建可读流(读取前端选择的文件路径)
    let reader = fs.createReadStream(file.path)
    //创建路径(创建服务端图片路径)
    let filePath = path.join(__dirname, '..', 'static/upload/') + `${file.name}`

    //创建可写流(让此路径文件可以被写)
    let upStream = fs.createWriteStream(filePath);

    let name = await main({ name: ctx.request.body.name });

    if (name) {
        modify(name[0], { url: filePath }).then((res) => {
            reader.pipe(upStream);
            ctx.response.body = { code: 0, msg: 'success', data: filePath }
        })
    } else {
        ctx.response.body = { code: -1, msg: '没有找到用户名' }
        return
    }

    //可读流通过管道写入可写流
}

module.exports = {
    uploadImg
}