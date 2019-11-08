const login = require('../mongodb/login');
const {main} = login;

let findLogin = async (ctx,next)=>{
    let data = ctx.request.body;
    let val = await main({name:data.name});
    if(val.length){
        data.pwd == val[0].pwd?
        ctx.response.body = { code: 0, msg: 'success',data:val }:
        ctx.response.body = { code: -1, msg: '密码错误'}
    }else{
        ctx.response.body = { code: -1, msg: '没找到用户',data:'' }
    }
}

module.exports={
    findLogin
}