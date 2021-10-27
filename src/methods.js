import arraylists from './index.js';

let temporaryarray = arraylists;

const checkboxes = document.querySelectorAll('.check-box');

const storeArray = () => {
  localStorage.setItem('array', JSON.stringify(temporaryarray));
};

const getInfoFromStorage = () => JSON.parse(localStorage.getItem('array'));
getInfoFromStorage();
temporaryarray = getInfoFromStorage();

const updateDisplay = () => {
  const temparray = getInfoFromStorage();
  temparray.forEach((item, i) => {
    if (item.completed === true) {
      checkboxes[i].checked = true;
    }
  });
};

updateDisplay();

checkboxes.forEach((box, i) => {
  box.addEventListener('change', () => {
    if (box.checked === true) {
      temporaryarray[i].completed = true;
    } else { temporaryarray[i].completed = false; }
    storeArray();
  });
});
