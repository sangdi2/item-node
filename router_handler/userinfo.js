const db =require('../db/index')


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