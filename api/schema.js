const joi = require('@hapi/joi')

// 这个是注册时数据格式验证
const userSchema1 = {
    body: {
        // id:joi.pattern(/^[0-9]{3}$/).required(),
        id:joi.required(),
        un:joi.string().alphanum().min(6).max(10).required(),
        pwd: joi.string().alphanum().min(6).max(10).required()
    }
}

// 这个是登录时数据格式验证
const userSchema2 = {
    body: {
        id: joi.required(),
        pwd: joi.string().alphanum().min(6).max(10).required()
    }
}
// 这个是修改密码时数据格式验证
const userSchema3 = {
    body: {
        id: joi.required(), 
        pwd1: joi.string().alphanum().min(6).max(10).required(),
        pwd2: joi.string().alphanum().min(6).max(10).required(),
        pwd3: joi.ref(pwd2)
    }
}
module.exports = { userSchema1, userSchema2}