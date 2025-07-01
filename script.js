document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from localStorage on page load
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function updateTaskList() {
        taskList.innerHTML = "";
        savedTasks.forEach(function (taskText) {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `
                <span>${taskText}</span>
                <button class="check-button">✔</button>
                <button class="delete-button">Delete</button>
            `;

            taskList.appendChild(taskItem);

            const deleteButton = taskItem.querySelector(".delete-button");
            deleteButton.addEventListener("click", function () {
                savedTasks.splice(savedTasks.indexOf(taskText), 1);
                updateTaskList();
                localStorage.setItem("tasks", JSON.stringify(savedTasks));
            });

            const checkButton = taskItem.querySelector(".check-button");
            checkButton.addEventListener("click", function () {
                taskItem.classList.add("completed");
                checkButton.style.display = "none";
            });
        });
    }

    updateTaskList();

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        savedTasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        updateTaskList();

        taskInput.value = "";
    });

    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });
});
