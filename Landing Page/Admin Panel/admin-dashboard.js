document.addEventListener('DOMContentLoaded', () => {
    // Check if admin is logged in
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'admin_login.html';
        return;
    }

    const shopsTable = document.getElementById('shopsTable').querySelector('tbody');
    const usersTable = document.getElementById('usersTable').querySelector('tbody');
    const addShopButton = document.getElementById('addShopButton');
    const addUserButton = document.getElementById('addUserButton');
    const shopModal = document.getElementById('shopModal');
    const userModal = document.getElementById('userModal');
    const closeShopModal = document.getElementById('closeShopModal');
    const closeUserModal = document.getElementById('closeUserModal');
    const shopForm = document.getElementById('shopForm');
    const userForm = document.getElementById('userForm');
    const logoutButton = document.getElementById('logoutButton');

    let shops = JSON.parse(localStorage.getItem('shops')) || [];
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let isEditingShop = false;
    let isEditingUser = false;

    const renderShops = () => {
        shopsTable.innerHTML = '';
        shops.forEach((shop, index) => {
            const row = shopsTable.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${shop.name}</td>
                <td>${shop.email}</td>
                <td>
                    <button onclick="editShop(${index})">Edit</button>
                    <button onclick="deleteShop(${index})">Delete</button>
                </td>
            `;
        });
    };

    const renderUsers = () => {
        usersTable.innerHTML = '';
        users.forEach((user, index) => {
            const row = usersTable.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="editUser(${index})">Edit</button>
                    <button onclick="deleteUser(${index})">Delete</button>
                </td>
            `;
        });
    };

    window.editShop = (index) => {
        isEditingShop = true;
        const shop = shops[index];
        document.getElementById('shopId').value = index;
        document.getElementById('shopName').value = shop.name;
        document.getElementById('shopEmail').value = shop.email;
        document.getElementById('shopPassword').value = shop.password;
        document.getElementById('shopModalTitle').innerText = 'Edit Shop';
        shopModal.style.display = 'block';
    };

    window.editUser = (index) => {
        isEditingUser = true;
        const user = users[index];
        document.getElementById('userId').value = index;
        document.getElementById('userName').value = user.name;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userPassword').value = user.password;
        document.getElementById('userModalTitle').innerText = 'Edit User';
        userModal.style.display = 'block';
    };

    window.deleteShop = (index) => {
        shops.splice(index, 1);
        localStorage.setItem('shops', JSON.stringify(shops));
        renderShops();
    };

    window.deleteUser = (index) => {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        renderUsers();
    };

    shopForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('shopId').value;
        const name = document.getElementById('shopName').value;
        const email = document.getElementById('shopEmail').value;
        const password = document.getElementById('shopPassword').value;

        const shop = { name, email, password };

        if (isEditingShop) {
            shops[id] = shop;
            isEditingShop = false;
        } else {
            shops.push(shop);
        }

        localStorage.setItem('shops', JSON.stringify(shops));
        renderShops();
        shopModal.style.display = 'none';
        shopForm.reset();
    });

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('userId').value;
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const password = document.getElementById('userPassword').value;

        const user = { name, email, password };

        if (isEditingUser) {
            users[id] = user;
            isEditingUser = false;
        } else {
            users.push(user);
        }

        localStorage.setItem('users', JSON.stringify(users));
        renderUsers();
        userModal.style.display = 'none';
        userForm.reset();
    });

    addShopButton.addEventListener('click', () => {
        shopModal.style.display = 'block';
    });

    addUserButton.addEventListener('click', () => {
        userModal.style.display = 'block';
    });

    closeShopModal.addEventListener('click', () => {
        shopModal.style.display = 'none';
    });

    closeUserModal.addEventListener('click', () => {
        userModal.style.display = 'none';
    });

    window.onclick = (event) => {
        if (event.target == shopModal) {
            shopModal.style.display = 'none';
        }
        if (event.target == userModal) {
            userModal.style.display = 'none';
        }
    };

    logoutButton.addEventListener('click', () => {
        // Clear session data or localStorage
        localStorage.removeItem('adminLoggedIn');
        // Redirect to login page
        window.location.href = 'admin_login.html';
    });

    renderShops();
    renderUsers();
});
