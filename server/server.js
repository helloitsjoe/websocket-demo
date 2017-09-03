const app  = require('express')();
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const connections = [];
// let id = 0;

app.use((req, res) => {
    res.send('Hello from server');
})

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        if (data[0] !== `{`) {
            ws.error(`Error: message must be in json format.`);
        } else {
            let json = JSON.parse(data);

            for (let i = 0; i < connections.length; i++) {
                if (connections[i] === ws) {
                    json.id = i;
                }
            }
            if (json.broadcast) {
                // ws.send('Broadcasting');
                broadcast(`Message from ${json.id}: ${json.message}`);
            } else {
                ws.send(`Message received: ${json.message}`);
            }
        }
    });

    ws.on('close', () => {
        // TODO: This doesn't seem quite right. Seems like there's a problem
        // with the first connection.
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
    });

    connections.push(ws);
    broadcast(`Connections: ${connections.length}`);
    // broadcast(`Hello from client ${connections.length}!`);
});

const port = 8080;
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

function broadcast(message) {
    wss.clients.forEach((client) => {
        client.send(message);
    });
}