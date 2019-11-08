const user = require('../mongodb/user')
const { main, insert, remove, modify } = user

let routerBefore = async (ctx, next) => {
    await next(); // 调用下一个middleware
    if (Object.is(ctx.status, 404)) {
        ctx.response.body = '404界面'
    }//写在next下面,会在所有next函数执行完后返回回来执行,这时候可以判断路由是否匹配
}

let insertUser = async (ctx, next) => {
    let obj = ctx.request.query
    try {
        insert(obj);
        ctx.response.body = { code: 0, msg: 'success', data: {} }; //返回的数据
    } catch{
        ctx.response.body = { code: -1, msg: 'success', data: {} }; //返回的数据
    }

} //增加

let findtUser = async (ctx, next) => {
    let data = ctx.request.body;
    try {
        if (data.id) {
            let res = await main({ id: data.id });
            ctx.response.body = { code: 0, msg: 'success', data: res }
        } else {
            let res = await main();
            ctx.response.body = { code: 0, msg: 'success', data: res }
        }
    } catch{
        ctx.response.body = { code: -1, msg: 'success', data: {} }
    }

} //查找

let removetUser = async (ctx, next) => {
    let data = ctx.request.body;
    try {
        remove(data);
        ctx.response.body = { code: 0, msg: 'success' }
    } catch{
        ctx.response.body = { code: -1, msg: 'success' }
    }
} //删除


let modifyUser = async (ctx, next) => {
    let data = ctx.request.body;
    try {
        let find = await main({ id: data.id });
        await modify(find[0], data);
        ctx.response.body = { code: 0, msg: 'success' }
    } catch{
        ctx.response.body = { code: -1, msg: 'success' }
    }

} //修改


let indexRoute = async (ctx, next) => {
    let obj = ctx.request.query
    ctx.response.body = '这是本地测试服务主页' //返回的数据
} //主页路由



module.exports = {
    routerBefore,
    insertUser,
    findtUser,
    removetUser,
    modifyUser,
    indexRoute
}