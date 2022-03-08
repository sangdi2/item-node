const express =require('express')

const app =express()

const cors =require('cors')



app.use(cors())

app.use(express.urlencoded({extended:false}))
//中间件
app.use(function(req,res,next){
    res.cc=(err,status=0)=>{
        res.send({
            status,
            message:err instanceof Error?err.message:err
        })
        
    }
    //
    next()
})

const config=require('./config')

const expressjwt =require('express-jwt')

app.use(expressjwt({secret:config.jwtsecretkey,algorithms:['HS256']}).unless({path:[/^\/api/]}))

const rt =require('./router/user')

app.use('/api',rt)

const getuserinformation =require('./router/userinfo')

app.use('/my',getuserinformation)

// 错误中间件
app.use(function (err, req, res, next) {
    // 省略其它代码...
  
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  
    // 未知错误...
  })
  

app.listen(8089,function(req,res){
    console.log('http://localhost:8089')
})