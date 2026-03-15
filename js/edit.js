const API = 'https://guitar-inventory-api.onrender.com/api/v1/guitars';
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const saveBtn = document.getElementById('saveBtn');
const token = localStorage.getItem('token');

if (!token) window.location.href = 'signin.html'

async function editGuitar() {    
    const name = document.getElementById('name').value;
    const model = document.getElementById('model').value;
    const color =  document.getElementById('color').value;
    const price = parseFloat(document.getElementById('price').value);
    const in_stock = document.getElementById('in_stock').checked;

    const response = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify({name, model, color, price, in_stock, id})
    })

    if (response.ok) {
        window.location.href = 'index.html';
    } else {
        console.log(await response.text());
    }



}

saveBtn.addEventListener('click', editGuitar)

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch(`${API}/${id}`);
    const guitar = await response.json();
    console.log(guitar);

    document.getElementById('name').value = guitar.name;
    document.getElementById('model').value = guitar.model;
    document.getElementById('color').value = guitar.color;
    document.getElementById('price').value = guitar.price;
    document.getElementById('in_stock').checked = guitar.in_stock;
})