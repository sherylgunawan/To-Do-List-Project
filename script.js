const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const filterBtn = document.getElementById("filterBtn");
const todoList = document.getElementById("todoList");

let todos = [];

function renderTodos(list = todos) {
  todoList.innerHTML = "";

  if (list.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" style="text-align:center;">No task found</td></tr>`;
    return;
  }

  list.forEach((todo, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.completed ? "Completed" : "Pending"}</td>
      <td>
        <button class="completeBtn" onclick="toggleComplete(${index})">✓</button>
        <button class="deleteBtn" onclick="deleteTask(${index})">✕</button>
      </td>
    `;
    todoList.appendChild(row);
  });
}

function addTask() {
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (!task || !date) {
    alert("Please fill in both task and date!");
    return;
  }

  todos.push({ task, date, completed: false });
  taskInput.value = "";
  dateInput.value = "";
  renderTodos();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function deleteTask(index) {
  todos.splice(index, 1);
  renderTodos();
}

function deleteAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    todos = [];
    renderTodos();
  }
}

function filterTasks() {
  const filtered = todos.filter(todo => !todo.completed);
  renderTodos(filtered);
}

addBtn.addEventListener("click", addTask);
deleteAllBtn.addEventListener("click", deleteAll);
filterBtn.addEventListener("click", filterTasks);

renderTodos();
