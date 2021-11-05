/* eslint-disable import/no-cycle */

import './style.css';
import check from './check.js';
import addTask from './add.js';
import trashCompleted from './status.js';
import RemoveTask from './removeTodo.js';
import editTask from './editTodo.js';
import { saveStorage, getStorage } from './storage.js';

const listContainer = document.querySelector('.container');
const addTaskInput = document.querySelector('#text');
const addTaskBtn = document.querySelector('.add');
const clearCompletedTask = document.querySelector('.clear');

const showTasks = () => {
  while (listContainer.lastChild) {
    listContainer.removeChild(listContainer.lastChild);
  }

  const tasks = getStorage();

  if (tasks != null) {
    for (let i = 0; i < tasks.length; i += 1) {
      const list = document.createElement('li');
      list.classList.add('list');
      list.id = tasks[i].index;
      list.draggable = true;

      const listFChild = document.createElement('div');
      listFChild.classList.add('div1');

      const input = document.createElement('input');
      input.classList.add('check');
      input.type = 'checkbox';
      input.name = 'check1';

      if (tasks[i].completed) {
        input.checked = true;
      }

      const label = document.createElement('label');
      label.contentEditable = true;
      label.classList.add('label');
      label.innerHTML = tasks[i].description;
      label.style.textDecoration = tasks[i].completed === true ? 'line-through' : 'none';
      label.style.color = '#444';

      const trash = document.createElement('span');
      trash.innerHTML = "<i class='fas fa-trash-alt'></i>";
      trash.style.display = 'flex';
      trash.style.cursor = 'pointer';
      trash.id = tasks.indexOf(tasks[i]);

      list.appendChild(listFChild);
      listFChild.appendChild(input);
      listFChild.appendChild(label);
      listFChild.appendChild(trash);
      listContainer.appendChild(list);

      label.addEventListener('focus', () => {
        trash.style.display = 'none';
        trash.style.color = '#fff';
        trash.style.cursor = 'pointer';
        label.style.textDecoration = 'none';
        list.style.backgroundColor = 'blue';
        list.style.opacity = '0.6';
        label.style.color = '#fff';
        label.style.outline = 'none';
      });

      label.addEventListener('blur', (e) => {
        editTask(e.target, tasks, tasks[i]);
      });

      input.addEventListener('change', (e) => {
        check(e.target, tasks[i]);
        saveStorage(tasks);
      });

      trash.addEventListener('mousedown', (e) => {
        e.preventDefault();
        RemoveTask(parseInt(trash.id, 10));
        showTasks();
      });
    }
  }
};

addTaskBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addTask(addTaskInput);
});

clearCompletedTask.addEventListener('click', (e) => {
  e.preventDefault();
  trashCompleted();
});

export default showTasks;

window.onload = showTasks;