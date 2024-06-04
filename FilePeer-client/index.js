import Peer from './src/Peer'
import FilePeer from './src/FilePeer'

const UID = Array.from(Array(8), () => Math.floor(Math.random() * 16).toString(16)).join('');

const text_user_id = document.querySelector('.text-user-id');
const input_user_id = document.querySelector('.input-user-id');
const file_user_id = document.querySelector('.file-user-id')
const open = document.querySelector('.open');

text_user_id.innerHTML = UID;

const fp = new FilePeer({
    id: UID,
    peer: new Peer(UID)
});

open.addEventListener('click', () => {
    fp.open(input_user_id.value, file_user_id.files)
});

fp.peer.onopen = () => {
    console.log('OPEN')
}