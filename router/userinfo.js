const express =require('express')

const router =express.Router()

const gui =require('../router_handler/userinfo')





router.get('/getuserinformation',gui.getuserinformation)

router.post('/updateuserinformation',gui.updateuserinformation)

router.post('/updatepwd',gui.updatepwd)

router.post('/update/avatar',gui.updateuserpic)

module.exports=router