"use strict";
init();

var tasks = [];
var activeTask = [];
var activeSubTask = [];
var isRightColOpen;

/**
 * Used to bind all event listeners in the initial load of the page. 
 */
function init() {
    addEventListeners(getElementById("menu-icon"), "click", toggleLeftDiv);
    addEventListeners(getElementById("close-button"), "click", closeRightDiv);
    addEventListeners(getElementById("delete-sub-task"), "click", deleteSubTask);
    addEventListeners(getElementById("plus-symbol"), "click", toggleLeftByPlusSymbol);
    addEventListeners(getElementById("plus"), "click", focusSubTaskInput);
    addEventListeners(getElementById("sub-task-name"), "click", makeContentEditable);
    addEventListeners(getElementById("new-list"), "keyup", addNewTask);
    addEventListeners(getElementById("new-task"), "keyup", addNewSubTaskInfo);
    addEventListeners(getElementById("new-step"), "keyup", addNewStepInfo);
    addEventListeners(getElementById("sub-task-name"), "keyup", updateSubTaskName);
}

/**
 * Used to add event and callback the function if the event is triggered.
 * 
 * @param {*} element containing element to which event to be added.
 * @param {*} selectedEvent contains the event on which the callback has to be triggered.
 * @param {*} resultOperation the function to be called if the event is triggered.
 */
function addEventListeners(element, selectedEvent, resultOperation) {
    element.addEventListener(selectedEvent, resultOperation);
}

/**
 * Used to toggle the left div if click event is triggered.
 */
function toggleLeftDiv() {
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
}

/**
 * Used to close the right div if the close icon is triggered by the click event.
 */
function closeRightDiv() {
    let right = getElementById("right-column");
    right.style.display = "none";
    isRightColOpen = false;
}

/**
 * Used to delete sub task if the delete icon is pressed.
 */
function deleteSubTask() {
    let right = getElementById("right-column");
    right.style.display = "none";
    isRightColOpen = false;
    let deleteOption = confirm("Do you want to delete?");
    if (true == deleteOption) {
        activeSubTask.status = false;
        displayTaskInfo(activeTask.id);
    }
}

/**
 * Used to toggle left div by the plus symbol on the left div. 
 */
function toggleLeftByPlusSymbol(){
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
}

/**
 * Used to add the new task if event is triggered in the new list input text box.
 * 
 * @param {*} event used to get the event keycode.
 */
function addNewTask(event){
    let inputValue = getElementById("new-list");
    if (event.keyCode == 13 && "" !== inputValue.value.trim()) {
        if(0 == inputValue.value.length) {
            inputValue.focus();
        } else {
           addNewList(inputValue);
        }
    }
}

/**
 * Used to add new sub task information if event is triggered by new-task input text box.
 * 
 * @param {*} event used to get the event keycode.
 */
function addNewSubTaskInfo(event) {
    let inputValue = getElementById("new-task");
    if (13 == event.keyCode && "" !== inputValue.value.trim()) {
        if(0 == inputValue.value.length) {
            input.innerHTML = "";
            inputValue.focus();
        } else {
            addNewSubTask();
        }
    }
}

/**
 * Used to focus the subtask input if the plus symbol is clicked.
 */
function focusSubTaskInput() {
    let subTaskList = getElementById("sub-task-list");
    let newTask = getElementById("new-task");
    makeInputEmpty("new-task");
    newTask.focus();
}

/**
 * Used to add new step information if enter key is pressed in the new-step input textbox.
 * 
 * @param {*} event used to get event keycode. 
 */
function addNewStepInfo(event) {
    let inputValue = getElementById("new-step");
    if (13 == event.keyCode) {
        if(0 == inputValue.value.length && "" !== inputValue.value.trim()) {
            inputValue.focus();
        } else {
            addNewStep();
        }
    }
}

/**
 * Used the make the input text-box empty if some value in that text box. 
 * 
 * @param {*} inputId denotes id of the input text-box to be emptied.
 */
function makeInputEmpty(inputId) {
    var input = getElementById(inputId);
    input.value = "";
    input.focus();
}

/**
 * Used to get the element by the help of the id. 
 * 
 * @param {*} id denotes the id of the element to be fetched.
 */
function getElementById(id) {
    return document.getElementById(id);
}

/**
 * Used to get created element.
 * @param {*} element denotes type of element to be created.
 */
function retrieveCreatedElement(element) {
    return document.createElement(element);
}

/**
 * Used to get the element by the help of the className. 
 * 
 * @param {*} className denotes the className of the element to be fetched.
 */
function getElementByClassName(className) {
    return document.getElementsByClassName(className);
}

/**
 * Used to get random generated id.
 */
function getId() {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Used to make the sub-task-name content editable. 
 */
function makeContentEditable() {
    let taskName = getElementById("sub-task-name");
    taskName.contentEditable = "true"; 
}

/**
 * Used to update the subTaskName.
 * @param {*} event used to get the keyCode.
 */
function updateSubTaskName(event) {
    let taskName = getElementById("sub-task-name");
    if (13 == event.keyCode) {
        if(undefined == typeof(taskName)) {
            taskName.innerHTML = activeSubTask.subTaskName;
            taskName.focus();
        } else {
            activeSubTask.subTaskName = taskName.innerHTML;
            let subTask = getElementById(activeSubTask.id).getElementsByTagName("span")[1];
            subTask.innerHTML = "";
            subTask.setAttribute("class", "taskspan-style");
            subTask.innerHTML = activeSubTask.subTaskName;
        }
    }
}

/**
 * Used to add new task into the object.
 * @param {*} inputValue contains the name of the task.
 */
function addNewList(inputValue) {
    let subTask = new Array();
    let right = getElementById("right-column");
    let tasksInformation = new Array();
    let sideMenuContent = getElementById("created-list");
    let newDiv = retrieveCreatedElement("div");
    let newSpan = retrieveCreatedElement("span");
    let iconSpan = retrieveCreatedElement("span");
    isRightColOpen = false;
    right.style.display = "none";
    right.style.transition = "0.3s";
    newDiv.setAttribute("class", "new-list");
    iconSpan.setAttribute("id", "list-icon");
    newDiv.appendChild(iconSpan);
    newSpan.className = "menu-name";
    newDiv.id = getId();
    tasksInformation.id = newDiv.id;
    tasksInformation.subTask = subTask;
    newSpan.style.display = "block";
    newSpan.style.color = "black";
    newSpan.innerHTML = checkTaskName(inputValue.value);
    tasksInformation.taskName = newSpan.innerHTML;
    newDiv.appendChild(newSpan);
    newDiv.addEventListener("click", function() {
        var taskName = getElementById("task-name");
        taskName.innerHTML = newSpan.innerHTML;
        displayTaskInfo(this.id);
    });
    sideMenuContent.appendChild(newDiv);
    displayTaskName(newSpan.innerHTML);
    inputValue.value = "";
    activeTask = tasksInformation;
    tasks.push(tasksInformation);
}

/**
 * used to display the taskname in the middle column tomake it active to add subtasks.
 *  
 * @param {*} inputValue  contains the name of the task.
 */
function displayTaskName(inputValue) {
    let subTaskList = getElementById("sub-task-list");
    subTaskList.innerHTML = "";
    makeInputEmpty("new-task");
    let taskName = getElementById("task-name");
    taskName.innerHTML = inputValue;
}

/**
 * Used to display the task information if the task contained div is clicked. 
 * @param {*} idValue contains the id of the selected task.
 */
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

/**
 * Used to add task into containing div.
 * 
 * @param {*} subTask contains the subtask information of the current task.
 * @param {*} index contains the index value of the current task.
 */
function displaySubTask(subTask, index) {
    let subTaskList = getElementById("sub-task-list");
    let newDiv = retrieveCreatedElement("div");
    let taskSpan = retrieveCreatedElement("span");
    let iconSpan = retrieveCreatedElement("span");
    if (true == subTask.status) {
        if (true == subTask.isStriked) {
            iconSpan.setAttribute("class", "strike-image");
            taskSpan.innerHTML = subTask.subTaskName.strike();
        } else {
            iconSpan.setAttribute("class", "strike");
            taskSpan.innerHTML = subTask.subTaskName;
        }
        iconSpan.id = subTask.checkId;
        addEventListeners(iconSpan, "click", strikeSubTask);
        newDiv.appendChild(iconSpan);
        taskSpan.setAttribute("class", "taskspan-style");
        newDiv.setAttribute("class", "new-task");
        newDiv.id = subTask.id;
        newDiv.append(taskSpan);
        taskSpan.id = subTask.nameId;
        addEventListeners(taskSpan, "click", displaySubTaskInfo);
        subTaskList.appendChild(newDiv);
    }
}

/**
 * used to add new sub task information into the object and display it in the middle column.
 */
function addNewSubTask() {
    let subTaskInfo;
    let index = document.getElementById("task-name");
    let taskSelected = tasks.find(function(event) {
         return event.taskName == index.innerHTML;
    });
    let stepsList = [];
    let newSubTask = [];
    let newTask = getElementById("new-task");
    let newDiv = retrieveCreatedElement("div");
    let taskSpan = retrieveCreatedElement("span");
    let iconSpan = retrieveCreatedElement("span");
    let subTaskList = getElementById("sub-task-list");
    taskSpan.innerHTML = newTask.value;
    iconSpan.setAttribute("class", "strike");
    iconSpan.id = getId();
    addEventListeners(iconSpan, "click", strikeSubTask);
    newDiv.appendChild(iconSpan);
    taskSpan.setAttribute("class", "taskspan-style");
    newDiv.setAttribute("class", "new-task");
    newDiv.id = getId();
    taskSpan.id = getId();
    addEventListeners(taskSpan, "click", displaySubTaskInfo);
    newSubTask.id = newDiv.id;
    newSubTask.nameId = taskSpan.id; 
    newSubTask.isStriked = false;
    newSubTask.checkId = iconSpan.id;
    newSubTask.subTaskName = newTask.value;
    newSubTask.steps = stepsList;
    newSubTask.status = true;
    newDiv.appendChild(taskSpan);
    subTaskList.appendChild(newDiv);
    subTaskInfo = taskSelected.subTask;
    subTaskInfo.push(newSubTask);
    makeInputEmpty("new-task");
    activeSubTask = newSubTask;
    newTask.focus();
}

/**
 * Used to strike the subtask if that task is finished.
 */
function strikeSubTask() {
    let checkId = event.target.id;
    let selectedSubTask = getSubTaskByCheckId(checkId);
    let imageSpan = getElementById(selectedSubTask.id).getElementsByTagName("span")[0];
    let subTask = getElementById(selectedSubTask.id).getElementsByTagName("span")[1];
    let strikedName = subTask.innerHTML.strike();
    let isStriked = getIsStriked(selectedSubTask);
    if (true == isStriked) {
        imageSpan.setAttribute("class", "strike-image");
        subTask.innerHTML = strikedName;
        changeSubTaskInRight(true);
    } else {
        imageSpan.setAttribute("class", "strike");
        subTask.innerHTML = selectedSubTask.subTaskName;
        changeSubTaskInRight(false);
    }
}

/**
 * Used to get the subtask information by checkid if it presents.
 * 
 * @param {*} checkId used to get the subtask information if present.
 */
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

/**
 * Used to strike the subtask in the present in the right div.
 * 
 * @param {*} isStriked contains information about the task is finished or not. 
 */
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

/**
 * Used to change isStriked value if value is true then makes it false ans vice-versa.
 * 
 * @param {*} selectedSubTask contains the subtask information and used to store isStriked value.
 */
function getIsStriked(selectedSubTask) {
    if (false == selectedSubTask.isStriked) {
        selectedSubTask.isStriked = true;
        return true;
    } else {
        selectedSubTask.isStriked = false;
        return false;
    }
}

/**
 * Used to add the new step into the active subtask. 
 */
function addNewStep() {
    let notes = getElementById("add-note-content");
    let step = getElementById("new-step");
    let stepInfo = [];
    let steps = activeSubTask.steps
    let newDiv = retrieveCreatedElement("div");
    let newSpan = retrieveCreatedElement("span");
    let iconSpan = retrieveCreatedElement("span");
    let steplist = getElementById("steps-list");
    stepInfo.stepName = step.value;
    activeSubTask.notes = notes.innerHTML;
    newSpan.id = getId();
    iconSpan.id = getId();
    addEventListeners(iconSpan, "click", strikeStep);
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

/**
 * Used to display the subTaskinformation in the right div.
 */
function displaySubTaskInfo() {
    var selectedTask;
    let subTaskId = event.target.id;
    let right = getElementById("right-column");
    for (let i in tasks) {
        var subtask = tasks[i].subTask;
        for (let j in subtask) {
            if (subTaskId == subtask[j].nameId) {
                activeTask = tasks[i];
                activeSubTask = subtask[j];
            }
        }
    }
    isRightColOpen = true;
    right.style.display = "block";
    right.style.transition = "0.3s";
    displayExistingSteps();
    makeInputEmpty("new-step");
}

/**
 * Used to display existing step in the subtask seleted.
 */
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

/**
 * Used to display current step inforamtion. 
 * @param {*} step contains the current step inforamtion.
 * @param {*} index contains the index value of current step.
 */
function displaySteps(step, index) {
    let steplist = getElementById("steps-list");
    let newDiv = retrieveCreatedElement("div");
    let taskSpan = retrieveCreatedElement("span");
    let iconSpan = retrieveCreatedElement("span");
    iconSpan.id = step.checkId;
    newDiv.id = step.id;
    taskSpan.id = step.nameId;
    addEventListeners(iconSpan, "click", strikeStep);
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
    newDiv.append(taskSpan);
    steplist.appendChild(newDiv);
}

/**
 * Used to strike the step if step is finished and vice versa..
 */
function strikeStep() {
    let id = event.target.id; 
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

/**
 * Used to get current step with help of checkId.
 * 
 * @param {*} id contains id the current step icon.
 */
function getCurrentStep(id) {
    let steps = activeSubTask.steps;
    for (let i in steps) {
        if(id == steps[i].checkId) {
            return steps[i]; 
        }
    }
}

/**
 * Used to get information about the step is striked or not.
 * 
 * @param {*} currentStep contains the inforamtion about current step.
 */
function getIsStepStriked(currentStep) {
    if (false == currentStep.isStriked) {
        currentStep.isStriked = true;
        return true;
    } else {
        currentStep.isStriked = false;
        return false;
    }
}

/**
 * Used to check the name of task already exists or not, 
 * if exists it appends number of the copies present.
 * 
 * @param {*} name contains the name of task to be checked.
 */
function checkTaskName(name) {
    let size;
    var list = tasks.filter(function(task) {
        if(task.taskName.includes("(")) {
            return name === task.taskName.slice(0, task.taskName.indexOf("("));
        } else {
           return task.taskName == name;
        }
    });
    size = list.length;
    if(0 == size) {
        return name;
    } else {
        return (name+"&nbsp;("+size+")");
    }
}
