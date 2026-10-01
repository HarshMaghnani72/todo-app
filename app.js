import { addTodo, toggleTodo, deleteTodo } from './todo.js';

const STORAGE_KEY = 'todo-app-todos';

// State
let todos = loadTodos();
let currentFilter = 'all';

// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const itemCount = document.getElementById('item-count');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterBtns = document.querySelectorAll('.filter-btn');

// Load todos from localStorage
function loadTodos() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load todos from localStorage', e);
    return [];
  }
}

// Save todos to localStorage
function saveTodos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (e) {
    console.error('Failed to save todos to localStorage', e);
  }
}

// Render UI
function render() {
  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true;
  });

  // Clear list
  todoList.innerHTML = '';

  if (filteredTodos.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty-message';
    li.textContent = currentFilter === 'all' 
      ? 'No todos yet. Add one above!' 
      : `No ${currentFilter} todos.`;
    todoList.appendChild(li);
  } else {
    filteredTodos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
      li.dataset.id = todo.id;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'todo-checkbox';
      checkbox.checked = todo.completed;

      const span = document.createElement('span');
      span.className = 'todo-text';
      span.textContent = todo.text;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = '×';
      deleteBtn.title = 'Delete todo';

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
  }

  // Update item count (active items left)
  const activeCount = todos.filter(t => !t.completed).length;
  itemCount.textContent = `${activeCount} item${activeCount === 1 ? '' : 's'} left`;
}

// Event Listeners
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value;
  try {
    todos = addTodo(todos, text);
    saveTodos();
    todoInput.value = '';
    render();
  } catch (err) {
    alert(err.message);
  }
});

todoList.addEventListener('click', (e) => {
  const li = e.target.closest('.todo-item');
  if (!li) return;
  const id = li.dataset.id;

  if (e.target.classList.contains('todo-checkbox')) {
    todos = toggleTodo(todos, id);
    saveTodos();
    render();
  } else if (e.target.classList.contains('delete-btn')) {
    todos = deleteTodo(todos, id);
    saveTodos();
    render();
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter(todo => !todo.completed);
  saveTodos();
  render();
});

// Initial render
render();
