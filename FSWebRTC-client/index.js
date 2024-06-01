import Peer from './src/peer'
import FSPeer from './src/fspeer'

function getHash(length) {
    return Array.from(Array(length), () => Math.floor(Math.random() * 16).toString(16)).join('');
}

const UID = getHash(8);

const fspeer = new FSPeer({
    peer: new Peer(UID)
});

const hash = document.querySelector('.hash');
const inputHash = document.querySelector('.input-hash');
const fileInp = document.querySelector('.file-inp')
const openBtn = document.querySelector('.open');

hash.innerHTML = UID;

openBtn.addEventListener('click', () => {
    fspeer.open(inputHash.value, fileInp.files)
});

fspeer.peer.onopen = () => {
    console.log('OPEN')
}