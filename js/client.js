var socket = io('https://neerajsocket.herokuapp.com/', {transports: ['websocket', 'polling', 'flashsocket']});

const messageContainer = document.getElementById('messageBox');
const Myform = document.getElementById('form');
const message = document.getElementById('message');

const append = (message, position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)

}

const name = prompt("Enter your name");

socket.emit('new-user-joined' , name);

socket.on('user-joined' , name =>{
    append(name  + ' Has joined the chat', 'left');
});

Myform.addEventListener('submit' , (e)=>{
    e.preventDefault();
    append('You: ' + message.value , 'right')
    socket.emit('send' , message.value)
    message.value = ""
    var objDiv = document.getElementById("messageBox");
    objDiv.scrollTop = objDiv.scrollHeight;
});

socket.on('recieve' , data => {
    append(data.user + ': ' + data.message , 'left')
    var objDiv = document.getElementById("messageBox");
    objDiv.scrollTop = objDiv.scrollHeight;
});

socket.on('left' , username =>{
    append(username + ' have left the chat' , 'left')
    var objDiv = document.getElementById("messageBox");
    objDiv.scrollTop = objDiv.scrollHeight;
});