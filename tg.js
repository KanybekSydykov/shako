// Replace with your bot token and channel ID
const botToken = '8154638263:AAHGa3Qj8dEsNO9eZf-wnvT5LfVw0Ij0Gv4';
const chatId = '-1002450165933'; // For public channels, use @channelusername, or use channel's numeric ID for private channels

const user = document.querySelector('#name');
const phone = document.querySelector('#phone');
const comment = document.querySelector('#message')

const sendButton = document.querySelector('#form-btn')

sendButton.addEventListener('click', sendMessage);

// Message you want to send


function sendMessage() {

    const message = `Имя: ${user.value}\nНомер: ${phone.value}\nСообщение: ${comment.value}`;

    if(!user.value || !phone.value ) {
        alert('Заполните все поля')
        return
    }

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log("Message sent successfully", data);
                user.value = ''
                phone.value = ''
                comment.value = ''
                alert('Спасибо за заявку!')
            } else {
                console.error("Error sending message:", data);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });

}

