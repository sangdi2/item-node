const express =require('express')

const app =express()

const cors =require('cors')



app.use(cors())

app.use(express.urlencoded({extended:false}))

app.use(function(req,res,next){
    res.cc=function(err,status=0){
        res.send({
            status,
            message:err instanceof Error?err.message:err
        })
    }
    next()
})

const rt =require('./router/user')

app.use('/api',rt)

app.listen(8089,function(req,res){
    console.log('http://localhost:8089')
})