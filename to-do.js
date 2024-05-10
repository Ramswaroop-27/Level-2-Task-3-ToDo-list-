let pendingTasks = [];
let completedTasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = {
            text: taskText,
            date: new Date().toLocaleString(),
            completed: false
        };
        pendingTasks.push(task);
        displayTasks();
        taskInput.value = '';
    }
}

function completeTask(index) {
    pendingTasks[index].completed = true;
    const completedTask = pendingTasks.splice(index, 1)[0];
    completedTasks.push(completedTask);
    displayTasks();
}

function deleteTask(list, index) {
    if (list === 'pending') {
        pendingTasks.splice(index, 1);
    } else if (list === 'completed') {
        completedTasks.splice(index, 1);
    }
    displayTasks();
}

function displayTasks() {
    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');

    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    pendingTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `${task.text} - Added: ${task.date}`;
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.onclick = () => completeTask(index);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask('pending', index);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        pendingTasksList.appendChild(li);
    });

    completedTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `${task.text} - Completed: ${task.date}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask('completed', index);
        li.appendChild(deleteButton);
        completedTasksList.appendChild(li);
    });
}

displayTasks();
