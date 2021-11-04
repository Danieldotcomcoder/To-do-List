const addToDo = (list, task, completed, index) => {
  const toDo = { task, completed, index };
  list.push(toDo);
  return list;
};

const removeToDo = (list, desc) => {
  list = list.filter((item) => item.task !== desc);
  return list;
};

export { addToDo, removeToDo };
