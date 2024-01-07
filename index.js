
// let cart = [];
// let nextItemId = 1;

// function addToCart(itemName, itemPrice) {
//     const newItem = { id: nextItemId, name: itemName, price: itemPrice };
//     cart.push(newItem);
//     nextItemId++;
//     updateCart();
// }
let cart = [];
let nextItemId = 1;

function addToCart(itemName, itemPrice) {
    const addButton = document.getElementById(`${itemName.toLowerCase().replace(/\s/g, '')}Button`);

    if (addButton) {
        addButton.disabled = true; // Disable the button
        addButton.textContent = 'Added to Cart'; // Change button text
        addButton.style.backgroundColor = '#A9A9A9';
    }

    const newItem = { id: nextItemId, name: itemName, price: itemPrice };
    cart.push(newItem);
    nextItemId++;
    updateCart();
}

// updateCart
function updateCart() {
    const cartList = document.getElementById('list-ol');
    const totalAmountElement = document.getElementById('price');

    cartList.innerHTML = "";
    let totalAmount = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price}`;

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.borderRadius = '15px';
        
        deleteButton.addEventListener('click', () => {
            deleteCartItem(item.id);
        });

        listItem.appendChild(deleteButton);
        cartList.appendChild(listItem);

        totalAmount += item.price;
    });

    totalAmountElement.textContent = `Total price: $${totalAmount}`;
    document.getElementById('mPurchase').disabled = cart.length === 0;
}

// deleteCartItem
function deleteCartItem(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        updateCart();
    }
}
