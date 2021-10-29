import _ from 'lodash';
import './style.css';
import reload from './reload.png';

const relaodimg = new Image();
relaodimg.src = reload;
const test = new _();
test.src = _;

document.querySelector('.top-list').appendChild(relaodimg);