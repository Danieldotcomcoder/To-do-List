import { saveStorage, getStorage } from './storage.js';

const RemoveTask = (taskIndex) => {
  const storedTasks = getStorage();

  const currentTasks = storedTasks.filter(
    (index) => storedTasks.indexOf(index) !== taskIndex,
  );

  for (let i = 0; i < currentTasks.length; i += 1) {
    currentTasks[i].index = currentTasks.indexOf(currentTasks[i]) + 1;
  }

  saveStorage(currentTasks);
};

export default RemoveTask;