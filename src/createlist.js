import menu from './img/menu.png';

class ToDo {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

const createNewToDo = () => {
  const todo = document.querySelector('#list-text-input').value;
  if (todo === '') {
    // alert('input cant be empty');
  } else {
    const list = document.querySelector('.list-elements');
    const itemlist = document.createElement('li');
    itemlist.innerHTML = `<input type='checkbox' class='check-box'>
  <h3>${todo}</h3>
  <img src='${menu}' class='edit-btn'>`;
    list.appendChild(itemlist);
  }
  document.location.reload();
};

// const enterbtn = document.querySelector('.enter');
let todoarray = [];

document.querySelector('#list-text-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const description = document.querySelector('#list-text-input').value;
    const completed = false;
    const index = todoarray.length + 1;
    if (description === '') {
    //    alert("");
    } else {
      const todo = new ToDo(description, completed, index);
      todoarray.push(todo);
      localStorage.setItem('array', JSON.stringify(todoarray));
      createNewToDo();
    }
  }
});
const getInfoFromStorage = () => (localStorage.getItem('array') ? JSON.parse(localStorage.getItem('array')) : todoarray);
const updateDisplay = () => {
  todoarray = getInfoFromStorage();
  todoarray.forEach((item, i) => {
    const list = document.querySelector('.list-elements');
    const itemlist = document.createElement('li');
    itemlist.innerHTML = `<input type='checkbox' class='check-box'>
  <h3 class='todo-description'>${todoarray[i].description}</h3>
  <img src='${menu}' class='edit-btn'>`;
    list.appendChild(itemlist);
  });
  const checkboxes = document.querySelectorAll('.check-box');
  todoarray.forEach((item, i) => {
    if (item.completed === true) {
      checkboxes[i].checked = true;
    }
  });
};
updateDisplay();
const checkboxes = document.querySelectorAll('.check-box');

checkboxes.forEach((box, i) => {
  box.addEventListener('change', () => {
    todoarray = getInfoFromStorage();
    if (box.checked === true) {
      todoarray[i].completed = true;
    } else { todoarray[i].completed = false; }
    localStorage.setItem('array', JSON.stringify(todoarray));
  });
});

const editbtns = document.querySelectorAll('.edit-btn');
const tododescription = document.querySelectorAll('.todo-description');
editbtns.forEach((item, i) => {
  item.addEventListener('click', () => {
    tododescription[i].parentElement.style.backgroundColor = 'lightpink';
    const val = tododescription[i].innerHTML;
    const input = document.createElement('input');
    input.style.backgroundColor = 'lightpink';
    input.value = val;

    input.className = 'input-edit';
    input.onblur = function change() {
      const val = this.value;
      this.parentNode.innerHTML = val;
      todoarray[i].description = val;
      localStorage.setItem('array', JSON.stringify(todoarray));
    };
    tododescription[i].innerHTML = '';
    tododescription[i].appendChild(input);
    // input.focus();
  });
});
