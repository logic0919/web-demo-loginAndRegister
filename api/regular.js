const regId = /^[0-9]{3,8}$/
const regUn = /^[0-9a-zA-Z]{5,8}$/
const regPwd = /^[0-9a-zA-Z]{5,8}$/
const logId = /^[0-9a-zA-Z]{5,8}$/
const logPwd = /^[0-9a-zA-Z]{5,8}$/


const regTest = {
    id: str=> {
        return regId.test(str)
    },
    un: str => {
        return regUn.test(str)
    },
    pwd: str => {
        return regPwd.test(str)
    }
}
const logTest = {
    id: str => {
        return logId.test(str)
    },
    un: str => {
        return logUn.test(str)
    }
}

module.exports={regTest,logTest}