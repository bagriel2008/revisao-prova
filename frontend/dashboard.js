async function loadCars() {
    const response = await fetch('http://localhost:3030/Cars')
    const data = await response.json()
    const tbody = document.querySelector('tbody')
    tbody.innerHTML = ''

    data.cars.forEach(car => {

        const row = document.createElement('tr')
        row.innerHTML = `
                <td>${car.id}</td>
                <td>${car.name}</td>
                <td>
                    <button  class = "edit-btn" onclick="editCars(${car.id})">Editar </button>
                    <button class = "delete-btn" onclick="deleteCars(${car.id})">Deletar </button>

                </td>

            `
        tbody.appendChild(row)


    }
    );
}

document.querySelector('.car-form form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const name = document.getElementById('car-name').value



    await fetch('http://localhost:3030/cars', {

        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name})
    })

    document.querySelector('.car-form form').reset()
    loadCars()
})

async function editCars(id) {
    const name = prompt('novo nome')

    await fetch(`http://localhost:3030/cars/${id}`, {
        method: 'put',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name })
    })

    loadCars()

}

async function deleteCars(id) {
    await fetch(`http://localhost:3030/cars/${id}`,{
        method: 'DELETE'
    })
    loadCars()
}

loadCars()