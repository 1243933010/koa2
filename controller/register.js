const login = require('../mongodb/login');
const {insert} = login;

let registerFnc = (ctx,next)=>{
    let data = ctx.request.body.files;
    insert(data).then((res)=>{
        ctx.response.body = { code: 0, msg: 'success' }
    })
}

module.exports={
    registerFnc
}