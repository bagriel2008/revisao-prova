async function loadProducts() {
    const response = await fetch('http://localhost:3030/products')
    const data = await response.json()
    const tbody = document.querySelector('tbody')
    tbody.innerHTML = ''

    data.products.forEach(product => {

        const row = document.createElement('tr')
        row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
                <td>
                    <button onclick="editProducts(${product.id})">Editar </button>
                    <button onclick="deleteProducts(${product.id})">Deletar </button>

                </td>

            `
        tbody.appendChild(row)


    }
    );
}

document.querySelector('.product-form form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const name = document.getElementById('product-name').value
    const price = document.getElementById('product-price').value
    const quantity = document.getElementById('product-quantity').value


    await fetch('http://localhost:3030/products', {

        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, price, quantity })
    })

    document.querySelector('.product-form form').reset()
    loadProducts()
})

async function editProducts(id) {
    const name = prompt('novo nome')
    const price = prompt('novo preço')
    const quantity = prompt('nova quantidade')

    await fetch(`http://localhost:3030/products/${id}`, {
        method: 'put',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, price, quantity })
    })

    loadProducts()

}

async function deleteProducts(id) {
    await fetch(`http://localhost:3030/products/${id}`,{
        method: ' DELETE'
    })
    loadProducts
}





loadProducts()