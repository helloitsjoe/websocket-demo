import { elem } from './Utils';
import ClientSocket from './ClientSocket';

const client = new ClientSocket('localhost', 8080);

const button = elem('button', document.body, 'Click me!');
const buttonMessage = 'Click!';
const broadcast = true;
button.addEventListener('click', client.send.bind(client, buttonMessage, broadcast));