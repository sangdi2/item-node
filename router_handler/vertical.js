
const db =require('../db/index')

const getcase ='select * from verticalcase where isdelete=0 order by id asc'
exports.getverticalcase=function(req,res){
    db.query(getcase,function(err,results){
        if(err){
            return res.cc(err)
        }
        res.send({
            status:1,
            message:'获取图书列表成功',
            data:results
        })
    })
}
const searchcase ='select * from verticalcase where name=? and alias=?'

const updatecase ='insert into verticalcase set ?'
exports.updateverticalcase=function(req,res){
db.query(searchcase,[req.body.name,req.body.alias],function(err,results){
    if(err){
        return res.cc(err)
    }
    if(results.length==2){
        return res.cc('类名与别名被占用')
    }
    if(results.length==1&&results[0].name==req.body.name&&results[0].alias==req.body.alias){
        return res.cc('类名和别名都被占用')
    }
    if(results.length==1&&results[0].name==req.body.name)
    {
        return res.cc('类名被占用')
    }
    if(results.length==1&&results[0].alias==req.body.alias)
    {
        return res.cc('别名被占用')
    }
    db.query(updatecase,req.body,function(err,results){
        if(err)
        {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
        res.send({
            status:1,
            message:'新增文章分类成功'
        })
    })
})
}
const deletecase ='update verticalcase set isdelete=1 where id=?'
exports.deleteverticalcase=function(req,res){
   db.query(deletecase,req.params.id,function(err,results){
       if(err){
           return res.cc(err)
       }
       if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
       res.send({
           status:1,
           message:'删除文章分类成功'
       })
   })
}
const search ='select * from verticalcase where id=?'
exports.searchverticalcase=function(req,res){
    db.query(search,req.params.id,function(err,results){
        if(err){
            return res.cc(err)
        }
        if(results.length!=1){
            res.cc('查询文章分类失败')
        }
        res.send({
            status:1,
            message:'查询文章分类成功',
            data:results[0]
        })
    })
}
const idsearchcase ='select * from verticalcase where id=?'

const idupdatecase ='update verticalcase set ? where id=?'
exports.idupdateverticalcase=function(req,res){
db.query(idsearchcase,req.body.id,function(err,results){
    if(err){
        return res.cc(err)
    }
    if(results.length==2){
        return res.cc('类名与别名被占用')
    }
    if(results.length==1&&results[0].name==req.body.name&&results[0].alias==req.body.alias){
        return res.cc('类名和别名都被占用')
    }
    if(results.length==1&&results[0].name==req.body.name)
    {
        return res.cc('类名被占用')
    }
    if(results.length==1&&results[0].alias==req.body.alias)
    {
        return res.cc('别名被占用')
    }
    db.query(idupdatecase,[req.body,req.body.id],function(err,results){
        if(err)
        {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
        res.send({
            status:1,
            message:'新增文章分类成功'
        })
    })
})
}