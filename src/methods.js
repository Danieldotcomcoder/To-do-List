import arraylists from './index.js';

const storeArray = () => {
  localStorage.setItem('array', JSON.stringify(arraylists));
};

const checkboxes = document.querySelectorAll('.check-box');
checkboxes.forEach((box, i) => {
  box.addEventListener('change', () => {
    if (box.checked) {
      arraylists[i].completed = true;
    } else {
      arraylists[i].completed = false;
    }
    storeArray();
  });
});

const getInfoFromStorage = () => JSON.parse(localStorage.getItem('array'));

const updateDisplay = () => {
  const temparray = getInfoFromStorage();
  temparray.forEach((item, i) => {
    if (item.completed === true) {
      checkboxes[i].checked = true;
    } else checkboxes[i].checked = false;
  });
};
updateDisplay();