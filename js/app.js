// app.js
import { TaskManager } from "./task-manager.js";
import { View } from "./view.js";
import { TextTaskEdition } from "./text-editor.js";
import { isValidText, isIdentical } from "./helpers.js";

// The main application class that connects the TaskManager and View
// Now it is only responsible for coordination, not implementation
class TodoApp {
  constructor() {
    this.taskManager = new TaskManager();
    this.view = new View();

    this.renderTasks();
    //start task handler delegation
    this.view.bindSortDate(() => this.handleSortTasks());
    this.view.bindAddTask(() => this.handleAddTask());
    this.view.bindDeleteTask((taskId) => this.handleDeleteTask(taskId));
    this.view.bindToggleTask((taskId) => this.handleToggleTask(taskId));
    this.view.bindEditDblclickTask((taskId, element) =>
      this.handleEditTask(taskId, element)
    );
    this.view.bindFilterTasks((filter) => this.handleFilterTasks(filter));
    this.view.bindEditClickTask((taskId, element) =>
      this.handleEditTask(taskId, element)
    );
    // Auto-update task times every minute
    this.autoUpdateInterval = setInterval(() => {
      if (this.taskManager.tasks.some((task) => task.date)) {
        this.renderTasks();
      }
    }, 60000);

    // Add interval clearing when closing the page
    window.addEventListener("beforeunload", () => {
      if (this.autoUpdateInterval) {
        clearInterval(this.autoUpdateInterval);
      }
    });
  }

  //Sorting method
  handleSortTasks() {
    const sortTasks = this.taskManager.sortDate();
    const currentStatus = this.taskManager.currentStatusFilter;
    this.view.renderTasks(sortTasks, currentStatus);
  }

  //Method for rendering of filtered tasks by status
  renderTasks() {
    const filteredTasks = this.taskManager.getFilteredTasks();
    const currentStatus = this.taskManager.currentStatusFilter;
    this.view.renderTasks(filteredTasks, currentStatus);
  }

  //Method method for adding tasks
  handleAddTask() {
    const text = this.view.inputText.value.trim();
    if (!isValidText(text)) return;
    if (!isIdentical(this.taskManager.tasks, text)) return;
    const date = this.view.checkbox.checked ? this.view.inputDate.value : "";
    const newTask = this.taskManager.addTask(text, date);
    if (!newTask) return;
    this.renderTasks();
    this.view.clearInputs();
  }

  //Method for handling task deletion
  handleDeleteTask(taskId) {
    this.taskManager.deleteTask(taskId);
    this.renderTasks();
  }

  //Method for handling task status switching
  handleToggleTask(taskId) {
    this.taskManager.toggleTask(taskId);
    this.renderTasks();
  }

  //Method for processing task editing
  handleEditTask(taskId, element) {
    const task = this.taskManager.tasks.find((task) => task.id === taskId);
    if (task) {
      new TextTaskEdition(task.text, task, element, () => {
        this.taskManager.saveTasks();
        this.renderTasks();
      });
    }
  }

  //Method for processing task filtering
  handleFilterTasks(filter) {
    this.taskManager.setFilter(filter);
    this.renderTasks();
  }
}

const app = new TodoApp();
