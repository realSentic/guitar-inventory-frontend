const signupSubmission = document.getElementById('signUpForm');

signupSubmission.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://guitar-inventory-api.onrender.com/api/v1/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (response.ok) {
        window.location.href = 'signin.html'
    } else {
        alert(data.error)
    }
})