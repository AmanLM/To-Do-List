let tasks = [];

const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const taskCounter = document.getElementById('counter');

function addTaskToDOM(task) {
    const li = document.createElement('li');

    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ' '} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <img src="bin.png" class="delete" data-id="${task.id}"/>
                    `;
    taskList.append(li);
}

function renderList() {
    taskList.innerHTML = ' ';

    for (let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i]);
    }

    taskCounter.innerHTML = tasks.length;
}

function ToggleTask(taskId) {
    const task = tasks.filter(function (task) {
        // console.log(task);
        return task.id == taskId;

    })

    if (task.length > 0) {
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        // showNotification("Task toggled successfully");
    }
    else {
        showNotification("task Could not toggled");
    }

}

function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
        return task.id !== taskId;
    })
    tasks = newTasks;
    renderList();
    showNotification("Task Deleted Successfully");
}

function addTask(task) {

    if (task) {
        tasks.push(task);
        renderList();
        showNotification("Task added Successfully");
        return;
    }
    showNotification("Task cannot be added");

}

function showNotification(text) {
    alert(text);
}

function HandleInput(e) {
    if (e.key == 'Enter') {
        const text = e.target.value;
        if (text == "") {
            showNotification("Task cannot be empty!");
            return;
        }
        const task = {
            text,
            id: Date.now().toString(),
            done: false
        }

        e.target.value = ' ';
        addTask(task);
        console.log(task);

    }
}
function handleClickListner(e) {
    const target = e.target;

    if (target.className == 'delete') {
        const taskID = target.dataset.id;
        deleteTask(taskID);

    }
    else if (target.className == 'custom-checkbox') {
        const taskID = target.id;
        ToggleTask(taskID);
    }
}
addTaskInput.addEventListener('keyup', HandleInput);
document.addEventListener('click', handleClickListner);