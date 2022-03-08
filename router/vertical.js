const express =require('express')

const router =express()

const vertical =require('../router_handler/vertical')

router.get('/getcase',vertical.getverticalcase)

router.post('/updateverticalcase',vertical.updateverticalcase)

router.get('/deleteverticalcase/:id',vertical.deleteverticalcase)

router.get('/searchverticalcase/:id',vertical.searchverticalcase)

router.post('/idupdatecase',vertical.idupdateverticalcase)
module.exports=router