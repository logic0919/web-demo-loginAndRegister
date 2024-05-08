const express = require('express')
const app = express()


// 在路由之前，通过全局中间件为res挂载一个cc函数
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// // 导入cors允许跨域资源共享
const cors = require('cors')
app.use(cors())

// 解析 post 表单数据的中间件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// // 导入express-jwt
// const expressJWT = require('express-jwt')
// const config = require('./config.js')
// // 符合unless的路径不需要解析token
// app.use(expressJWT({ secret: config.jwtSerectKey }).unless({ path: [/^\/api\//] }))

// const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '1h' })
// res.send({
//     status: 200,
//     message: '登录成功！',
//     token: tokenStr,
// })


// // 全局错误处理中间件
app.use((err, req, res, next) => {
    // joi参数校验错误
    if (err instanceof joi.ValidationError) {
        return res.send({
            status: 1,
            message: err.message
        })
    }
    // 这次错误是由 token 解析失败导致的
    else if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 401,
            message: '无效的token',
        })
    }
    // 未知错误
    res.send({
        status: 1,
        message: err.message
    })
})

// 调用 app.listen 方法，指定端口号并启动web服务器
const router = require('./router')
app.use(router)
app.listen(80, () => {
    console.log('running');
})