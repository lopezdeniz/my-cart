let cartItems = [];

// Функция для обновления количества товаров в корзине и отображения на иконке
const updateCartIconCount = () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartCountElement = cartIcon.querySelector('#cart-count');
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = cartItemCount;
    cartCountElement.style.display = cartItemCount > 0 ? 'inline-block' : 'none';
};

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

        // Создаем элемент для названия товара
        const itemNameElement = document.createElement('span');
        itemNameElement.textContent = `${name} - ${price} руб. x ${quantity}`;
        itemNameElement.classList.add('cart-item-name'); // Добавляем класс для стилизации
        itemElement.appendChild(itemNameElement);

        // Создаем кнопки для управления количеством товара
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.onclick = () => removeFromCart(index);
        removeButton.style.backgroundColor = 'black'; // Устанавливаем цвет фона кнопки черным
        removeButton.style.color = 'white'; // Устанавливаем цвет текста кнопки белым
        itemElement.appendChild(removeButton);

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.onclick = () => decreaseQuantity(index);
        decreaseButton.style.backgroundColor = 'black'; // Устанавливаем цвет фона кнопки черным
        decreaseButton.style.color = 'white'; // Устанавливаем цвет текста кнопки белым
        itemElement.appendChild(decreaseButton);

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.onclick = () => increaseQuantity(index);
        increaseButton.style.backgroundColor = 'black'; // Устанавливаем цвет фона кнопки черным
        increaseButton.style.color = 'white'; // Устанавливаем цвет текста кнопки белым
        itemElement.appendChild(increaseButton);

        itemElement.style.marginRight = '10px';
        cartElement.appendChild(itemElement);
        totalPrice += itemTotal;

    });

    totalPriceElement.textContent = `Общая стоимость: ${totalPrice} руб.`;

    // Проверяем, существует ли уже элемент с текстом "Стоимость доставки вам сообщит Диспетчер"
    if (!document.querySelector('.deliveryMessage')) {
        // Если не существует, добавляем его
        totalPriceElement.insertAdjacentHTML('afterend', '<p class="deliveryMessage">Стоимость доставки вам сообщит Диспетчер</p>');
    }

    totalPriceElement.classList.add('total-price-text'); // Добавляем класс для стилизации общей стоимости
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


//11111111111111111111





const addToCart = (name, price, button) => {
    const card = button.closest('.product');
    const quantity = parseInt(card.querySelector('.quantity').textContent);
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({ name, price, quantity });
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





// Функция для уменьшения количества товара на карточке
const decreaseQuantityCard = (button) => {
    const card = button.closest('.product');
    const quantityElement = card.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
    }
    // Назначаем черный цвет фона кнопке
    button.style.backgroundColor = 'black';
};

// Функция для увеличения количества товара на карточке
const increaseQuantityCard = (button) => {
    const card = button.closest('.product');
    const quantityElement = card.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;
    // Назначаем черный цвет фона кнопке
    button.style.backgroundColor = 'black';
};













// Функция для перехода на главную страницу
const goToMainPage = () => {
    // Проверяем, находимся ли мы уже на главной странице
    if (window.location.href !== 'index.html') {
        // Если нет, перенаправляем пользователя на главную страницу
        window.location.href = 'index.html';
    }
};



const checkout = () => {
    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.textContent = 'ОТПРАВКА';
    checkoutButton.style.backgroundColor = 'red';
    checkoutButton.style.width = '150px';
    checkoutButton.style.margin = '0 auto';
    checkoutButton.style.display = 'block';
    checkoutButton.style.fontSize = "20px";
    checkoutButton.style.fontWeight = "bold";

    // Отправляем заказ в телеграм
    sendOrderToTelegram();

    setTimeout(() => {
        checkoutButton.textContent = 'Готово! Сейчас мы вам перезвоним для сверки заказа.';
        checkoutButton.style.backgroundColor = '';
        checkoutButton.style.width = '';

        // Очищаем поля ввода
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('address').value = '';
    }, 1000);

    // Очищаем корзину и удаляем данные из локального хранилища
    cartItems = [];
    localStorage.removeItem('cartItems');
    renderCart();

    // Показываем кнопку "Вернуться к покупкам" и назначаем ей обработчик события для перехода на главную страницу
    const backButton = document.getElementById('back-to-shopping');
    backButton.style.display = 'block';
    backButton.addEventListener('click', goToMainPage);

    
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




///Проверка модального окна 


document.addEventListener('DOMContentLoaded', () => {

    // Кнопка по которой происходит клик
    let callBackButton = document.getElementById('callback-button');

    // Модальное окно, которое необходимо открыть
    let modal1 = document.getElementById('modal-1');

    // Кнопка "закрыть" внутри модального окна
    let closeButton = modal1.getElementsByClassName('modal__close-button')[0];

    // Тег body для запрета прокрутки
    let tagBody = document.getElementsByTagName('body');

    callBackButton.onclick = function (e) {
        e.preventDefault();
        modal1.classList.add('modal_active');
        tagBody.classList.add('hidden');
    }

    closeButton.onclick = function (e) {
        e.preventDefault();
        modal1.classList.remove('modal_active');
        tagBody.classList.remove('hidden');
    }

    modal1.onmousedown = function (e) {
        let target = e.target;
        let modalContent = modal1.getElementsByClassName('modal__content')[0];
        if (e.target.closest('.' + modalContent.className) === null) {
            this.classList.remove('modal_active');
            tagBody.classList.remove('hidden');
        }
    };

    // Вызов модального окна несколькими кнопками на странице
    let buttonOpenModal1 = document.getElementsByClassName('get-modal_1');

    for (let button of buttonOpenModal1) {
        button.onclick = function (e) {
            e.preventDefault();
            modal1.classList.add('modal_active');
            tagBody.classList.add('hidden');
        }
    }

});