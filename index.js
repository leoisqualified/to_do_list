document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${task}</span>
        <button class='edit-btn' onClick="editTask(${index})">Edit</button>
        <button class='delete-btn' onClick="deleteTask(${index})">Delete</button>`;
        taskList.appendChild(listItem);
    });
}

function addTask() {
    const newTaskInput = document.getElementById('newTaskInput');
    const taskTest = newTaskInput.value.trim();

    if ( taskTest ) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskTest);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        newTaskInput.value = '';
        loadTasks();        
    }
}

function deleteTask( index ) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks;
}

function editTask( index ) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const newTask = prompt('Edit your task:', task[index]);
    if (newTask !== null && newTask.trim() !== '') {
        tasks[index] = newTask.trim();
        localStorage.setItem('tasks',JSON.stringify(tasks));
        loadTasks()
    }
}