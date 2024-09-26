var tasks = {
    todo: [],
    inProgress: [],
    done: []
};

function addTask(column) {
    var inputId = column + "-input";
    var inputElement = document.getElementById(inputId);
    var taskText = inputElement.value.trim();

    if (taskText) {
        tasks[column].push(taskText);
        renderTasks(column);
        inputElement.value = '';
    }
}

function renderTasks(column) {
    var tasksContainerId = column + "-tasks";
    var tasksContainer = document.getElementById(tasksContainerId);
    tasksContainer.innerHTML = '';

    tasks[column].forEach(function(task, index) {
        var taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.innerText = task;
        taskElement.setAttribute('draggable', true);
        taskElement.setAttribute('ondragstart', 'drag(event, "' + column + '", ' + index + ')');
        tasksContainer.appendChild(taskElement);
    });
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event, column, index) {
    event.dataTransfer.setData("text/plain", column + "|" + index);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text/plain").split("|");
    var sourceColumn = data[0];
    var taskIndex = data[1];

    var task = tasks[sourceColumn][taskIndex];

    // Remove task from the source column
    tasks[sourceColumn].splice(taskIndex, 1);

    // Determine the target column
    var targetColumn = event.target.closest('.column').id;

    // Add the task to the target column
    tasks[targetColumn].push(task);

    // Re-render both columns
    renderTasks(sourceColumn);
    renderTasks(targetColumn);
}
