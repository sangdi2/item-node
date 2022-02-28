const express =require('express')

const router= express.Router()

const rl =require('../router_handler/user')

router.post('/register',rl.register)
router.post('/login',rl.login)

module.exports=router