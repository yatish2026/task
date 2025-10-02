import './style.css';
import './interactive.js';

// import from src modules
import display from './methods.js';


const inputList = document.getElementById('inputList');
const addList = document.getElementById('addList');

inputList.addEventListener('submit', (e) => {
  e.preventDefault();
  display.addLists(addList.value);
  addList.value = '';
});

document.querySelector('#btnClear').addEventListener('click', Interactive.clearCompletedToDoLists);

window.addEventListener('load', () => {
  document.addEventListener('listUpdated', () => {
    Interactive.checkStatusEvent();
  }, false);
  Interactive.checkStatusEvent();
});

display.showLists();
Interactive();