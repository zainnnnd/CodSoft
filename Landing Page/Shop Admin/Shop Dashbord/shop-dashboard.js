document.addEventListener('DOMContentLoaded', function() {
    const ordersContainer = document.getElementById('ordersContainer');

    // Load orders from local storage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('order_')) {
            const orderData = JSON.parse(localStorage.getItem(key));
            const orderElement = document.createElement('div');
            orderElement.className = 'order';
            orderElement.innerHTML = `
                <h3>Order from ${orderData.name}</h3>
                <p>Contact: ${orderData.contact}</p>
                <p>Vehicle: ${orderData.vehicle}</p>
                <p>Problem: ${orderData.problem}</p>
                <p>Location: ${orderData.location}</p>
                <p>Preferred Shop: ${orderData.shop}</p>
            `;
            ordersContainer.appendChild(orderElement);
        }
    }
});
