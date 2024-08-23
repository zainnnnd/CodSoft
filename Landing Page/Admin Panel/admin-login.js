document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    if (email === 'admin@example.com' && password === 'password') {
        localStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'admin-dashboard.html';
    } else {
        alert('Invalid email or password');
    }
});
