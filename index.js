// Объект для хранения товаров в корзине
let cartItems = [];

// Функция для добавления товара в корзину
function addToCart(name, price) {
    // Проверяем, есть ли уже такой товар в корзине
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        // Если товар уже есть в корзине, увеличиваем количество
        existingItem.quantity++;
    } else {
        // Если товара еще нет в корзине, добавляем новый элемент
        cartItems.push({ name, price, quantity: 1 });
    }
    renderCart();
}

// Функция для удаления товара из корзины
function removeFromCart(index) {
    cartItems.splice(index, 1);
    renderCart();
}

// Функция для отображения корзины
function renderCart() {
    const cartElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price'); // Новый элемент для общей стоимости
    cartElement.innerHTML = '';
    let totalPrice = 0;
    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${item.name} - ${item.price} руб. x ${item.quantity}</span>
            <button onclick="removeFromCart(${index})">Удалить</button>
        `;
        cartElement.appendChild(itemElement);
        totalPrice += item.price * item.quantity;
    });
    // Отображаем общую стоимость
    totalPriceElement.textContent = `Общая стоимость: ${totalPrice} руб.`;
}

// Функция для оформления заказа
function checkout() {
    // Отправка заказа в телеграмм
    sendOrderToTelegram();
    // Очистка корзины после оформления заказа
    cartItems = [];
    renderCart();
    alert('Заказ оформлен!');
}

// Функция для отправки заказа в телеграмм
function sendOrderToTelegram() {
    let message = "Новый заказ!\n\n";
    let totalPrice = 0;

    // Перебираем все товары в корзине
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        // Формируем строку с информацией о товаре
        const itemMessage = `${item.name} - ${item.price} руб. x ${item.quantity} = ${itemTotal} руб.\n`;
        message += itemMessage;
    });

    // Добавляем информацию о общей стоимости
    message += `\nОбщая стоимость: ${totalPrice} руб.`;

    // Отправляем сообщение в телеграм
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.telegram.org/bot5790561769:AAFXHNyxsGSq2z7I0ds6HhSKaNisZ416m8U/sendMessage', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ chat_id: '-1002094926558', text: message }));
}

// Функция для вычисления общей стоимости заказа
function calculateTotalPrice() {
    let totalPrice = 0;
    cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    return totalPrice;
}






//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-1002094926558!!!bot5790561769:AAFXHNyxsGSq2z7I0ds6HhSKaNisZ416m8U