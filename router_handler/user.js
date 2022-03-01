exports.register=function(req,res){
    const userinfo =req.body
    const db =require('../db/index')
    const mysql='select * from users where username=?'
    const bcryptjs =require('bcryptjs')
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
    res.send('登录成功')
}