const express = require('express')
const router = express.Router()
const handler = require('./router_handler.js')

// // 导入验证字符串的包
const expressjoi = require('@escook/express-joi')
// // 导入验证规则
// const { userSchema1, userSchema2}=require('./schema')


// 注册接口
const mw1 = (req, res, next) => {
    console.log('中间件');
    next()
}
router.post('/register',handler.register)
// 登录接口
router.post('/login', handler.login)
router.post('/index',mw1,handler.index)

module.exports = router