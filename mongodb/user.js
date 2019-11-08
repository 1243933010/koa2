const Monk = require('monk')
const mongodb = Monk('localhost/Dev')
const user = mongodb.get('user')
 
 const main =  (num={})=>{
    return new Promise((resolve,reject)=>{
        const data1 =  user.find(num);
        resolve(data1) 
    })
}//查找

const insert = (data)=>{
    user.insert(data)
}//增加

const remove = (data)=>{
    user.remove(data);
 }//删除
 
 const modify = (data,data1)=>{
    return new Promise((resolve,reject)=>{
        user.update(data,{$set:data1},{multi: true});
        resolve()
    })
}//修改




module.exports={
    main,
    insert,
    remove,
    modify
}
