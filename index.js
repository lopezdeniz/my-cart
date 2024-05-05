let cartItems = [];

// Функция для обновления количества товаров в корзине и отображения на иконке
const updateCartIconCount = () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartCountElement = cartIcon.querySelector('#cart-count');
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = cartItemCount;
    cartCountElement.style.display = cartItemCount > 0 ? 'inline-block' : 'none';
};

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
            <button onclick="decreaseQuantity(${index})">-</button>
            <button onclick="increaseQuantity(${index})">+</button>
        `;
        itemElement.style.marginRight = '10px'; // Измените значение отступа по вашему усмотрению
        cartElement.appendChild(itemElement);
        totalPrice += itemTotal;
    });

    totalPriceElement.textContent = `Общая стоимость: ${totalPrice} руб.`;

    updateCartIconCount(); // Вызываем функцию обновления счетчика товара
};

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


//1





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

    // Вызываем функцию для обновления счетчика на иконке корзины
    updateCartIconCount();

    renderCart(); // Переместил вызов функции renderCart() после обновления счетчика
};













// Функция для удаления товара из корзины
const removeFromCart = (index) => {
    cartItems.splice(index, 1);
    // Сохраняем данные в локальное хранилище
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();

    // Вызываем функцию для обновления счетчика на иконке корзины
    updateCartIconCount();
};

// Функция для уменьшения количества товара в корзине
const decreaseQuantity = (index) => {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
        updateCartIconCount();
    }
};

// Функция для увеличения количества товара в корзине
const increaseQuantity = (index) => {
    cartItems[index].quantity++;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
    updateCartIconCount();
};

// Функция для оформления заказа
const checkout = () => {
    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.textContent = 'ОТПРАВКА';
    checkoutButton.style.backgroundColor = 'red'; // Меняем цвет кнопки на красный
    checkoutButton.style.width = '150px'; // Устанавливаем фиксированную ширину кнопки, чтобы цвет не выходил за рамки
    checkoutButton.style.margin = '0 auto';
    checkoutButton.style.display = 'block';
    // Отправляем заказ в телеграм
    sendOrderToTelegram();

    setTimeout(() => {
        checkoutButton.textContent = 'Готово! Сейчас мы вам перезвоним для сверки заказа.';
        checkoutButton.style.backgroundColor = ''; // Возвращаем исходный цвет кнопки
        checkoutButton.style.width = ''; // Возвращаем ширину кнопки по умолчанию

        // Очищаем поля ввода
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('address').value = '';
    }, 1000); // 1 секунда

    // Очищаем корзину и удаляем данные из локального хранилища
    cartItems = [];
    localStorage.removeItem('cartItems');
    renderCart();

    // Размещаем кнопку "Отправка" по центру
    // Показываем кнопку, если она скрыта
};

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
    xhr.open('POST', 'https://api.telegram.org/bot5790561769:AAFXHNyxsGSq2z7I0ds6HhSKaNisZ416m8U/sendMessage', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ chat_id: '-1002094926558', text: message }));
};

// Функция для вычисления общей стоимости заказа
const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Функция для открытия корзины
const openCart = () => {
    window.location.href = 'cart.html'; // Перенаправляет пользователя на страницу корзины (cart.html)
};

// Функция для обновления счетчика товара
const updateCartCount = () => {
    // ваша функция для обновления счетчика товара
};

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});
