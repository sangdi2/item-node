const express =require('express')

const router =express.Router()

const gui =require('../router_handler/userinfo')

router.get('/getuserinformation',gui.getuserinformation)

module.exports=router