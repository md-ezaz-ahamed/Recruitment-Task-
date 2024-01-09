let cart = [];
let nextItemId = 1;

function addToCart(itemName, itemPrice) {
    const buttonId = `${itemName.toLowerCase().replace(/\s/g, '')}Button`;

   
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
       
        existingItem.quantity++;
    } 
    else {
     
        const newItem = { id: nextItemId, name: itemName, price: itemPrice, quantity: 1 };
        cart.push(newItem);
        nextItemId++;
    }

    // Update the button state
    updateButtonState(buttonId, true);

    // Update the cart display
    updateCart();
}

function updateButtonState(buttonId, added) {
    const button = document.getElementById(buttonId);

    if (button) {
        button.disabled = added;
        button.textContent = added ? 'Added to Cart' : 'Add to Order';
        button.style.backgroundColor = added ? '#A9A9A9' : '';
    }
}

function updateCart() {
    const cartList = document.getElementById('list-ol');
    const totalAmountElement = document.getElementById('price');

    cartList.innerHTML = "";
    let totalAmount = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;

       
        const increaseButton = createQuantityButton('Increase', () => adjustQuantity(item.id, 1));
        const decreaseButton = createQuantityButton('Decrease', () => adjustQuantity(item.id, -1));

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        
        deleteButton.style.borderRadius = '15px';
        deleteButton.addEventListener('click', () => deleteCartItem(item.id));

        listItem.appendChild(increaseButton);
        listItem.appendChild(decreaseButton);
        listItem.appendChild(deleteButton);
        cartList.appendChild(listItem);
        

        // Update total amount
        totalAmount += item.price * item.quantity;
    });

    totalAmountElement.textContent = `Place Order : $${totalAmount.toFixed(2)}`;
    document.getElementById('mPurchase').disabled = cart.length === 0;
}

function createQuantityButton(label, onClick) {
    const button = document.createElement('button');
    button.textContent = label;
    button.style.borderRadius = '15px';

   
    if (label === 'Increase') {
        button.style.backgroundColor = '#4CAF50';
        button.style.borderRadius = "100px";
        button.style.color = 'white';
        button.style.marginRight = '10px';
        button.style.marginLeft = '10px';
        button.style.marginTop = '10px';
        button.style.marginBottom = '10px';
        button.style.padding = '5px 10px';
        button.style.fontSize = '14px';
        button.style.cursor = 'pointer';
        button.style.transition = 'background-color 0.3s ease';
        } else {
        button.style.backgroundColor = '#f44336';
        button.style.color = 'white';
        button.style.marginRight = '10px';
        button.style.marginLeft = '10px';
        button.style.marginTop = '10px';
        button.style.marginBottom = '10px';
        button.style.padding = '5px 10px';
        button.style.fontSize = '14px';
        button.style.cursor = 'pointer';
        button.style.transition = 'background-color 0.3s ease';
    }
    
    button.addEventListener('click', onClick);
    return button;
}

function adjustQuantity(itemId, amount) {
    const item = cart.find(item => item.id === itemId);

    if (item) {
        
        item.quantity = Math.max(1, item.quantity + amount);
        updateCart();
    }
}

function deleteCartItem(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        updateCart();
    }
}
