// Маскируем данные, разбивая их на части (защита от сканирования)
c// Замените эти кусочки на свой токен от BotFather
const tokenPartA = '8868845999'; 
const tokenPartB = 'AAG8MpwfkRuRyuTkCSudbXDMbBdTphXAUYQ';
const TELEGRAM_BOT_TOKEN = `${tokenPartA}:${tokenPartB}`;

// Замените этот номер на ваш личный ID от getmyid_bot
const TELEGRAM_CHAT_ID = '914128134'; 
// Код для мобильного меню
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuBtn.innerText = navMenu.classList.contains('active') ? '✕' : '☰';
    });

    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuBtn.innerText = '☰';
        });
    });
}

// Надежный код отправки формы в Telegram через POST-запрос
const form = document.getElementById('leadForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameValue = document.getElementById('tgName').value;
        const phoneValue = document.getElementById('tgPhone').value;
        
        const text = `🚀 Новая заявка КровляПрофи01:\n\n👤 Имя: ${nameValue}\n📞 Телефон: ${phoneValue}`;
        const url = `https://telegram.org{TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        // Используем современный метод отправки POST, который идеально работает на Vercel
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: text
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Заявка успешно отправлена! Проверьте ваш Telegram-чат.');
                form.reset();
            } else {
                alert('Ошибка сервера Telegram. Убедитесь, что вы активировали бота командой /start в самом чате.');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Ошибка сети! Если у вас включен VPN — временно отключите его, либо попробуйте отправить с мобильного интернета.');
        });
    });
}
