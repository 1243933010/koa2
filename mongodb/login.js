const Monk = require('monk')
const mongodb = Monk('localhost/Dev')
const login = mongodb.get('login');

const main = (val)=>{
    return new Promise((resolve,reject)=>{
        let data = login.find(val)
        resolve(data)
    })
}//登录查找
const insert = (val)=>{
        return new Promise((resolve,reject)=>{
            login.insert(val)
            resolve(val)
        })
}//注册插入

module.exports={
    main,
    insert
}