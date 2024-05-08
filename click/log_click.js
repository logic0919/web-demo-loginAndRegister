window.addEventListener('load', () => {
    const search = location.search.slice(4)
    if (search) {
        document.querySelector('#id').value=search
    } 
    const btn = document.querySelector('button')
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        const id = document.querySelector('#id').value
        const pwd = document.querySelector('#pwd').value
        axios({
            url: 'http://localhost/login',
            method: 'post',
            data: {
                id, pwd
            }
        }).then(result => {
            localStorage.setItem('token', result.data.token)
            const div = document.querySelector('div')
            console.log(result.data);
            div.innerHTML = result.data.message
            setTimeout(() => {
                div.innerHTML = ''
            }, 2000);
            if (result.data.status == 0) {
                location.href = 'index.html'
            }
        })
    })
})