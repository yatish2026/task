// data list

export default class DataList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addTask(description) {
    this.tasks.push({
      description,
      completed: false,
      editing: false,
      id: Date.now(),
    });
    this.save();
  }

  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.save();
  }

  updateTask(id, newDesc) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.description = newDesc;
      this.save();
    }
  }

  toggleComplete(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.save();
    }
  }

  setEditing(id, editing) {
    this.tasks.forEach((t) => {
      t.editing = (t.id === id) ? editing : false;
    });
    this.save();
  }

  clearCompleted() {
    this.tasks = this.tasks.filter((t) => !t.completed);
    this.save();
  }

  getTasks(filter = 'all') {
    if (filter === 'active') return this.tasks.filter((t) => !t.completed);
    if (filter === 'completed') return this.tasks.filter((t) => t.completed);
    return this.tasks;
  }
}