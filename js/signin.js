const formSubmission = document.getElementById('signInForm');

formSubmission.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://guitar-inventory-api.onrender.com/api/v1/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ email, password })
    })

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('token', data.token)
        window.location.href = 'index.html'
    } else {
        alert(data.error);
    }
})