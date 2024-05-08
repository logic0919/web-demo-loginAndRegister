window.addEventListener('load', () => {
    const btn = document.querySelector('#btn')
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        const id = document.querySelector('#id').value
        const un=document.querySelector('#un').value
        const pwd = document.querySelector('#pwd').value
        axios({
            url: 'http://localhost/register',
            method: 'post',
            data: {
                id,un,pwd
            }
        }).then(result => {
            console.log(result.data);
            const div = document.querySelector('div')
            div.innerHTML = result.data.message
            location.href = `login.html?id=${id}`
        })
    })
})