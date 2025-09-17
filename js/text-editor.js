import { isValidText } from "./helpers.js";
// text-editor.js
//Class for editing task text

export class TextTaskEdition {
  constructor(originalText, task, spanElement, saveCallback) {
    this.originalText = originalText;
    this.task = task;
    this.spanElement = spanElement;
    this.saveCallback = saveCallback;
    this.isProcessed = false;
    this.input = document.createElement("input");
    this.input.classList.add("span-text");
    this.input.value = this.originalText;
    this.spanElement.replaceWith(this.input);
    this.input.focus();
    this.input.select();
    this.setupEventListeners();
  }

  //Method for checking conditions
  setupEventListeners() {
    // Use arrow functions to save context

    this.handleKeyDown = (e) => {
      if (e.key === "Enter") {
        this.saveChanges();
      } else if (e.key === "Escape") {
        this.cancelChanges();
      }
    };

    this.handleBlur = () => {
      if (!this.isProcessed) {
        this.cancelChanges();
      }
    };

    //we hang the handler
    this.input.addEventListener("keydown", this.handleKeyDown);
    this.input.addEventListener("blur", this.handleBlur);
  }

  //Method for saving new text
  saveChanges() {
    this.isProcessed = true;
    const newText = this.input.value.trim();
    if (!isValidText(newText)) {
      alert("Task text cannot be empty");
      this.cancelChanges();
      return;
    }
    this.task.text = newText;
    this.finishEditing(newText);
    this.saveCallback();
  }

  //Method for undoing changes
  cancelChanges() {
    this.isProcessed = true;
    this.finishEditing(this.originalText);
  }

  //Method for returning the task text field
  finishEditing(text) {
    const newSpan = document.createElement("span");
    newSpan.classList.add("span-text");
    newSpan.textContent = text;
    this.input.replaceWith(newSpan);
    this.cleanup();
  }

  //Method for deleting a handler
  cleanup() {
    this.input.removeEventListener("keydown", this.handleKeyDown);
    this.input.removeEventListener("blur", this.handleBlur);
  }
}
