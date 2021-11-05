/* eslint-disable import/no-cycle */
import { saveStorage, getStorage } from './storage.js';

const removeCompleted = () => {
  const storedTasks = getStorage();

  const uncompletedTask = storedTasks.filter(
    (task) => task.completed === false,
  );
  saveStorage(uncompletedTask);
};

export default removeCompleted;