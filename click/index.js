window.addEventListener('load', () => {
    let token = (localStorage.getItem('token') || '').slice(7)
    let btn = document.querySelector('button')
    btn.addEventListener('click', () => {
        localStorage.setItem('token','')
        location.href = 'login.html'
    })
    if (token == '') {
        alert('请先登录，一秒后将跳转至登录页面')
        location.href = 'login.html'
    } else {
        axios({
            url: 'http://localhost/index',
            method: 'post',
            data: {
                token
            }
        }).then(result => {
            console.log(result.data);
            if (result.data.message == 'jwt expired') {
                alert('token失效，请重新登录，一秒后将跳转至登录页面')
                location.href = 'login.html'
            } else {
                alert('已登录')
            }
        })
    }
    
})