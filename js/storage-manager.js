// storage-manager.js
export class StorageManager {
  saveTasks(tasks) {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks: ", error);
      alert(`Sorry, the data could not be saved. Error: ${error}`);
    }
  }

  loadTasks() {
    try {
      const tasks = localStorage.getItem("tasks");
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error("Error loading task array: ", error);
      return [];
    }
  }

  saveCurrentStatusFilter(currentStatusFilter) {
    try {
      localStorage.setItem("currentStatusFilter", currentStatusFilter);
    } catch (error) {
      console.error("Error writing current filter status: ", error);
    }
  }

  loadCurrentStatusFilter() {
    try {
      return localStorage.getItem("currentStatusFilter") || "all";
    } catch (error) {
      console.error("Error loading current filter status:", error);
      return "all";
    }
  }
}
