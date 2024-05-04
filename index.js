

let cartItems = [];
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

// При загрузке страницы проверяем наличие сохраненных данных в локальном хранилище
window.onload = () => {
    // Получаем данные из локального хранилища
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    // Если есть сохраненные данные, загружаем их в переменную cartItems
    if (savedCartItems) {
        cartItems = savedCartItems;
    }
    // Отображаем корзину
    renderCart();
};

// Функция для добавления товара в корзину
const addToCart = (name, price) => {
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ name, price, quantity: 1 });
    }
    // Сохраняем данные в локальное хранилище
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
}

// Функция для удаления товара из корзины
const removeFromCart = (index) => {
    cartItems.splice(index, 1);
    // Сохраняем данные в локальное хранилище
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
}

// Функция для оформления заказа
const checkout = () => {
    sendOrderToTelegram();
    // Очищаем корзину и удаляем данные из локального хранилища
    cartItems = [];
    localStorage.removeItem('cartItems');
    renderCart();
    alert('Заказ оформлен!');
}

// Функция для отправки заказа в телеграм
const sendOrderToTelegram = () => {
    // Получаем значения полей имени, телефона и адреса
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    // Создаем сообщение с данными о заказе и информацией о клиенте
    let message = `Новый заказ!\n\nИмя: ${name}\nТелефон: ${phone}\nАдрес: ${address}\n\n`;
    let totalPrice = calculateTotalPrice();

    cartItems.forEach(({ name, price, quantity }) => {
        const itemTotal = price * quantity;
        message += `${name} - ${price} руб. x ${quantity} = ${itemTotal} руб.\n`;
    });

    message += `\nОбщая стоимость: ${totalPrice} руб.`;

    // Отправляем сообщение в телеграм
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.telegram.org/bot5790561769:AAFXHNyxsGSq2z7I0ds6HhSKaNisZ416m8U/sendMessage', true); // Замените YOUR_BOT_TOKEN на ваш токен бота
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ chat_id: '-1002094926558', text: message })); // Замените YOUR_CHAT_ID на ID вашего чата в телеграм
}


// Функция для вычисления общей стоимости заказа
const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}






//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-1002094926558!!!bot5790561769:AAFXHNyxsGSq2z7I0ds6HhSKaNisZ416m8U