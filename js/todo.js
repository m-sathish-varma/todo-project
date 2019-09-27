var tasks = [];
var activeTask = [];
var activeSubTask = [];
var isRightColOpen;

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

document.getElementById("close-button").addEventListener("click", function() {
    let right = getElementById("right-column");
    right.style.display = "none";
    isRightColOpen = false;
});

document.getElementById("delete-sub-task").addEventListener("click", function() {
    let right = getElementById("right-column");
    right.style.display = "none";
    isRightColOpen = false;
    let deleteOption = confirm("Do you want to delete?");
    if (true == deleteOption) {
        activeSubTask.status = false;
        displayTaskInfo(activeTask.id);
    }
});

document.getElementById("plus-symbol").addEventListener("click", function(){
    let newList = getElementById("new-list");
    let leftDiv = getElementById("left-column");
    let middle = getElementById("middle-column");
    let optionValue = getElementById("option-value");
    let words = getElementByClassName("menu-name");
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

document.getElementById("plus").addEventListener("click", function(){
    let subTaskList = getElementById("sub-task-list");
    let newTask = getElementById("new-task");
    makeInputEmpty("new-task");
    newTask.focus();
});

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

document.getElementById("sub-task-name").addEventListener("click", function(){
    let taskName = getElementById("sub-task-name");
    console.log("edit");
    taskName.contentEditable = "true"; 
});

document.getElementById("sub-task-name").addEventListener("keyup", function(event){
    let taskName = getElementById("sub-task-name");
    console.log(taskName);
    if (13 == event.keyCode) {
        document.execCommand('defaultParagraphSeparator', false, 'div');
        event.preventDefault();
        if(undefined == typeof(taskName)) {
            taskName.innerHTML = activeSubTask.subTaskName;
            taskName.focus();
        } else {
            activeSubTask.subTaskName = taskName.innerHTML;
            let subTask = getElementById(activeSubTask.id).getElementsByTagName("span")[1];
            subTask.innerHTML = "";
            subTask.style.height = "4rem";
            subTask.innerHTML = activeSubTask.subTaskName;
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
    isRightColOpen = false;
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

function displayTaskInfo(idValue) {
    let right = getElementById("right-column");
    let taskSelected = tasks.find(function(event) {
        return event.id == idValue;
    });
    isRightColOpen = false;
    right.style.display = "none";
    right.style.transition = "0.3s";
    let subTaskInfo = taskSelected.subTask;
    let subTaskList = getElementById("sub-task-list");
    subTaskList.innerHTML = "";
    subTaskInfo.forEach(displaySubTask);
}


function displaySubTask(subTask, index) {
    let subTaskList = getElementById("sub-task-list");
    let newDiv = document.createElement("div");
    let taskSpan = document.createElement("span");
    let iconSpan = document.createElement("span");
    if (true == subTask.status) {
        if (true == subTask.isStriked) {
            iconSpan.setAttribute("class", "strike-image");
            taskSpan.innerHTML = subTask.subTaskName.strike();
        } else {
            iconSpan.setAttribute("class", "strike");
            taskSpan.innerHTML = subTask.subTaskName;
        }
        iconSpan.id = subTask.checkId;
        iconSpan.addEventListener("click", function(){
            strikeSubTask(this.id);
        });
        newDiv.appendChild(iconSpan);
        taskSpan.style.marginLeft = "3%";
        taskSpan.style.width = "40rem";
        newDiv.setAttribute("class", "new-task");
        newDiv.id = subTask.id;
        newDiv.style.cursor = "pointer";
        newDiv.append(taskSpan);
        taskSpan.id = subTask.nameId;
        taskSpan.addEventListener("click", function(){
            addSubTaskSteps(this.id);
        });
        subTaskList.appendChild(newDiv);
    }
}

function displayTaskName(inputValue) {
    let subTaskList = getElementById("sub-task-list");
    subTaskList.innerHTML = "";
    makeInputEmpty("new-task");
    let taskName = getElementById("task-name");
    taskName.innerHTML = inputValue;
}

function addNewSubTask() {
    let subTaskInfo;
    let index = document.getElementById("task-name");
    let taskSelected = tasks.find(function(event) {
         return event.taskName == index.innerHTML;
    });
    let stepsList = [];
    let newSubTask = [];
    let newTask = getElementById("new-task");
    let newDiv = document.createElement("div");
    let taskSpan = document.createElement("span");
    let iconSpan = document.createElement("span");
    let subTaskList = getElementById("sub-task-list");
    taskSpan.innerHTML = newTask.value;
    iconSpan.setAttribute("class", "strike");
    iconSpan.id = getId();
    iconSpan.addEventListener("click", function () { strikeSubTask(this.id) });
    newDiv.appendChild(iconSpan);
    taskSpan.style.marginLeft = "3%";
    taskSpan.style.width = "40rem";
    newDiv.style.cursor = "pointer";
    newDiv.setAttribute("class", "new-task");
    newDiv.id = getId();
    taskSpan.id = getId();
    taskSpan.addEventListener("click", function (){ addSubTaskSteps(this.id); });
    newSubTask.id = newDiv.id;
    newSubTask.nameId = taskSpan.id; 
    newSubTask.isStriked = false;
    newSubTask.checkId = iconSpan.id;
    newSubTask.subTaskName = newTask.value;
    newSubTask.steps = stepsList;
    newSubTask.status = true;
    newDiv.append(taskSpan);
    subTaskList.appendChild(newDiv);
    subTaskInfo = taskSelected.subTask;
    subTaskInfo.push(newSubTask);
    makeInputEmpty("new-task");
    activeSubTask = newSubTask;
    newTask.focus();
    console.log(activeSubTask);
}

function strikeSubTask(checkId) {
    let selectedSubTask = getSubTaskByCheckId(checkId);
    let imageSpan = getElementById(selectedSubTask.id).getElementsByTagName("span")[0];
    let subTask = getElementById(selectedSubTask.id).getElementsByTagName("span")[1];
    let strikedName = subTask.innerHTML.strike();
    let isStriked = getIsStriked(selectedSubTask);
    if (true == isStriked) {
        imageSpan.setAttribute("class", "strike-image");
        subTask.innerHTML = strikedName;
        subTask.style.height = "4rem";
        changeSubTaskInRight(true);
    } else {
        imageSpan.setAttribute("class", "strike");
        subTask.innerHTML = selectedSubTask.subTaskName;
        subTask.style.height = "4rem";
        changeSubTaskInRight(false);
    }
}

function getSubTaskByCheckId(checkId) {
    let selectedSubTask;
    for (let i in tasks) {
        var subtask = tasks[i].subTask;
        for (let j in subtask) {
            if (checkId == subtask[j].checkId) {
                selectedSubTask = subtask[j];
            }
        }
    }
    return selectedSubTask;
}

function changeSubTaskInRight(isStriked) {
    let subTaskImage = getElementById("sub-task").getElementsByTagName("span")[0];
    let subTaskName = getElementById("sub-task-name");
    let subStriked = subTaskName.innerHTML.strike();
    if (true == isStriked && true == isRightColOpen) {
        subTaskImage.style.backgroundRepeat = "no-repeat";
        subTaskImage.style.backgroundImage = "url('images/check.svg')";
        subTaskImage.style.backgroundSize = "contain";
        subTaskName.innerHTML = subStriked;
    } else if (true == isRightColOpen) {
        subTaskImage.style.backgroundRepeat = "no-repeat";
        subTaskImage.style.backgroundImage = "url('images/verified.svg')";
        subTaskImage.style.backgroundSize = "contain";
        subTaskName.innerHTML = activeSubTask.subTaskName;
    }
}

function getIsStriked(selectedSubTask) {
    if (false == selectedSubTask.isStriked) {
        selectedSubTask.isStriked = true;
        return true;
    } else {
        selectedSubTask.isStriked = false;
        return false;
    }
}

function addNewStep() {
    let notes = getElementById("add-note-content");
    let step = getElementById("new-step");
    let stepInfo = [];
    let steps = activeSubTask.steps
    let newDiv = document.createElement("div");
    let newSpan = document.createElement("span");
    let iconSpan = document.createElement("span");
    let steplist = getElementById("steps-list");
    stepInfo.stepName = step.value;
    activeSubTask.notes = notes.innerHTML;
    newSpan.id = getId();
    iconSpan.id = getId();
    iconSpan.addEventListener("click", function() {strikeStep(this.id)});
    iconSpan.setAttribute("class", "strike");
    newDiv.appendChild(iconSpan);
    newSpan.style.paddingLeft = "1.1rem";
    newSpan.innerHTML = step.value;
    newDiv.appendChild(newSpan);
    newDiv.id = getId();
    newDiv.setAttribute("class", "new-step");
    steplist.appendChild(newDiv);
    stepInfo.id = newDiv.id;
    stepInfo.isStriked = false;
    stepInfo.checkId = iconSpan.id;
    stepInfo.nameId = newSpan.id;
    steps.push(stepInfo);
    makeInputEmpty("new-step");
}

function addSubTaskSteps(subTaskId) {
    var selectedTask;
    let right = getElementById("right-column");
    for (let i in tasks) {
        var subtask = tasks[i].subTask;
        for (let j in subtask) {
            if (subTaskId == subtask[j].nameId) {
                activeTask = tasks[i];
                activeSubTask = subtask[j];
                console.log(activeSubTask);
            }
        }
    }
    isRightColOpen = true;
    right.style.display = "block";
    right.style.transition = "0.3s";
    displayExistingSteps();
    makeInputEmpty("new-step");
}

function displayExistingSteps() {
    let subTaskName = getElementById("sub-task-name");
    let strikeImage = getElementById("sub-task").getElementsByTagName("span")[0];
    let notes = getElementById("add-note-content");
    let steplist = getElementById("steps-list");
    let steps = activeSubTask.steps;
    if (true == activeSubTask.isStriked) {
        strikeImage.style.backgroundRepeat = "no-repeat";
        strikeImage.style.backgroundImage = "url('images/check.svg')";
        strikeImage.style.backgroundSize = "contain";
        subTaskName.innerHTML = activeSubTask.subTaskName.strike();
    } else {
        strikeImage.style.backgroundRepeat = "no-repeat";
        strikeImage.style.backgroundImage = "url('images/verified.svg')";
        strikeImage.style.backgroundSize = "contain";
        subTaskName.innerHTML = activeSubTask.subTaskName;
    }
    steplist.innerHTML = "";
    if (notes.innerHTML && notes) { 
        notes.innerHTML = activeSubTask.notes; 
    }
    steps.forEach(displaySteps);
}

function displaySteps(step, index) {
    let steplist = getElementById("steps-list");
    let newDiv = document.createElement("div");
    let taskSpan = document.createElement("span");
    let iconSpan = document.createElement("span");
    iconSpan.id = step.checkId;
    newDiv.id = step.id;
    taskSpan.id = step.nameId;
    iconSpan.addEventListener("click", function() {strikeStep(this.id)});
    iconSpan.setAttribute("class", "strike");
    newDiv.appendChild(iconSpan);
    if (true == step.isStriked) {
        iconSpan.style.backgroundRepeat = "no-repeat";
        iconSpan.style.backgroundImage = "url('images/check.svg')";
        iconSpan.style.backgroundSize = "contain";
        taskSpan.innerHTML = step.stepName.strike();
    } else {
        iconSpan.style.backgroundRepeat = "no-repeat";
        iconSpan.style.backgroundImage = "url('images/verified.svg')";
        iconSpan.style.backgroundSize = "contain";
        taskSpan.innerHTML = step.stepName;
    }
    taskSpan.style.marginLeft = "6%";
    newDiv.setAttribute("class", "new-step");
    newDiv.style.cursor = "pointer";
    newDiv.append(taskSpan);
    steplist.appendChild(newDiv);
}

function strikeStep(id) {
    let currentStep = getCurrentStep(id);
    let isStriked = getIsStepStriked(currentStep);
    let imageSpan = getElementById(currentStep.checkId);
    let stepName = getElementById(currentStep.nameId);
    if (true == isStriked) {
        imageSpan.style.backgroundRepeat = "no-repeat";
        imageSpan.style.backgroundImage = "url('images/check.svg')";
        imageSpan.style.backgroundSize = "contain";
        stepName.innerHTML = currentStep.stepName.strike();
    } else {
        imageSpan.style.backgroundRepeat = "no-repeat";
        imageSpan.style.backgroundImage = "url('images/verified.svg')";
        imageSpan.style.backgroundSize = "contain";
        stepName.innerHTML = currentStep.stepName;
    }
}

function getCurrentStep(id) {
    let steps = activeSubTask.steps;
    for (let i in steps) {
        if(id == steps[i].checkId) {
            return steps[i]; 
        }
    }
}

function getIsStepStriked(currentStep) {
    if (false == currentStep.isStriked) {
        currentStep.isStriked = true;
        return true;
    } else {
        currentStep.isStriked = false;
        return false;
    }
}

function checkTaskTitle(title) {
    let size;
    var list = tasks.filter(function(task) {
        if(task.taskName.includes("(")) {
            return title === task.taskName.slice(0, task.taskName.indexOf("("));
        } else {
           return task.taskName == title;
        }
    });
    size = list.length;
    if(0 == size) {
        return title;
    } else {
        return (title+"&nbsp;("+size+")");
    }
}
