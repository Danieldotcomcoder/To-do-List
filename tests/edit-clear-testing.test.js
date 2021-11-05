/**
 * @jest-environment jsdom
 */
import editTask from '../src/editTodo.js';
import addTodo from '../src/add.js';
import removeCompleted from '../src/status.js';
import check from '../src/check.js';
import { getStorage, saveStorage } from '../src/storage.js';

jest.mock('../src/storage.js');
jest.mock('../src/index.js');
jest.mock('../src/check.js');

const inputList = document.createElement('input');
inputList.type = 'text';
inputList.value = 'Go to the restaurant';

test('test the function editTask', () => {
  saveStorage([]);
  addTodo(inputList);
  const tasks = getStorage();
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.textContent = 'Go to the GYM';
  expect(editTask(editInput, tasks, tasks[0])).toEqual({
    description: 'Go to the GYM',
    completed: false,
    index: 1,
  });
});

test('test the function Clear all Completed', () => {
  saveStorage([]);
  addTodo(inputList);
  addTodo(inputList);
  addTodo(inputList);
  getStorage().forEach((task) => {
    task.completed = true;
  });
  addTodo(inputList);
  removeCompleted();
  expect(getStorage().length).toBe(1);
});

describe('test the function check', () => {
  const checkbox = document.createElement('input');
  checkbox.type = checkbox;
  checkbox.checked = false;
  saveStorage([]);
  addTodo(inputList);
  addTodo(inputList);
  addTodo(inputList);
  getStorage().forEach((task) => {
    task.completed = true;
  });
  test("test the first task if it's not checked ", () => {
    const tasks = getStorage();
    check(checkbox, tasks[0]);
    expect(tasks[0].completed).toBeFalsy();
  });
  test("test the last task if it's checked ", () => {
    addTodo(inputList);
    const tasks = getStorage();
    checkbox.checked = true;
    check(checkbox, tasks[tasks.length - 1]);
    expect(tasks[tasks.length - 1].completed).toBeTruthy();
  });
});