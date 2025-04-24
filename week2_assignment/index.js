document.addEventListener('DOMContentLoaded', () => {
  const todoListElement = document.getElementById('todo-list');
  const addBtn = document.getElementById('add-button');
  const input= document.getElementById('todo-input');
  const prioritySelect= document.getElementById('priority-select');
  const completeBtn= document.getElementById('complete-button');
  const selectAllBtn= document.getElementById('select-all-button');
  const modal= document.getElementById('modal');
  const modalConfirm= document.getElementById('modal-confirm');
  const modalCancel= document.getElementById('modal-cancel');

  function getTodos(){
    return JSON.parse(localStorage.getItem('todos')) || [];
  }

  function saveTodos(todos){
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function renderTodos(todos) {
    todoListElement.innerHTML = '';
    todos.forEach(todo => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><input type="checkbox" class="todo-checkbox" data-id="${todo.id}"></td>
        <td>${todo.priority}</td>
        <td>${todo.completed ? '완료' : '미완료'}</td>
        <td class="title-cell">${todo.title}</td>
      `;
      todoListElement.appendChild(row);
    });
    // 전체 선택/해제
    updateSelectAllState();
  }
  function updateSelectAllState(){
    const checkboxes=document.querySelectorAll('.todo-checkbox');
    const allChecked= Array.from(checkboxes).every(cb => cb.checked);
    selectAllCheckbox.checked=allChecked&&checkboxes.length>0;
  }

  renderTodos(getTodos());
});