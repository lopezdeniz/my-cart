// Объект для хранения товаров в корзине
let cartItems = [];

// Функция для добавления товара в корзину
const addToCart = (name, price) => {
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ name, price, quantity: 1 });
    }
    renderCart();
}

// Функция для удаления товара из корзины
const removeFromCart = (index) => {
    cartItems.splice(index, 1);
    renderCart();
}

// Функция для отображения корзины
const renderCart = () => {
    const cartElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartElement.innerHTML = '';
    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        const { name, price, quantity } = item;
        const itemTotal = price * quantity;
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${name} - ${price} руб. x ${quantity}</span>
            <button onclick="removeFromCart(${index})">Удалить</button>
        `;
        cartElement.appendChild(itemElement);
        totalPrice += itemTotal;
    });

    totalPriceElement.textContent = `Общая стоимость: ${totalPrice} руб.`;
}

// Функция для оформления заказа
const checkout = () => {
    sendOrderToTelegram();
    cartItems = [];
    renderCart();
    alert('Заказ оформлен!');
}

// Функция для отправки заказа в телеграм
const sendOrderToTelegram = () => {
    let message = "Новый заказ!\n\n";
    let totalPrice = calculateTotalPrice();

    cartItems.forEach(({ name, price, quantity }) => {
        const itemTotal = price * quantity;
        message += `${name} - ${price} руб. x ${quantity} = ${itemTotal} руб.\n`;
    });

    message += `\nОбщая стоимость: ${totalPrice} руб.`;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.telegram.org/bot5790561769:AAFXHNyxsGSq2z7I0ds6HhSKaNisZ416m8U/sendMessage', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ chat_id: '-1002094926558', text: message }));
}

// Функция для вычисления общей стоимости заказа
const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// При загрузке страницы вызываем функцию для отображения товаров в корзине
window.onload = () => {
    renderCart();
};






//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-1002094926558!!!bot5790561769:AAFXHNyxsGSq2z7I0ds6HhSKaNisZ416m8U