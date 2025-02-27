const form = document.getElementById('loginForm')

form.addEventListener('submit', async(e)=> {
    e.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const address = document.getElementById('address').value

    const response = await fetch('http://localhost:3030/cadastro', {   
        method:'POST',
        headers:{'Content-Type': ' application/json'},
        body: JSON.stringify({username, password, address})
    })
    console.log(response);
    const results = await response.json()

    if (results.success) {
        alert('cadastro bem sucedido')
        window.location.href='dashboard.html'
    } else {
        alert('Falta alguma informação')
    }

})