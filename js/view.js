// view.js
import { remainingTime, controlDate } from "./helpers.js";

export class View {
  constructor() {
    // Cache DOM elements once upon creation
    this.addSection = document.querySelector("#addSection");
    this.filterSection = document.querySelector("#filterSection");
    this.tasksSection = document.querySelector("#tasksSection");
    this.inputText = document.querySelector("#inputText");
    this.checkbox = document.querySelector("#checkbox");
    this.inputDate = document.querySelector("#inputDate");
    this.addButton = document.querySelector("#addButton");
    this.activeBtn = document.querySelector("#activeBtn");
    this.allBtn = document.querySelector("#allBtn");
    this.completedBtn = document.querySelector("#completedBtn");
    this.sortBtn = document.querySelector("#sortBtn");
    this.ul = document.querySelector("#ul");
    this.spanMessage = document.querySelector("#spanMessage");

    this.inputText.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.addButton.click();
      }
    });
  }

  // Method for rendering tasks
  renderTasks(tasks, status) {
    this.ul.innerHTML = "";

    tasks.forEach((task) => {
      if (task.checked) {
      }
      this.ul.appendChild(this.createTaskElement(task));
    });

    this.setSpanMessage(tasks, status);
  }

  //Method for showing the number of current tasks in the list
  getCurrentTasks(tasks, status) {
    return `${tasks.length} ${status} tasks selected`;
  }

  //Method for replacing spanMessage text based on a condition
  setSpanMessage(tasks, status) {
    if (tasks.length > 0) {
      this.spanMessage.textContent = this.getCurrentTasks(tasks, status);
    } else {
      this.spanMessage.textContent = "The task list is empty.";
    }
  }

  //Method for creating a task element
  createTaskElement(task) {
    const i = document.createElement("i");
    i.classList.add("fa-solid", "fa-pen");
    const li = document.createElement("li");
    li.dataset.id = task.id;
    const spanText = document.createElement("span");
    const spanDate = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const check = document.createElement("input");
    const checkId = `check-${task.id}`;
    check.type = "checkbox";
    check.id = checkId;
    check.checked = task.checked;
    check.classList.add("check");
    check.setAttribute("aria-label", `Mark task as completed`);
    check.setAttribute("aria-checked", task.checked ? "true" : "false");
    spanText.textContent = task.text;
    spanText.classList.add("span-text");
    spanDate.classList.add("span-date");
    spanDate.textContent = remainingTime(task.date);
    deleteBtn.type = "button";
    deleteBtn.dataset.id = task.id;
    deleteBtn.classList.add("delete-btn", "fa-solid", "fa-trash-can");
    i.classList.add("edit");
    li.append(spanText, spanDate, check, i, deleteBtn);

    if (controlDate(task.date) && !task.checked) {
      li.classList.add("control-date");
    }

    return li;
  }

  //Method for clearing input fields
  clearInputs() {
    this.inputText.value = "";
    this.inputDate.value = "";
    this.checkbox.checked = false;
    this.inputDate.disabled = true;
  }

  //Method for setting the state of the date field
  setDateInputState(isEnabled) {
    this.inputDate.disabled = !isEnabled;
  }

  // Install handlers:

  //for the sort button
  bindSortDate(handler) {
    this.sortBtn.addEventListener("click", (event) => {
      handler();
    });
  }

  //for checkbox
  bindAddTask(handler) {
    this.addButton.addEventListener("click", handler);
    this.checkbox.addEventListener("change", () => {
      this.setDateInputState(this.checkbox.checked);
    });
  }

  //for the "delete-Btn" button
  bindDeleteTask(handler) {
    this.tasksSection.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-btn")) {
        const taskId = event.target.closest("li").dataset.id;
        handler(taskId);
      }
    });
  }

  //for checkbox
  bindToggleTask(handler) {
    this.tasksSection.addEventListener("click", (event) => {
      if (event.target.classList.contains("check")) {
        const taskId = event.target.closest("li").dataset.id;
        handler(taskId);
      }
    });
  }

  //to edit the task text by "dblclick"
  bindEditDblclickTask(handler) {
    this.tasksSection.addEventListener("dblclick", (event) => {
      if (event.target.classList.contains("span-text")) {
        const taskId = event.target.closest("li").dataset.id;
        handler(taskId, event.target);
      }
    });
  }

  //to edit the task text by clicking
  bindEditClickTask(handler) {
    this.tasksSection.addEventListener("click", (event) => {
      if (event.target.classList.contains("edit")) {
        const taskId = event.target.closest("li").dataset.id;

        const element = event.target.closest("li").querySelector(".span-text");

        handler(taskId, element);
      }
    });
  }
  //for reaction to filter buttons
  bindFilterTasks(handler) {
    this.filterSection.addEventListener("click", (event) => {
      if (event.target === this.activeBtn) {
        handler("active");
      } else if (event.target === this.allBtn) {
        handler("all");
      } else if (event.target === this.completedBtn) {
        handler("completed");
      }
    });
  }
}
