// TODO-MVC

// Model
/*
[ {
    id : number, 
    title: string, 
    completed: boolean
}]
*/

const state = {
    todos: [{ id: -1, title: "first", completed: false }],
    count: 0,
  };
  
  // Controlers
  
  function createTodo(title) {
    // Manipulate Model
    const newTodo = {
      id: state.count + 1,
      title: title,
      completed: false,
    };
    state.todos.push(newTodo);
    state.count++;
  
    //Trigger view render
    renderView();
  }
  
  // removes todo item
  function deleteTodo(id) {
    const newTodos = state.todos.filter((todo) => {
        return todo.id != id;
    });

    state.todos = newTodos;
    renderView();
  }

  // Toggles todo complete
  function toggleTodo(id) {
    const li = document.getElementById(id);

    const todo = state.todos.find(function(todo) {
        return todo.id === id;
    });
    todo.completed = !todo.completed;

    if (todo.completed == true) {
        li.classList.add("completed");
    } else {
        li.classList.remove("completed");
    }
    renderView;
  }

  function confirmEdit(id) {
    const todo = state.todos.find(function(todo) {
        return todo.id === id;
    });
    const li = document.getElementById(id);
    const text = li.querySelector(".input").value;
    todo.title = text;
    
    renderView();
  }

  function cancelEdit(id) {
      renderView();
  }


  // View
  const todoInput = document.querySelector("#todo-input");
  const addBtn = document.querySelector("#add-btn");
  const listContainer = document.querySelector("#list-container");
  
  function createTodoNode(todo) {
    console.log(todo);
      console.log(todo.title);
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const checkbox = document.createElement("input");

    span.classList.add("text-content");
    checkbox.classList.add("checkbox");
    deleteBtn.classList.add("delete-btn");
    editBtn.classList.add("edit-btn");

    li.id = todo.id;
    checkbox.type = "checkbox";
    span.textContent = todo.title;
    deleteBtn.textContent = "Delete";
    editBtn.textContent = "Edit";
    li.append(checkbox, span, deleteBtn, editBtn);
  
    return li;
  }

  // Edit todo content 
  function editTodoNode(id) {
    const li = document.getElementById(id);
    const input = document.createElement("input");
    const confirmBtn = document.createElement("button");
    const cancelBtn = document.createElement("button");
    const text = li.querySelector(".text-content").textContent;
    
    input.classList.add("input");
    confirmBtn.classList.add("confirm-btn");
    cancelBtn.classList.add("cancel-btn");

    input.value = text;
    confirmBtn.textContent = "Confirm";
    cancelBtn.textContent = "Cancel";

    li.innerHTML = '';
    li.append(input, confirmBtn, cancelBtn);
  }
  
  function renderView() {
    listContainer.innerHTML = "";
    state.todos.forEach(function (todo) {
      const li = createTodoNode(todo);
      listContainer.append(li);
    });
  }
  
  addBtn.addEventListener("click", () => {
    createTodo(todoInput.value);
    todoInput.value = "";
  });

  listContainer.addEventListener('click', (e) => {
    const li = e.target.parentElement;
    if (e.target.className === 'delete-btn') {
        deleteTodo(Number(li.id));
    } else if (e.target.className === 'checkbox') {
        toggleTodo(Number(li.id));
    } else if (e.target.className === 'edit-btn') {
        console.log("edited!");
        editTodoNode(Number(li.id));
    } else if (e.target.className === 'confirm-btn') {
        confirmEdit(Number(li.id));
    } else if (e.target.className === 'cancel-btn') {
        cancelEdit(Number(li.id));
    }
  });  
  
  renderView();
  