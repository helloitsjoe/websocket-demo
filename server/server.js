const app = require('express')();
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const connections = [];

// app.use((req, res) => {
//     res.send('Hello from server');
// });

const port = 8080;
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

wss.on('connection', (ws) => {
    ws.on('message', onMessage.bind(null, ws));
    ws.on('close', onClose.bind(null, ws));

    connections.push(ws);
    broadcast(`Connections: ${connections.length}`);
});

function onMessage(ws, data) {
    if (data[0] !== `{`) {
        ws.send(`Error: message must be in json format.`);
        ws.send(data);
    } else {
        let json = JSON.parse(data);

        for (let i = 0; i < connections.length; i++) {
            if (connections[i] === ws) {
                json.id = i + 1;
            }
        }
        if (json.broadcast) {
            broadcast(`Message from ${json.id}: ${json.message}`);
        } else {
            ws.send(`Message received: ${json.message}`);
        }
    }
}

function onClose(ws) {
    let i;
    for (i = 0; i < connections.length; i++) {
        // console.log(connections[i])
        if (connections[i] === ws) {
            broadcast(`Connection to client ${i} closed`);
            broadcast(`Connections: ${connections.length}`);
            break;
        }
        // client.removeAllListeners();
        // TODO: close client
    }
    connections.splice(i, 1);
}

function broadcast(message) {
    wss.clients.forEach((client) => {
        client.send(message);
    });
}