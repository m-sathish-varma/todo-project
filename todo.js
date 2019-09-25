var tasks = [];
var activeSubTask = [];

document.getElementById("menu-icon").addEventListener("click", function(){
    var leftDiv = getElementById("left-column");
    var middle = getElementById("middle-column");
    var optionValue = getElementById("option-value");
    var words = getElementByClassName("menu-name");
    if (optionValue.value === "openMenu") {
        leftDiv.style.width = "22.5%";
        middle.style.width = "77%";
        optionValue.value = "closeMenu";
        for (let i in words) {
            words[i].style.display = "block";
        }
    } else {
        leftDiv.style.width = "50px";
        middle.style.width = "97%";
        optionValue.value = "openMenu";
        for (let i in words) {
            words[i].style.display = "none";
        }
    }
});

document.getElementById("plus-symbol").addEventListener("click", function(){
    let newList = getElementById("new-list");
    var leftDiv = getElementById("left-column");
    var middle = getElementById("middle-column");
    var optionValue = getElementById("option-value");
    var words = getElementByClassName("menu-name");
    leftDiv.style.width = "22.5%";
    middle.style.width = "77%";
    optionValue.value = "closeMenu";
    newList.focus();
    for (let i in words) {
        words[i].style.display = "block";
    }
});

document.getElementById("new-list").addEventListener("keyup", function(event){
    let inputValue = getElementById("new-list");
    if (event.keyCode == 13) {
        if(0 == inputValue.value.length) {
            inputValue.focus();
        } else {
           addNewList(inputValue);
           console.log("reached");
        }
    }
});

function addNewList(inputValue) {
       let subTask = new Array();
       let right = getElementById("right-column");
       let tasksInformation = new Array();
       let sideMenuContent = getElementById("created-list");
       let newDiv = document.createElement("div");
       let newSpan = document.createElement("span");
       right.style.display = "none";
       right.style.transition = "0.3s";
       newDiv.style.display = "flex";
       newDiv.style.color = "#3d71e4";
       newDiv.innerHTML = "<i class = 'fa fa-list-ul'></i>";
       newSpan.className = "menu-name";
       newDiv.id = getId();
       tasksInformation.id = newDiv.id;
       tasksInformation.subTask = subTask;
       newSpan.style.display = "block";
       newSpan.style.color = "black";
       newSpan.innerHTML = checkTaskTitle(inputValue.value);
       tasksInformation.taskName = newSpan.innerHTML;
       newDiv.appendChild(newSpan);
       newDiv.style.height = "37px";
       newDiv.style.paddingLeft = "17px";
       newDiv.style.cursor = "pointer";
       newDiv.style.alignItems = "center";
       newDiv.addEventListener("click", function(){
           var taskName = getElementById("task-name");
           taskName.innerHTML = newSpan.innerHTML;
           displayTaskInfo(this.id);
       });
       sideMenuContent.appendChild(newDiv);
       displayTaskName(newSpan.innerHTML);
       inputValue.value = "";
       tasks.push(tasksInformation);
}

function displayTaskName(inputValue) {
    let subTaskList = getElementById("sub-task-list");
    subTaskList.innerHTML = "";
    makeInputEmpty("new-task");
    let taskName = getElementById("task-name");
    taskName.innerHTML = inputValue;
}

document.getElementById("new-task").addEventListener("keyup", function(event) {
let inputValue = getElementById("new-task");
if (13 == event.keyCode) {
    if(0 == inputValue.value.length) {
        inputValue.focus();
    } else {
        addNewSubTask();
    }
}
});

function addNewSubTask() {
    let subTaskInfo;
    var index = document.getElementById("task-name");
    var taskSelected = tasks.find(function(event) {
         return event.taskName == index.innerHTML;
    });
    let stepsList = [];
    var newSubTask = [];
    let newTask = getElementById("new-task");
    let newDiv = document.createElement("div");
    let taskSpan = document.createElement("span");
    let subTaskList = getElementById("sub-task-list");
    taskSpan.innerHTML = newTask.value;
    newDiv.innerHTML = "<i class='fa fa-circle-o'></i>";
    taskSpan.style.marginLeft = "4%";
    newDiv.id = getId();
    newDiv.style.cursor = "pointer";
    newDiv.setAttribute("class", "new-task");
    newDiv.addEventListener("click", function(){
        addSubTaskSteps(this.id);
    });
    newSubTask.id = newDiv.id;
    newSubTask.subTaskName = newTask.value;
    newSubTask.steps = stepsList;
    newDiv.append(taskSpan);
    subTaskList.appendChild(newDiv);
    subTaskInfo = taskSelected.subTask;
    subTaskInfo.push(newSubTask);
    makeInputEmpty("new-task");
    newTask.focus();
}

document.getElementById("plus").addEventListener("click", function(){
    let subTaskList = getElementById("sub-task-list");
    let newTask = getElementById("new-task");
    makeInputEmpty("new-task");
    newTask.focus();
});

function displayTaskInfo(idValue) {
    let right = getElementById("right-column");
    var taskSelected = tasks.find(function(event) {
        return event.id == idValue;
    });
    right.style.display = "none";
    right.style.transition = "0.3s";
    console.log(taskSelected);
    let subTaskInfo = taskSelected.subTask;
    let subTaskList = getElementById("sub-task-list");
    subTaskList.innerHTML = "";
    subTaskInfo.forEach(displaySubTask);
    function displaySubTask(subTask, index) {
        let newDiv = document.createElement("div");
        let taskSpan = document.createElement("span");
        newDiv.innerHTML = "<i class='fa fa-circle-o' aria-hidden='true'></i>";
        taskSpan.innerHTML = subTask.subTaskName;
        taskSpan.style.marginLeft = "4%";
        newDiv.setAttribute("class", "new-task");
        newDiv.id = subTask.id;
        newDiv.style.cursor = "pointer";
        newDiv.append(taskSpan);
        newDiv.addEventListener("click", function(){
            addSubTaskSteps(this.id);
        });
        subTaskList.appendChild(newDiv);
    }
}

document.getElementById("new-step").addEventListener("keyup", function(event) {
let inputValue = getElementById("new-step");
if (13 == event.keyCode) {
    if(0 == inputValue.value.length) {
        inputValue.focus();
    } else {
        addNewStep();
    }
}
});

function addNewStep() {
    let notes = getElementById("add-note-content");
    let step = getElementById("new-step");
    let stepInfo = [];
    let steps = activeSubTask.steps
    stepInfo.stepName = step.value;
    let newDiv = document.createElement("div");
    let newSpan = document.createElement("span");
    let steplist = getElementById("steps-list");
    newDiv.innerHTML = "<i class='fa fa-circle-o' aria-hidden='true'></i>";
    activeSubTask.notes = notes.innerHTML;
    newSpan.style.paddingLeft = "1rem";
    newSpan.innerHTML = step.value;
    newDiv.appendChild(newSpan);
    newDiv.id = getId();
    newDiv.setAttribute("class", "new-step");
    steplist.appendChild(newDiv);
    stepInfo.id = newDiv.id;
    steps.push(stepInfo);
}

function addSubTaskSteps(subTaskId) {
    var selectedTask;
    for (let i in tasks) {
        var subtask = tasks[i].subTask;
        for (let j in subtask) {
            if (subTaskId == subtask[j].id) {
                selectedTask = tasks[i];
                selectedSubTask = subtask[j];
                activeSubTask = subtask[j];
                console.log(activeSubTask);
            }
        }
    }
    let right = getElementById("right-column");
    right.style.display = "block";
    right.style.transition = "0.3s";
    displayExistingSteps();
}

function displayExistingSteps() {
    let subTaskName = getElementById("sub-task-name");
    let notes = getElementById("add-note-content");
    subTaskName.innerHTML = selectedSubTask.subTaskName;
    let steplist = getElementById("steps-list");
    steplist.innerHTML = "";
    console.log("step");
    if (notes.innerHTML && notes) { 
        notes.innerHTML = activeSubTask.notes; 
    }
    let steps = activeSubTask.steps;
    steps.forEach(displaySteps);
    function displaySteps(step, index) {
    console.log("step inside");
        let newDiv = document.createElement("div");
        let taskSpan = document.createElement("span");
        newDiv.innerHTML = "<i class='fa fa-circle-o' aria-hidden='true'></i>";
        taskSpan.innerHTML = step.stepName;
        taskSpan.style.marginLeft = "6%";
        newDiv.setAttribute("class", "new-task");
        newDiv.id = step.id;
        newDiv.style.cursor = "pointer";
        newDiv.append(taskSpan);
        steplist.appendChild(newDiv);
    }
    
}

function checkTaskTitle(title) {
   console.log(title);
   var list = tasks.filter(function(task) {
       if(task.taskName.includes("(")) {
           return title === task.taskName.slice(0, task.taskName.indexOf("("));
       } else {
           return task.taskName == title;
       }
   });
   let size = list.length;
   if(0 == size) {
       return title;
   } else {
       return (title+"&nbsp;("+size+")");
   }
}

function makeInputEmpty(inputId) {
    var input = getElementById(inputId);
    input.value = "";
    input.focus();
}

function getElementById(id) {
    return document.getElementById(id);
}

function getElementByClassName(className) {
    return document.getElementsByClassName(className);
}

function getId() {
  return Math.random().toString(36).substr(2, 9);
}
