const socket = io();

//const inputAdd = document.getElementById('inputAdd');
//const btnAdd = document.getElementById('btnAdd');
const inputSendMessage = document.getElementById('inputSendMessage');
const btnSendMessage = document.getElementById('btnSendMessage');

//const inputDelete = document.getElementById('inputDelete');
//const btnDelete = document.getElementById('btnDelete');

// btnAdd.addEventListener('click', () => {
//     socket.emit('addProduct', inputAdd.value);
// });
btnAdd.addEventListener('click', () => {
    socket.emit('sendMessage', inputAdd.value);
});

//btnDelete.addEventListener('click', () => {
//    socket.emit('deleteProduct', inputDelete.value);
//});

//socket.on('viewProducts', data => {
//    document.querySelector('p').innerText = data;
//});
socket.on('viewMessages', data => {
    document.querySelector('p').innerText = data;
});