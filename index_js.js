

const ws = new WebSocket('ws://localhost:8080');

ws.addEventListener('open', (ev) => {
    ws.send('Hello from client!');
});

ws.addEventListener('message', (ev) => {
    console.log('Message from server:', ev.data);
});

