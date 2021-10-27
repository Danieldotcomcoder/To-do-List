import _ from 'lodash';
import './style.css';
import menu from './menu.png';
import reload from './reload.png';
import enter from './to-left.png';

const relaodimg = new Image();
relaodimg.src = reload;
const test = new _();
test.src = _;
const entersign = new Image();
entersign.src = enter;

document.querySelector('.top-list').appendChild(relaodimg);
document.querySelector('.list-input').appendChild(entersign);

const arraylists = [
  {
    description: 'Go to the grocery store',
    completed: false,
    index: 3,
  },
  {
    description: 'study for 2 hours',
    completed: false,
    index: 2,
  },
  {
    description: 'go to the gym',
    completed: false,
    index: 1,
  },
  {
    description: 'read a book',
    completed: false,
    index: 4,
  },
];

arraylists.sort((a, b) => (a.index - b.index)); // Sort the arraylist by index number.

arraylists.forEach((item, i) => { // Display elements on screen by index number from small to big.
  const threedots = new Image();
  threedots.src = menu;
  const list = document.querySelector('.list-elements');
  const itemlist = document.createElement('li');
  itemlist.innerHTML = `<input type='checkbox' class='check-box'>
  <h3>${arraylists[i].description}<h3>`;
  itemlist.appendChild(threedots);
  list.appendChild(itemlist);
});
export default arraylists;