# Smart Todo List 🚀

A clean, accessible, and responsive Todo List application built with vanilla JavaScript. This project was developed as a learning exercise to master modern frontend development techniques.

## ✨ Features

- **Add Tasks**: Create new tasks with optional due dates and times
- **Edit Tasks**: Double-click on tasks or use the edit icon to modify text
- **Delete Tasks**: Remove completed or unnecessary tasks
- **Filter Tasks**: View All, Active, or Completed tasks with quick filters
- **Sort Tasks**: Organize tasks by their due date with a single click
- **Local Storage**: Your tasks persist in browser storage between sessions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: Built with ARIA attributes and keyboard navigation support
- **Urgent Task Highlighting**: Visual indicators for tasks due within 30 minutes

## 🚀 Live Demo

Experience the application live:  
[View Live Demo](https://Artem-Development01.github.io/todo-app-js/)

## 🛠️ Installation & Local Development

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Artem-Development01/todo-app-js.git
    ```

2.  **Navigate to the project directory**:
    ```bash
    cd todo-app-js
    ```

3.  **Open in your browser**:
    - Simply open the `index.html` file in any modern browser
    - Or use a local server for enhanced features:
      ```bash
      # Using Python (if installed)
      python -m http.server 8000
      # Then visit http://localhost:8000
      ```

## 📁 Project Structure
todo-app-js/
├── index.html # Main HTML document
├── style.css # Styles and responsive design
├── js/ # JavaScript modules
│ ├── app.js # Main application orchestrator
│ ├── task-manager.js # Business logic and data management
│ ├── view.js # DOM manipulation and user interface
│ ├── storage-manager.js # Local storage handling
│ ├── text-editor.js # In-place text editing functionality
│ └── helpers.js # Utility functions and helpers
├── README.md # Project documentation
└── .gitignore # Git ignore rules

text

## 🧠 Development Notes

This project was built using a modular JavaScript architecture that separates concerns:
- **Data Layer** (`task-manager.js`, `storage-manager.js`) handles task data and persistence
- **View Layer** (`view.js`, `text-editor.js`) manages UI updates and interactions
- **Application Layer** (`app.js`) coordinates between data and view layers
- **Utilities** (`helpers.js`) provides reusable helper functions

## 🎯 Learning Outcomes

Through building this application, I practiced and implemented:
- ES6+ JavaScript features and module system
- LocalStorage API for data persistence
- CSS Grid and Flexbox for responsive layouts
- Accessibility best practices (ARIA labels, keyboard navigation)
- Clean code architecture and separation of concerns
- Git version control and GitHub repository management
- Problem-solving and debugging techniques

## 🙏 Acknowledgments

This project was developed with valuable guidance and code review from programming mentors. Special thanks for assistance with:

- Architectural decisions and module separation
- Implementation of accessibility features
- Code optimization and best practices
- Debugging and problem-solving strategies
- Git workflow and repository setup

The mentorship received during this 7-day development process significantly enhanced the learning experience and final code quality.

---

**Smart Todo List** • Created by Artem • 2025
