const API = 'http://localhost:5000/api/v1/guitars'
const tbody = document.querySelector('tbody');
const signOut = document.getElementById('signout')
const token = localStorage.getItem('token');

if (!token) window.location.href = 'signin.html'

async function loadGuitar() {
    const response = await fetch(API, {
        headers: {'Authorization': `Bearer ${token}`}
    });

    const guitars = await response.json();

    tbody.innerHTML = '';
    guitars.forEach(guitar => {
        tbody.innerHTML += `
            <tr>
                <td><span class="guitar-sku">${guitar.id}</span></td>
                <td><span class="guitar-name">${guitar.name}</span></td>
                <td><span class="cat-tag">${guitar.model}</span></td>
                <td><span class="cat-tag">${guitar.color}</span></td>
                <td><span class="price-cell">${guitar.price}</span></td>
                <td><span class="stamp ${guitar.in_stock ? 'stamp-in' : 'stamp-out'}">${guitar.in_stock ? 'In Stock' : 'Out of Stock'}</span></td>
                <td>
                    <div style="display:flex;gap:8px">
                        <button data-id="${guitar.id}" onclick="window.location.href='edit.html'" class="editBtn retro-btn retro-btn-outline" style="padding:4px 10px;font-size:9px">Edit</button>
                        <button data-id="${guitar.id}" class="deleteBtn retro-btn" style="padding:4px 10px;font-size:9px;background:var(--rust);color:var(--paper);border:1px solid var(--rust)">Delete</button>
                    </div>
                </td>
            </tr>
        `;
    });
}



document.addEventListener('DOMContentLoaded', () => {
    loadGuitar();

    tbody.addEventListener('click', async e => {
        const id = e.target.dataset.id;
        if (!id) return;
        
        if (e.target.matches('.deleteBtn')) {
            const response = await fetch(`${API}/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        })

        if (response.ok) {
            loadGuitar();
        }
    }
        
        if (e.target.matches('.editBtn')) {
            window.location.href = `edit.html?id=${e.target.dataset.id}`
        }

    })

    signOut.addEventListener('click', async () => {
        localStorage.removeItem('token')
        window.location.href = 'signin.html'
    })

});


