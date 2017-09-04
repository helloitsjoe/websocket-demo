export default class ClientSocket {

    private ws:WebSocket;

    constructor(host:string, port:number) {
        this.ws = new WebSocket('ws://' + host + ':' + port);

        this.ws.addEventListener('open', this.onOpen.bind(this));
        this.ws.addEventListener('message', this.onMessage.bind(this));
    }

    send(message:string, broadcast:boolean = true) {
        if (typeof message !== 'string') {
            console.error('Message must be a string');
        }
        let json = JSON.stringify({ message, broadcast });

        this.ws.send(json);
    }

    onOpen(event:any):void {
        console.log('Connected to server');
    }

    onMessage(event:any):void {
        console.log('From server:', event.data);
    }
}
