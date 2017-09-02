import { elem } from './Utils';

const ws = new WebSocket('ws://localhost:8080');

ws.addEventListener('open', (ev) => {
    ws.send('Hello from client!');
});

ws.addEventListener('message', (ev) => {
    console.log('From server:', ev.data);
});

const button = elem('button', document.body, 'Click me!');
button.addEventListener('click', (ev) => {
    const message = {
        message: 'Clicked!',
        broadcast: true,
    };
    ws.send(JSON.stringify(message));
});


// import App from './app';
//
// const app = new App();
//
// app.init();
