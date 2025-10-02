import {
  addTask,
  removeTask,
  updateTask,
  toggleComplete,
  setEditing,
  clearCompleted,
  getTasks,
} from './methods.js';

const toDoListContainer = document.querySelector('.toDoListContainer');
const inputForm = document.getElementById('inputList');
const inputField = document.getElementById('addList');
const btnClear = document.getElementById('btnClear');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';

function renderTasks() {
  const tasks = getTasks(currentFilter).filter(
    (task) => task && typeof task.description === 'string' && task.description.trim().length > 0
  );
  toDoListContainer.innerHTML = '';
  tasks.forEach((task) => {
    const item = document.createElement('div');
    item.className = `task-item${task.completed ? ' completed' : ''}`;
    item.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
      <input type="text" class="task-desc${task.editing ? ' editing' : ''}" value="${task.description.replace(/"/g, '&quot;')}" data-id="${task.id}" ${task.editing ? '' : 'readonly'}>
      <div class="task-actions">
        <button class="action-btn edit-btn" data-id="${task.id}" title="Edit"><i class="fa fa-pen"></i></button>
        <button class="action-btn delete-btn" data-id="${task.id}" title="Delete"><i class="fa fa-trash"></i></button>
      </div>
    `;
    toDoListContainer.appendChild(item);
  });
}

inputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const desc = inputField.value.trim();
  if (desc.length > 0) { // Only add if not empty
    addTask(desc);
    inputField.value = '';
    renderTasks();
  }
});

toDoListContainer.addEventListener('click', (e) => {
  const id = Number(e.target.closest('[data-id]')?.dataset.id);
  if (e.target.closest('.delete-btn')) {
    removeTask(id);
    renderTasks();
  }
  if (e.target.closest('.edit-btn')) {
    setEditing(id, true);
    renderTasks();
    const input = document.querySelector(`.task-desc[data-id="${id}"]`);
    if (input) input.focus();
  }
});

toDoListContainer.addEventListener('change', (e) => {
  if (e.target.classList.contains('task-checkbox')) {
    const id = Number(e.target.dataset.id);
    toggleComplete(id);
    renderTasks();
  }
});

toDoListContainer.addEventListener('keydown', (e) => {
  if (e.target.classList.contains('task-desc') && !e.target.readOnly) {
    if (e.key === 'Enter') {
      const id = Number(e.target.dataset.id);
      updateTask(id, e.target.value.trim());
      setEditing(id, false);
      renderTasks();
    }
    if (e.key === 'Escape') {
      setEditing(Number(e.target.dataset.id), false);
      renderTasks();
    }
  }
});

toDoListContainer.addEventListener('blur', (e) => {
  if (e.target.classList.contains('task-desc') && !e.target.readOnly) {
    const id = Number(e.target.dataset.id);
    updateTask(id, e.target.value.trim());
    setEditing(id, false);
    renderTasks();
  }
}, true);

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

btnClear.addEventListener('click', () => {
  clearCompleted();
  renderTasks();
});

// Initial render
renderTasks();