const API = 'http://localhost:5000/api/v1/guitars';
const btn = document.getElementById('submitBtn');
const token = localStorage.getItem('token');

if (!token) window.location.href = 'signin.html'

async function addGuitar() {
    const name = document.getElementById('name').value;
    const model = document.getElementById('model').value;
    const color = document.getElementById('color').value;
    const price = parseFloat(document.getElementById('price').value);
    const in_stock = document.getElementById('in_stock').checked;

    const response = await fetch(API, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, model, color, price, in_stock})
    })

    window.location.href = 'index.html'
}

btn.addEventListener('click', addGuitar)