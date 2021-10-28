import menu from './img/menu.png';
import deletebtn from './img/delete.png';

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
  <img src='${menu}' class='edit-btn'>
  <img src='${deletebtn}' class='delete-btn'>`;
    list.appendChild(itemlist);
  }
  document.location.reload();
};

// const enterbtn = document.querySelector('.enter');
let todoarray = [];
document.querySelector('#list-text-input').focus();
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
  <img src='${menu}' class='edit-btn'>
  <img src='${deletebtn}' class='delete-btn'>`;
    list.appendChild(itemlist);
  });
  const checkboxes = document.querySelectorAll('.check-box');
  const tododescription1 = document.querySelectorAll('.todo-description');
  todoarray.forEach((item, i) => {
    if (item.completed === true) {
      checkboxes[i].checked = true;
      tododescription1[i].innerHTML = tododescription1[i].textContent.strike();
    }
  });
};
updateDisplay();
const checkboxes = document.querySelectorAll('.check-box');
const tododescription = document.querySelectorAll('.todo-description');

checkboxes.forEach((box, i) => {
  box.addEventListener('change', () => {
    todoarray = getInfoFromStorage();
    if (box.checked === true) {
      todoarray[i].completed = true;
      tododescription[i].innerHTML = tododescription[i].textContent.strike();
    } else {
      todoarray[i].completed = false;
      tododescription[i].innerHTML = tododescription[i].textContent;
    }
    localStorage.setItem('array', JSON.stringify(todoarray));
  });
});

const deletebtns = document.querySelectorAll('.delete-btn');
const editbtns = document.querySelectorAll('.edit-btn');

editbtns.forEach((item, i) => {
  item.addEventListener('click', () => {
    // tododescription[i].parentElement.style.backgroundColor = 'lightpink';
    const val = tododescription[i].innerHTML;
    const input = document.createElement('input');
    // input.style.backgroundColor = 'lightpink';
    input.value = val;

    input.className = 'input-edit';
    input.ondblclick = function change() {
      deletebtns[i].classList.remove('show');
      editbtns[i].classList.remove('hide');
      const val = this.value;
      this.parentNode.innerHTML = val;
      todoarray[i].description = val;
      localStorage.setItem('array', JSON.stringify(todoarray));
    };
    tododescription[i].innerHTML = '';
    tododescription[i].appendChild(input);
    input.focus();
    editbtns[i].classList.toggle('hide');
    deletebtns[i].classList.toggle('show');
  });
});

const removeTodo = () => {
  deletebtns.forEach((item, i) => {
    item.addEventListener('click', () => {
      item.parentElement.parentElement.removeChild(item.parentElement);
      todoarray.splice(i, 1);
      todoarray.forEach((el, j) => {
        el.index = j + 1;
      });
      localStorage.setItem('array', JSON.stringify(todoarray));
    });
  });
};
removeTodo();

const clearall = document.querySelector('.clear-all');
clearall.addEventListener('click', () => {
  function checkcompleted(element) {
    return element.completed === false;
  }
  const newtodoarray = todoarray.filter(checkcompleted);

  newtodoarray.forEach((el, j) => {
    el.index = j + 1;
  });
  localStorage.setItem('array', JSON.stringify(newtodoarray));
  document.location.reload();
});
