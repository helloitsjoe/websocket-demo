import { elem } from './Utils';
import ClientSocket from './ClientSocket';

type buttonMessage = {
    message:string,
    broadcast:boolean,
}

const client = new ClientSocket();

const button = elem('button', document.body, 'Click me!');
const buttonMessage = 'Click!';

button.addEventListener('click', () => {
    client.send(buttonMessage);
});