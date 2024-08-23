document.getElementById('shopAuthForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const shopName = document.getElementById('shopName').value;
    const email = document.getElementById('shopEmail').value;
    const password = document.getElementById('shopPassword').value;
    const action = document.getElementById('shopAction').value;

    if (shopName && email && password && action) {
        if (action === 'register') {
            const shopData = { shopName, email, password };
            localStorage.setItem('shop_' + email, JSON.stringify(shopData));
            alert('Registration successful! Please login.');
            document.getElementById('shopAuthForm').reset();
        } else if (action === 'login') {
            const storedShop = localStorage.getItem('shop_' + email);
            if (storedShop) {
                const shopData = JSON.parse(storedShop);
                if (shopData.password === password) {
                    alert('Login successful!');
                    window.location.href = 'shop-dashboard.html'; // Redirect to shop dashboard
                } else {
                    alert('Incorrect password.');
                }
            } else {
                alert('Shop not found. Please register.');
            }
        }
    } else {
        alert('Please fill out all fields.');
    }
});
