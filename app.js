const express =require('express')

const app =express()

const cors =require('cors')



app.use(cors())

app.use(express.urlencoded({extended:false}))

const rt =require('./router/user')

app.use('/api',rt)

app.listen(8089,function(req,res){
    console.log('http://localhost:8089')
})