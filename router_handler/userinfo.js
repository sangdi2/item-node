const db =require('../db/index')

const bcryptjs=require('bcryptjs')

exports.getuserinformation=function(req,res){
    const sqli ='select id, username, nickname, email, user_pic from users where id=?'
    db.query(sqli,req.user.id,function(err,results){
        if(err){
            return res.cc(err)
        }
        if(results.length!=1){
            return res.cc('获取用户信息失败！')
        }
        res.send({
            status:1,
            message:'获取用户信息成功',
            data:results[0]
        })
    })
    // res.send('ok!!!')
    
}
const sqlll ='update users set ? where id=?'
exports.updateuserinformation=function(req,res){
    db.query(sqlll,[req.body,req.body.id],function(err,results){
        if(err){
            return res.cc(err)
        }
        if(results.affectedRows !== 1){
            return res.cc('修改用户信息失败')
        }
        res.send({
            status:1,
            message:'修改用户信息成功',
            
        })
    })
     
}

const pwd ='select * from users where id=?'
exports.updatepwd=function(req,res){
    db.query(pwd,req.body.id,function(err,results){
        if(err){
            return res.cc(err)
        }
        if(results.length!== 1){
            return res.cc('用户不存在')
        }
        const compareResult = bcryptjs.compareSync(req.body.password, results[0].password)
        if(!compareResult){
            return res.cc('原密码错误')
        }
        const updatepwd ='update users set password=? where id=?'
        const newPwd = bcryptjs.hashSync(req.body.newpassword, 10)
        db.query(updatepwd,[newPwd,req.body.id],function(err,results){
            if(err){
                return res.cc(err)
            }
            if(results.affectedRows !== 1){
                return res.cc('修改用户密码失败')
            }
            res.send({
                status:1,
                message:'更新密码成功'
            })
        })
    })
   
}
const userpic ='update users set user_pic=? where id=?'
exports.updateuserpic=function(req,res){
    db.query(userpic,[req.body.user_pic,req.body.id],function(err,results){
        if(err)
        {
            return res.cc(err)
        }
        if(results.affectedRows !== 1){
            return res.cc('修改用户头像信息失败')
        }
        res.send({
            status:1,
            message:'修改用户头像信息成功'
        })
    })
}