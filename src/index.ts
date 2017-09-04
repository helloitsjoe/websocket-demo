import { elem } from './Utils';
import ClientSocket from './ClientSocket';

const client = new ClientSocket('localhost', 8080);

const container = document.querySelector('.container');
const button = elem('button', container, 'Click me!');

const buttonMessage = 'Click!';
const broadcast = true;

button.addEventListener('click', client.send.bind(client, buttonMessage, broadcast));