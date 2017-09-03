export default class ClientSocket {

    public ws:WebSocket;

    constructor() {
        this.ws = new WebSocket('ws://localhost:8080');
        this.init();
    }

    init() {
        this.ws.addEventListener('open', (ev) => {
            // this.ws.send('Hello from client!');
            console.log('Connected to server');
        });

        this.ws.addEventListener('message', (ev) => {
            console.log('From server:', ev.data);
        });
    }

    send(message:string, broadcast:boolean = true) {
        let json;
        if (typeof message === 'string') {
            json = { message, broadcast };
        }
        json = JSON.stringify(json);

        this.ws.send(json);
    }
}
