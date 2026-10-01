/**
 * Core todo logic module
 */

export function addTodo(todos, text) {
  if (!text || typeof text !== 'string' || !text.trim()) {
    throw new Error('Todo text cannot be empty');
  }
  const newTodo = {
    id: Date.now().toString() + '-' + Math.random().toString(36).substring(2, 9),
    text: text.trim(),
    completed: false
  };
  return [...todos, newTodo];
}

export function toggleTodo(todos, id) {
  return todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
}

export function deleteTodo(todos, id) {
  return todos.filter(todo => todo.id !== id);
}
