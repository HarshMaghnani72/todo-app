import test from 'node:test';
import assert from 'node:assert';
import { addTodo, toggleTodo, deleteTodo, getCompletedCount } from './todo.js';

test('addTodo should add a new todo to the list', () => {
  const initialTodos = [];
  const updatedTodos = addTodo(initialTodos, 'Learn Node.js testing');
  
  assert.strictEqual(updatedTodos.length, 1);
  assert.strictEqual(updatedTodos[0].text, 'Learn Node.js testing');
  assert.strictEqual(updatedTodos[0].completed, false);
  assert.ok(updatedTodos[0].id);
});

test('addTodo should throw an error for empty or invalid text', () => {
  const todos = [];
  assert.throws(() => addTodo(todos, ''), /cannot be empty/);
  assert.throws(() => addTodo(todos, '   '), /cannot be empty/);
  assert.throws(() => addTodo(todos, null), /cannot be empty/);
});

test('toggleTodo should toggle completed status of the specified todo', () => {
  const todos = [
    { id: '1', text: 'Task 1', completed: false },
    { id: '2', text: 'Task 2', completed: false }
  ];

  const toggled = toggleTodo(todos, '1');
  assert.strictEqual(toggled[0].completed, true);
  assert.strictEqual(toggled[1].completed, false);

  const toggledAgain = toggleTodo(toggled, '1');
  assert.strictEqual(toggledAgain[0].completed, false);
});

test('deleteTodo should remove the specified todo by id', () => {
  const todos = [
    { id: '1', text: 'Task 1', completed: false },
    { id: '2', text: 'Task 2', completed: false }
  ];

  const remaining = deleteTodo(todos, '1');
  assert.strictEqual(remaining.length, 1);
  assert.strictEqual(remaining[0].id, '2');
});

test('getCompletedCount should return the correct number of completed todos', () => {
  const todos = [
    { id: '1', text: 'Task 1', completed: true },
    { id: '2', text: 'Task 2', completed: false },
    { id: '3', text: 'Task 3', completed: true }
  ];

  assert.strictEqual(getCompletedCount(todos), 2);
  assert.strictEqual(getCompletedCount([]), 0);
  assert.strictEqual(getCompletedCount(null), 0);
});
