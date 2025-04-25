document.addEventListener('DOMContentLoaded', () => {
  const selectAllCheckbox = document.getElementById('select-all');
  const todoListElement = document.getElementById('todo-list');
  const addBtn = document.getElementById('add-btn');
  const input= document.getElementById('todo-input');
  const prioritySelect= document.getElementById('priority-select');
  const completeBtn= document.getElementById('complete-button');
  const modal= document.getElementById('modal');
  const modalConfirm= document.getElementById('modal-confirm');
  const deleteBtn= document.getElementById('delete-button');
  const filterButtons = document.querySelectorAll('.filter-button');
  const priorityFilter = document.getElementById('priority-filter');
  
  let currentFilter = '전체';    
  let currentPriority = '';        

  function getTodos(){
    return JSON.parse(localStorage.getItem('todos')) || [];
  }

  function saveTodos(todos){
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function getFilteredTodos() {
    let todos = getTodos();
    
    // 완료 상태 필터링
    switch(currentFilter) {
      case '완료':
        todos = todos.filter(todo => todo.completed);
        break;
      case '미완료':
        todos = todos.filter(todo => !todo.completed);
        break;
    }
    
    // 중요도 필터링
    if (currentPriority) {
      todos = todos.filter(todo => todo.priority === Number(currentPriority));
    }
    
    return todos;
  }

  function renderTodos(todos) {
    todoListElement.innerHTML = '';
    todos.forEach(todo => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><input type="checkbox" class="todo-checkbox" data-id="${todo.id}"></td>
        <td>${todo.priority}</td>
        <td>${todo.completed ? '✅' : '❌'}</td>
        <td class="title-cell">${todo.title}</td>
      `;
      todoListElement.appendChild(row);

      const checkbox = row.querySelector('.todo-checkbox');
      checkbox.addEventListener('change', () => {
        updateSelectAllState();
      });
    });
    updateSelectAllState();

    // 필터링 결과가 없을 때 메시지 표시
    if (todos.length === 0) {
      const emptyRow = document.createElement('tr');
      emptyRow.innerHTML = `
        <td colspan="4" style="text-align: center; padding: 20px;">
          해당하는 할 일이 없습니다.
        </td>
      `;
      todoListElement.appendChild(emptyRow);
    }
  }

  function updateSelectAllState() {
    const checkboxes = document.querySelectorAll('.todo-checkbox');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    selectAllCheckbox.checked = allChecked && checkboxes.length > 0;
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      currentFilter = button.textContent;
      renderTodos(getFilteredTodos());
    });
  });

  priorityFilter.addEventListener('change', (e) => {
    currentPriority = e.target.value;
    renderTodos(getFilteredTodos());
  });

  filterButtons[0].classList.add('active'); 

  renderTodos(getFilteredTodos());

  selectAllCheckbox.addEventListener('change', (e) => {
    const checkboxes = document.querySelectorAll('.todo-checkbox');
    checkboxes.forEach(cb => {
      cb.checked = e.target.checked;
    });
  });

  modalConfirm.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  addBtn.addEventListener('click', () => {
    const title = input.value.trim();
    const priority = prioritySelect.value;

    if (!title || !priority) {
      modal.style.display = 'block';
      return;
    }

    const todos = getTodos();
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
      priority: Number(priority),
    };
    todos.push(newTodo);
    saveTodos(todos);
    renderTodos(todos);

    input.value = '';
    prioritySelect.value = '1';
  });

  completeBtn.addEventListener('click', () => {
    const todos = getTodos();
    const checkboxes = document.querySelectorAll('.todo-checkbox');
    let hasChanges = false;

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const todoId = Number(checkbox.dataset.id);
        const todo = todos.find(todo => todo.id === todoId);
        if (todo) {
          todo.completed = !todo.completed;
          hasChanges = true;
        }
      }
    });

    if (hasChanges) {
      saveTodos(todos);
      renderTodos(getFilteredTodos()); 
      renderTodos(getFilteredTodos());
      
      const allCheckboxes = document.querySelectorAll('.todo-checkbox');
      allCheckboxes.forEach(cb => {
        cb.checked = false;
      });
      selectAllCheckbox.checked = false;
    }
  });

  deleteBtn.addEventListener('click', () => {
    const todos = getTodos();
    const checkboxes = document.querySelectorAll('.todo-checkbox');
    
    const remainingTodos = todos.filter(todo => {
      const checkbox = document.querySelector(`.todo-checkbox[data-id="${todo.id}"]`);
      return !checkbox || !checkbox.checked;
    });

    saveTodos(remainingTodos);
    renderTodos(remainingTodos);
    
    if (selectAllCheckbox) {
      selectAllCheckbox.checked = false;
    }
  });
  
});