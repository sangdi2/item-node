const db =require('../db/index')
const bcryptjs =require('bcryptjs')
const jwt =require('jsonwebtoken')
exports.register=function(req,res){
    const userinfo =req.body
    
    const mysql='select * from users where username=?'
    
    const update ='insert into users set ?'
    if(!userinfo.username||!userinfo.password)
    {
        return res.cc('用户名或密码不允许为空!')
    }
    db.query(mysql,userinfo.username,function(err,results){
        if(err){
            return res.cc(err.message)
        }
        if(results.length>0){
            return res.cc('用户名被占用!')
        }
    })
    userinfo.password=bcryptjs.hashSync(userinfo.password,10)
    db.query(update,{username:userinfo.username,password:userinfo.password},function(err,results){
        if(err){
            return res.cc(err.message)
        }
        if(results.affectedRows !== 1){
            return res.send({status:1,message:'插入用户成功'})
        }
        res.cc('插入用户成功',1)
    })
    
}

exports.login=function(req,res){
    const userinfo =req.body
    const sqll='select * from users where username=?'
    
    if(!userinfo.username||!userinfo.password)
    {
        return res.cc('用户名或密码不允许为空!')
    }
    db.query(sqll,userinfo.username,function(err,results){
        if(err){
            return res.cc(err)
        }
        if(results.length!=1){
            return res.cc('登录失败！')

        }
       const comparepwd= bcryptjs.compareSync(userinfo.password,results[0].password)
       if(!comparepwd){
           return res.cc('密码不正确')

       }
       const user={...results[0],password:'',user_pic:''}
       const config =require('../config')
       const tokenstr =jwt.sign(user,config.jwtsecretkey,{expiresIn:'10h'})
       res.send({
           status:1,
           message:'登陆成功',
           token:'Bearer '+tokenstr
       })
    })

   
}