// Store user data and orders in local storage

// Function to handle sign up
document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;

    if (name && email && password) {
        const userData = { name, email, password };
        localStorage.setItem('user_' + email, JSON.stringify(userData));
        alert('Sign up successful! Please sign in.');
        document.getElementById('signUpForm').reset();
    } else {
        alert('Please fill out all fields.');
    }
});

// Function to handle sign in
document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;

    const storedUser = localStorage.getItem('user_' + email);
    if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.password === password) {
            alert('Sign in successful!');
            document.getElementById('signInForm').reset();
            document.getElementById('orderFormSection').style.display = 'block';
            document.getElementById('sign-up-form').style.display = 'none';
            document.getElementById('sign-in-form').style.display = 'none';
        } else {
            alert('Incorrect password.');
        }
    } else {
        alert('User not found. Please sign up.');
    }
});

// Function to handle order submission
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('orderName').value;
    const contact = document.getElementById('orderContact').value;
    const vehicle = document.getElementById('orderVehicle').value;
    const problem = document.getElementById('orderProblem').value;
    const location = document.getElementById('orderLocation').value;
    const shop = document.getElementById('orderShop').value;

    if (name && contact && vehicle && problem && location && shop) {
        const orderData = { name, contact, vehicle, problem, location, shop };
        localStorage.setItem('order_' + new Date().getTime(), JSON.stringify(orderData));
        alert('Order placed successfully!');
        document.getElementById('orderForm').reset();
    } else {
        alert('Please fill out all fields.');
    }
});

// Function to detect user location
function detectLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const locationInput = document.getElementById('orderLocation');
            locationInput.value = `Lat: ${lat}, Lon: ${lon}`;
            populateShops();
        }, function(error) {
            alert('Error detecting location. Please enter your location manually.');
            populateShops(); // Populate shops for testing even if location detection fails
        });
    } else {
        alert('Geolocation is not supported by this browser.');
        populateShops(); // Populate shops for testing if geolocation is not supported
    }
}

// Function to populate shop options based on location
function populateShops() {
    const shopSelect = document.getElementById('orderShop');
    shopSelect.innerHTML = '';

    // Sample shops for testing purposes
    const shops = [
        'Hindustan Petrolium',
        'Abdul Petrolium Plant',
        'TATA Bike & Car Service',
        'Xiaomi Auto',
        'Itel Service Center'
    ];

    shops.forEach(shop => {
        const option = document.createElement('option');
        option.value = shop;
        option.textContent = shop;
        shopSelect.appendChild(option);
    });
}

// Check if user is already signed in
document.addEventListener('DOMContentLoaded', function() {
    const storedUser = localStorage.getItem('signed_in_user');
    if (storedUser) {
        document.getElementById('orderFormSection').style.display = 'block';
        document.getElementById('sign-up-form').style.display = 'none';
        document.getElementById('sign-in-form').style.display = 'none';
    }
});
