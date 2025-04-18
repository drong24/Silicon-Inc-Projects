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
  
  

  // View
  const todoInput = document.querySelector("#todo-input");
  const addBtn = document.querySelector("#add-btn");
  const listContainer = document.querySelector("#list-container");
  
  function createTodoNode(todo) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const checkbox = document.createElement("input");
    li.id = todo.id;
    checkbox.type = "checkbox";
    span.textContent = todo.title;
    deleteBtn.textContent = "Delete";
    li.append(checkbox, span, deleteBtn);
  
    return li;
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
  
  renderView();
  