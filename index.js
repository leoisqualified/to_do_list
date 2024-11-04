document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        // Create a checkbox element
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = task.completed; // Set checked based on task's status
        checkBox.addEventListener('change', () => toggleTaskCompletion(index));

        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;
        if (task.completed) {
            taskSpan.classList.add('completed'); // Add a class for completed tasks
        }

        listItem.appendChild(checkBox);
        listItem.appendChild(taskSpan);
        listItem.innerHTML += `
            <button class='edit-btn' onClick="editTask(${index})">Edit</button>
            <button class='delete-btn' onClick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(listItem);
    });
}

function addTask() {
    const newTaskInput = document.getElementById('newTaskInput');
    const taskText = newTaskInput.value.trim();

    if (taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: false }); // Store task with completed status
        localStorage.setItem('tasks', JSON.stringify(tasks));
        newTaskInput.value = '';
        loadTasks();
    }
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const newTask = prompt('Edit your task:', tasks[index].text);
    if (newTask !== null && newTask.trim() !== '') {
        tasks[index].text = newTask.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
}

function toggleTaskCompletion(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[index].completed = !tasks[index].completed; // Toggle the completion status
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}
