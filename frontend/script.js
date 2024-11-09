const form = document.getElementById('loginForm')

form.addEventListener('submit', async(e)=> {
    e.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const response = await fetch('http://localhost:3030/login', {   
        method:'POST',
        headers:{'Content-Type': ' application/json'},
        body: JSON.stringify({username, password})
    })
    console.log(response);
    const results = await response.json()

    if (results.success) {
        alert('login bem sucedido')
        window.location.href='dashboard.html'
    } else {
        alert('Usuario ou senha incorretas')
    }

})