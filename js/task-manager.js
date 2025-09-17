// task-manager.js
import { StorageManager } from "./storage-manager.js";
import { generateId } from "./helpers.js";

// The TaskManager class is a class that works only with an array of tasks
export class TaskManager {
  constructor() {
    this.storageManager = new StorageManager();
    //save the task array in local storage
    this.tasks = this.storageManager.loadTasks();
    //save the current filter status
    this.currentStatusFilter = this.storageManager.loadCurrentStatusFilter();
    // control sorting
    this.currentSort = true;
  }

  //Method for adding tasks
  addTask(text, date) {
    const newTask = {
      id: generateId(),
      text: text.trim(),
      date: date,
      checked: false,
    };
    this.tasks.push(newTask);
    this.saveTasks();
    return newTask;
  }

  //Method for deleting a task
  deleteTask(taskId) {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    }
  }

  //Method for switching execution
  toggleTask(taskId) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      task.checked = !task.checked;
      this.saveTasks();
    }
  }

  //Method for setting filter status
  setFilter(filter) {
    this.currentStatusFilter = filter;
    this.storageManager.saveCurrentStatusFilter(filter);
  }

  //Method of sorting by date
  sortDate() {
    if (this.currentSort) {
      this.currentSort = !this.currentSort;
      return this.tasks.sort(
        (task1, task2) => new Date(task1.date) - new Date(task2.date)
      );
    } else {
      this.currentSort = !this.currentSort;
      return this.tasks.sort(
        (task1, task2) => new Date(task2.date) - new Date(task1.date)
      );
    }
  }

  //Task filter method
  getFilteredTasks() {
    return this.tasks.filter((task) => {
      switch (this.currentStatusFilter) {
        case "active":
          return !task.checked;
        case "completed":
          return task.checked;
        default:
          return true;
      }
    });
  }

  // function to save the current list
  saveTasks() {
    this.storageManager.saveTasks(this.tasks);
  }
}
