// // 导入生成token字符串的包
const jwt = require('jsonwebtoken')
const config = require('../config.js')

// 导入加密解密的工具
const bcryptjs = require('bcryptjs')

// 导入mysql
const mysql = require('mysql')
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'my_db_02',
})


// 导入验证格式的函数
const { regTest, logTest } = require('./regular.js')

// 注册函数
const register = (req, res) => {
    // 先验证字符串格式
    // 先判断账号是否被占用
    // 然后加入到数据库里
    if (!regTest.id(req.body.id)) {
        return res.cc('id格式应为3至8位数字')
    }
    if (!regTest.un(req.body.un)) {
        return res.cc('用户名格式应为5至8位数字和字母组合')
    }
    if (!regTest.pwd(req.body.pwd)) {
        return res.cc('密码格式应为5至8位数字和字母组合')
    }
    let sqlStr = 'select * from users where id=?'
    db.query(sqlStr, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length != 0) {
            return res.cc('账号被占用')
        }
    })
    const id = req.body.id
    const un = req.body.un
    const pwd = bcryptjs.hashSync(req.body.pwd, 10)
    sqlStr = 'insert into users (id,username,password) values (?,?,?)'
    db.query(sqlStr, [id, un, pwd], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) {
            return res.cc('注册失败')
        }
        return res.cc('注册成功', 0)
    })
}


// // 登录函数
const login = (req, res) => {
    // 先验证字符串格式
    // 判断账号是否存在
    // 验证密码
    // 生成token字符串并相应给客户端
    if (!regTest.id(req.body.id)) {
        return res.cc('id格式应为3至8位数字')
    }
    if (!regTest.pwd(req.body.pwd)) {
        return res.cc('密码格式应为5至8位数字和字母组合')
    }
    let sqlStr = 'select * from users where id=?'
    db.query(sqlStr, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length != 1) {
            return res.cc('账号不存在')
        }
        if (!bcryptjs.compareSync(req.body.pwd, results[0].password)) {
            return res.cc('密码错误')
        }
        const user = { ...req.body, pwd: '' }
        const tokenStr = jwt.sign(user, config.jwtSerectKey, {
            expiresIn: '100000'//有效期为10个小时
        })
        // console.log(jwt.verify(tokenStr, config.jwtSerectKey));//{ id: '100', pwd: '', iat: 1697374015, exp: 1697410015 }
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr//Bearer后面的空格不能丢
        }
        )
    })
}
// 首页展示函数
let index = (req, res) => {
    let token = req.body.token
    jwt.verify(token, config.jwtSerectKey, (err) => {
        if (err) {
            res.cc(err)
        } else {
            res.cc('已登录', 0)
        }
    })

}
module.exports = { register, login, index }