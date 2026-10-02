# Todo App

A simple, lightweight Todo application built with plain HTML, CSS, and modern JavaScript (ES Modules) with no build step. Todos are persisted in the browser using `localStorage`.

## Features

- Add new todos
- Mark todos as complete / incomplete (toggle)
- Delete todos
- Filter todos (All, Active, Completed)
- Clear completed todos
- Persist state across browser sessions via `localStorage`
- Automated unit tests for core logic

## How to Run the App

1. Clone or download the repository.
2. Open `index.html` directly in your web browser (no server or build step required).

## How to Run Tests

Ensure you have Node.js installed, then run:

```bash
npm test
```

This runs the automated test suite using Node.js built-in test runner (`node --test`).
