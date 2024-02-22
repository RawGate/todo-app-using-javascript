document.addEventListener('DOMContentLoaded', function() {
    // Retrieve todo items from local storage
    let todos;
const storedTodos = localStorage.getItem('todos');

if (storedTodos) {
  todos = JSON.parse(storedTodos);
} else {
  todos = [];
}
  
    // Adding a Todo and Rendering Todo List
    const form = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list');
    const counter = document.getElementById('counter');
    let todoCounter = todos.length;
  
    // Render existing todos from local storage
    todos.forEach(function(todo) {
      renderTodoItem(todo);
    });
  
    // Add listener to the form submit
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Get the input value
      const todoInput = document.getElementById('todo-input');
      const task = todoInput.value.trim();
  
      if (task) {
        // Create a new todo object
        const todo = {
          id: Date.now(),
          task: task,
          completed: false
        };
        // Add the todo to the todos array
        todos.push(todo);
  
        // Save the updated todos array to local storage
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodoItem(todo);
        todoInput.value = '';
        updateCounter(1);
      }
    });
  
    // Function to render a todo item
    function renderTodoItem(todo) {
      // Create a new list item
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span class="task">${todo.task}</span>
        <button class="edit-button">&#9998;</button>
        <button class="delete-button">&#10006;</button>
      `;
  
      // Set the completed state of the todo item
      if (todo.completed) {
        listItem.querySelector('.task').classList.add('completed');
        listItem.querySelector('.checkbox').checked = true;
      }
  
      // Add eventlistener to the delete button
      const deleteButton = listItem.querySelector('.delete-button');
      deleteButton.addEventListener('click', function() {
        // Remove the todo from the todos array
        todos = todos.filter(function(item) {
          return item.id !== todo.id;
        });
  
        // Save the updated todos array to local storage
        localStorage.setItem('todos', JSON.stringify(todos));
        listItem.remove();
        updateCounter(-1);
      });
  
      // Add eventlistener to the edit button
      const editButton = listItem.querySelector('.edit-button');
      editButton.addEventListener('click', function() {
        const taskElement = listItem.querySelector('.task');
        const taskText = taskElement.textContent;
  
        const newTask = prompt('Edit your task (anything fun?):', taskText);
  
        if (newTask !== null && newTask.trim() !== '') {
          // Update the task text
          taskElement.textContent = newTask;
  
          // Update the task in the todos array
          todos = todos.map(function(item) {
            if (item.id === todo.id) {
              item.task = newTask;
            }
            return item;
          });
  
          // Save the updated todos array to local storage
          localStorage.setItem('todos', JSON.stringify(todos));
        }
      });
  
      // Add listener to the checkbox
      const checkbox = listItem.querySelector('.checkbox');
      checkbox.addEventListener('change', function() {
        const taskElement = listItem.querySelector('.task');
        taskElement.classList.toggle('completed');
       
  
        // Update the completed state in the todos array
        todos = todos.map(function(item) {
          if (item.id === todo.id) {
            item.completed = !item.completed;
          }
          return item;
        });
  
        // Save the updated todos array to local storage
        localStorage.setItem('todos', JSON.stringify(todos));
      });
  
      // Append the new list item to the todo list
      todoList.appendChild(listItem);
    }
  
    // Function to update the todo counter
    function updateCounter(value) {
      todoCounter += value;
      counter.textContent = todoCounter;
    }
  
    // Add eventlistener to the search button
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', function() {
      const searchInput = document.getElementById('search-input');
      const searchTerm = searchInput.value.trim().toLowerCase();
  
      // Clear the previous search results
      todoList.innerHTML = '';
  
      // Filter the todos array based on the search term
      const filteredTodos = todos.filter(function(todo) {
        return todo.task.toLowerCase().includes(searchTerm);
      });
  
      // Render the filtered todo items
      filteredTodos.forEach(function(todo) {
        renderTodoItem(todo);
      });
  
      // Clear the search input field
      searchInput.value = '';
    });
  });