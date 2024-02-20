document.addEventListener('DOMContentLoaded', function() {

    //Adding a Todo and Rendering Todo List
    const form = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list');
    const counter = document.getElementById('counter');
    let todoCounter = 0;

    // Add listener to the form submit
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        // Get the input value
        const todoInput = document.getElementById('todo-input');
        const task = todoInput.value.trim();

        if (task !== '') {
            // Create a new list item
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <input type="checkbox" class="checkbox">
                <span class="task">${task}</span>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            `;

            // Add listener to the delete button
            const deleteButton = listItem.querySelector('.delete-button');
            deleteButton.addEventListener('click', function() {
                listItem.remove();
                updateCounter(-1);
            });

            // Add listener to the edit button
            const editButton = listItem.querySelector('.edit-button');
            editButton.addEventListener('click', function() {
                const taskElement = listItem.querySelector('.task');
                const taskText = taskElement.textContent;

                const newTask = prompt('Edit your task (anything fun?):', taskText);

                if (newTask !== null && newTask.trim() !== '') {
                    taskElement.textContent = newTask;
                }
            });

            // Add listener to the checkbox
            const checkbox = listItem.querySelector('.checkbox');
            checkbox.addEventListener('change', function() {
                const taskElement = listItem.querySelector('.task');
                taskElement.classList.toggle('completed');
            });

            // Append the new list item to the todo list
            todoList.appendChild(listItem);

            // Clear the input field
            todoInput.value = '';

            // Update the counter
            updateCounter(1);
        }
    });

    // Function to update the todo counter
    function updateCounter(value) {
        todoCounter += value;
        counter.textContent = todoCounter;
    }
});