const app  = require('express')();
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = [];

app.use((req, res) => {
    res.send('Hello from server');
})

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        if (data[0] !== `{`) {
            ws.send(`Message received: ${data}`);
        } else {
            let json = JSON.parse(data);
            if (json.broadcast) {
                ws.send('Broadcasting');
                broadcast(json.message);
            } else {
                ws.send(`Message received: ${json.message}`);
            }
        }
    });

    clients.push(ws);
    broadcast(`Hello from client ${clients.length}!`);
});

const port = 8080;
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

function broadcast(message, origClient) {
    clients.forEach((client) => {
        client.send(message);
    });
}