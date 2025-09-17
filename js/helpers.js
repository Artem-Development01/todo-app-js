// helpers.js

//Function for generating a reliable ID
export function generateId() {
  return crypto.randomUUID();
}

//Function for calculating the remaining time to complete a task
export function remainingTime(newDate) {
  if (!newDate || isNaN(new Date(newDate))) return "";
  const diffMs = new Date(newDate) - new Date();
  if (diffMs <= 0) return "Overdue";
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `Left:${days}d. ${hours}h. ${minutes}m.`;
}

//Simple function to check for an empty string
export function isValidText(text) {
  if (text.trim().length > 0) {
    return true;
  } else {
    alert("The text cannot be empty");
    return false;
  }
}

//Simple function to check the remaining time
export function controlDate(newDate) {
  if (!newDate || isNaN(new Date(newDate))) return false;
  return new Date(newDate) - new Date() < 1800000;
}

//Simple function for checking identical tasks
export function isIdentical(tasks, text) {
  if (tasks.find((task) => task.text.toLowerCase() === text.toLowerCase())) {
    alert("A task with this description already exists");
    return false;
  } else {
    return true;
  }
}
