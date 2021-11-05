/**
 * @jest-environment jsdom
 */

import RemoveTask from '../src/removeTodo.js';
import addTask from '../src/add.js';
import { getStorage, saveStorage } from '../src/storage.js';

jest.mock('../src/storage.js');
jest.mock('../src/index.js');
const newTodoInput = document.createElement('input');
newTodoInput.type = 'text';
newTodoInput.value = 'read a book';

describe('Testing the addTask function', () => {
  test('test the function addList', () => {
    saveStorage([]);
    expect(addTask(newTodoInput)).toEqual({
      description: 'read a book',
      completed: false,
      index: 1,
    });
  });

  test('Test adding and getting items from the storage ', () => {
    const newTodoInput = document.createElement('input');
    newTodoInput.type = 'text';
    newTodoInput.value = 'watch a movie';
    saveStorage([]);
    addTask(newTodoInput);
    expect(getStorage()).toEqual([{
      description: 'watch a movie',
      completed: false,
      index: 1,
    }]);
  });
});

test('test the function RemoveTask', () => {
  saveStorage([]);
  addTask(newTodoInput);
  addTask(newTodoInput);
  RemoveTask(1);
  expect(getStorage().length).toBe(1);
  RemoveTask(0);
  expect(getStorage().length).toBe(0);
});

test('Test creating the elements "Dom" after adding new tasks', () => {
  saveStorage([]);
  addTask(newTodoInput);
  addTask(newTodoInput);
  addTask(newTodoInput);
  const items = Array.from(document.querySelectorAll('.list-item')).length;
  expect(items).toBe(3);
});
