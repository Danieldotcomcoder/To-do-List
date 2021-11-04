import { addToDo, removeToDo } from '../purefunctions.js';

test('Test Check', () => {
  expect(true).toBe(true);
});

describe('Testing Adding and Removing tasks', () => {
  let taskstore = [];
  function Dom(tlist) {
    document.body.innerHTML = '<div><ul class= \'cont\'></ul></div>';
    const listCont = document.querySelector('.cont');
    let theList = tlist.map((item) => `<li>${item.task}</li>`);
    theList = theList.join('');
    listCont.innerHTML = theList;
    const list = document.querySelectorAll('.cont li');
    return list;
  }
  test('add task to to-do List', () => {
    addToDo(taskstore, 'lorem1', false, 0);
    addToDo(taskstore, 'lorem2', false, 1);
    addToDo(taskstore, 'lorem3', false, 2);
    addToDo(taskstore, 'Lorem4', false, 3);
    expect(Dom(taskstore)).toHaveLength(4);
  });

  test('Remove a task from to-do List', () => {
    taskstore = removeToDo(taskstore, 'lorem1');
    taskstore = removeToDo(taskstore, 'lorem2');
    taskstore = removeToDo(taskstore, 'lorem3');
    expect(Dom(taskstore)).toHaveLength(1);
  });
});