const btn = document.querySelector(".add-button");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

const saveToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
const loadFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

const addListItem = (text) => {
  const li = document.createElement("li");
  li.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";

  deleteBtn.addEventListener("click", () => {
    li.remove();
    const todos = loadFromLocalStorage().filter((todo) => todo !== text);
    saveToLocalStorage(todos);
  });

  li.appendChild(deleteBtn);
  todoList.appendChild(li);
};

const handleAdd = () => {
  const value = input.value.trim();
  if (!value) return;

  addListItem(value);

  const todos = loadFromLocalStorage();
  todos.push(value);
  saveToLocalStorage(todos);

  input.value = "";
};

btn.addEventListener("click", handleAdd);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleAdd();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const todos = loadFromLocalStorage();
  todos.forEach(addListItem);
});
