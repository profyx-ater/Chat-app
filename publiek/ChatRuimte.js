import { io } from 'socket.io-client';

window.addEventListener("load", handleLoad);

const socket = io('http://localhost:5000');
socket.on('connect', () => {
    alert(`Je bent verbonden met het id ${socket.id}`);
});
socket.emit('custom-event');

function handleLoad() {
    let local = localStorage.getItem('naam');
    console.log(local);
    let buttonStuur = document.getElementById("sendButton");
    buttonStuur.addEventListener("click", Message);
    let welkom = document.getElementById("message");
    if (local) {
        welkom.textContent = `${local}, welkom in de chat!`;
    } else {
        welkom.textContent = `Welkom in de chat!`;
    }

    // Luisteren naar berichten van de server
    socket.on('receive-message', message => {
        displayMessage(message);
    });
}

function Message() {
    let messageInput = document.getElementById("messageInput");
    if (messageInput.value !== "") {
        socket.emit('send-message', messageInput.value);
        displayMessage(`You: ${messageInput.value}`);
        messageInput.value = '';
    }
}

function displayMessage(message) {
    const messageList = document.getElementById('messageList');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;
    messageList.appendChild(messageElement);
}
