"use strict";
init();

var tasks = [];
var activeTask = [];
var activeSubTask = [];
var isRightColOpen;
let activeSubTaskIndex;

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
    addEventListeners(getElementById("dot-icon"), "click", deleteTask);
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
    element.bind(selectedEvent, resultOperation);
}

/**
 * Used to toggle the left div if click event is triggered.
 */
function toggleLeftDiv() {
    if ($("#option-value").val() === "openMenu") {
        $(".left-column").removeClass("close-left-column-style");
        $(".left-column").addClass("open-left-column-style");
        $(".middle-column").addClass("close-middle-column-style");
        $("#option-value").val("closeMenu");
        $(".menu-name").toggle();
    } else {
        $(".left-column").removeClass("open-left-column-style");
        $(".left-column").addClass("close-left-column-style");
        $(".middle-column").addClass("open-middle-column-style");
        $("#option-value").val("openMenu");
        $(".menu-name").toggle();
    }
}

/**
 * Used to close the right div if the close icon is triggered by the click event.
 */
function closeRightDiv() {
    $(".right-column").removeClass("display-right-col-style");
    $(".right-column").addClass("remove-right-col-style");
    isRightColOpen = false;
}

/** */
function deleteTask() {
    let tasksList = getElementById("created-list");
    let confirmToDelete = confirm("Do you want to delete the task?");
    let count = 0;
    tasksList.html("");
    if (true == confirmToDelete) {
        activeTask.status = false;
        $.each(tasks, function (index, value) {
            displayTaskInformation(index, value);
            count = (count *1) + 1;
            if (true === value.status) {
                if (1 === count) {
                    displayTaskInfo(value.id);
                    displayTaskName(value.taskName);
                }
            }
        });
    }
}

function displayTaskInformation(index, value) {
    let tasksList = getElementById("created-list");
    let newDiv = retrieveCreatedElement('div');
    let newSpan = retrieveCreatedElement('span');
    let iconSpan = retrieveCreatedElement('span');
    if (true == value.status) {
        newDiv.attr("class", "new-list");
        iconSpan.attr("id", "list-icon");
        iconSpan.appendTo(newDiv);
        newSpan.attr("class","menu-name");
        newDiv.attr("id", value.id);
        newSpan.attr("id", "new-task-style");
        newSpan.html(value.taskName);
        newSpan.appendTo(newDiv);
        newDiv.bind("click", function() {
            var taskName = $("#task-name");
            taskName.html(newSpan.text());
            displayTaskInfo(this.id);
        });
        newDiv.appendTo(tasksList);
    }
}

/**
 * Used to delete sub task if the delete icon is pressed.
 */
function deleteSubTask() {
    $(".right-column").removeClass("display-right-col-style");
    $(".right-column").addClass("remove-right-col-style");
    isRightColOpen = false;
    let subTasks = [];
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
    $(".left-column").removeClass("close-left-column-style");
    $(".left-column").addClass("open-left-column-style");
    $(".middle-column").addClass("close-middle-column-style");
    $("#option-value").val("closeMenu");
    $(".menu-name").show();
    $(".new-list").focus();
}

/**
 * Used to add the new task if event is triggered in the new list input text box.
 * 
 * @param {*} event used to get the event keycode.
 */
function addNewTask(event){
    let inputValue = $("#new-list");
    if (event.keyCode === 13 && "" !== $.trim(inputValue.val())) {
        if(0 === inputValue.val().length) {
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
    let inputValue = $("#new-task");
    if (13 === event.keyCode && "" !== $.trim(inputValue.val())
    ) {
        if(0 == inputValue.val().length) {
            makeInputEmpty("new-task");
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
    makeInputEmpty("new-task");
    $("new-task").focus();
}

/**
 * Used to add new step information if enter key is pressed in the new-step input textbox.
 * 
 * @param {*} event used to get event keycode. 
 */
function addNewStepInfo(event) {
    let inputValue = $("#new-step");
    if (13 === event.keyCode) {
        if(0 === inputValue.val().length || "" === $.trim(inputValue.val())) {
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
    input.val("");
    input.focus();
}

/**
 * Used to get the element by the help of the className. 
 * 
 * @param {*} className denotes the className of the element to be fetched.
 */
function getElementByClassName(className) {
    return $("." + id);
}

/**
 * Used to get the element by the help of the id. 
 * 
 * @param {*} id denotes the id of the element to be fetched.
 */
function getElementById(id) {
    return $("#" + id);
}

/**
 * Used to get created element.
 * @param {*} element denotes type of element to be created.
 */
function retrieveCreatedElement(element) {
    return $(document.createElement(element));
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
            taskName.text(activeSubTask.subTaskName);
            taskName.focus();
        } else {
            activeSubTask.subTaskName = taskName.html();
            let subTask = getElementById(activeSubTask.id).find("#" + activeSubTask.nameId);
            subTask.html("");
            subTask.attr("class", "taskspan-style");
            subTask.text(activeSubTask.subTaskName);
        }
    }
}

/**
 * Used to add new task into the object.
 * @param {*} inputValue contains the name of the task.
 */
function addNewList(inputValue) {
    let tasksInformation = new Array();
    let sideMenuContent = getElementById("created-list");
    var newDiv = retrieveCreatedElement('div');
    let newSpan = retrieveCreatedElement('span');
    let iconSpan = retrieveCreatedElement('span');
    isRightColOpen = false;
    $(".right-column").removeClass("display-right-col-style");
    $("right-column").addClass("remove-right-col-style");
    newDiv.attr("class", "new-list");
    iconSpan.attr("id", "list-icon");
    iconSpan.appendTo(newDiv);
    newSpan.attr("class","menu-name");
    newDiv.attr("id", getId());
    tasksInformation.id = newDiv.attr("id");
    tasksInformation.subTask = new Array;
    tasksInformation.status = true;
    newSpan.attr("id", "new-task-style");
    newSpan.html(checkTaskName(inputValue.val()));
    tasksInformation.taskName = newSpan.text();
    newSpan.appendTo(newDiv);
    newDiv.bind("click", function() {
        var taskName = $("#task-name");
        taskName.html(newSpan.text());
        displayTaskInfo(this.id);
    });
    newDiv.appendTo(sideMenuContent);
    displayTaskName(newSpan.html());
    inputValue.val("");
    activeTask = tasksInformation;
    tasks.push(tasksInformation);
}

/**
 * used to display the taskname in the middle column tomake it active to add subtasks.
 *  
 * @param {*} inputValue  contains the name of the task.
 */
function displayTaskName(inputValue) {
    $("#sub-task-list").html("");
    makeInputEmpty("new-task");
    $("#task-name").html(inputValue);
}

/**
 * Used to display the task information if the task contained div is clicked. 
 * @param {*} idValue contains the id of the selected task.
 */
function displayTaskInfo(idValue) {
    let taskSelected = tasks.find(function(event) {
        return event.id == idValue;
    });
    console.log(taskSelected);
    isRightColOpen = false;
    $(".right-column").removeClass("display-right-col-style");
    $("#right-column").addClass("remove-right-col-style");
    $("#sub-task-list").html("");
    let subTaskInfo = taskSelected.subTask;
    subTaskInfo.forEach(displaySubTask);
}

/**
 * Used to add task into containing div.
 * 
 * @param {*} subTask contains the subtask information of the current task.
 * @param {*} index contains the index value of the current task.
 */
function displaySubTask(subTask, index) {
    let subTaskList = $("#sub-task-list");
    let newDiv = $(document.createElement('div'));
    let taskSpan = $(document.createElement('span'));
    let iconSpan = $(document.createElement('span'));
    if (true == subTask.status) {
        if (true == subTask.isStriked) {
            iconSpan.attr("class", "strike-image");
            taskSpan.html(subTask.subTaskName.strike());
        } else {
            iconSpan.attr("class", "strike");
            taskSpan.text(subTask.subTaskName);
        }
        iconSpan.attr("id",subTask.checkId);
        addEventListeners(iconSpan, "click", strikeSubTask);
        iconSpan.appendTo(newDiv);
        taskSpan.attr("class", "taskspan-style");
        newDiv.attr("class", "new-task");
        newDiv.id = subTask.id;
        taskSpan.appendTo(newDiv);
        taskSpan.attr("id", subTask.nameId);
        addEventListeners(taskSpan, "click", displaySubTaskInfo);
        newDiv.appendTo(subTaskList);
        console.log(subTask);
    }
}

/**
 * used to add new sub task information into the object and display it in the middle column.
 */
function addNewSubTask() {
    let index = getElementById("task-name");
    let taskSelected = tasks.find(function(event) {
         return event.taskName == index.html();
    });
    let subTaskInfo = taskSelected.subTask;
    let newSubTask = [];
    let newTask = getElementById("new-task");
    let newDiv = retrieveCreatedElement("div");
    let taskSpan = retrieveCreatedElement("span");
    let iconSpan = retrieveCreatedElement("span");
    let subTaskList = getElementById("sub-task-list");
    taskSpan.text(newTask.val());
    iconSpan.attr("class", "strike");
    iconSpan.attr("id", getId());
    addEventListeners(iconSpan, "click", strikeSubTask);
    iconSpan.appendTo(newDiv);
    taskSpan.attr("class", "taskspan-style");
    newDiv.attr("class", "new-task");
    newDiv.attr("id", getId());
    taskSpan.attr("id", getId());
    addEventListeners(taskSpan, "click", displaySubTaskInfo);
    newSubTask.id = newDiv.attr("id");
    newSubTask.nameId = taskSpan.attr("id"); 
    newSubTask.isStriked = false;
    newSubTask.checkId = iconSpan.attr("id");
    newSubTask.subTaskName = newTask.val();
    newSubTask.steps = new Array;
    newSubTask.status = true;
    taskSpan.appendTo(newDiv);
    newDiv.appendTo(subTaskList);
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
    let imageSpan = getElementById(selectedSubTask.id).find("#" + selectedSubTask.checkId);
    let subTask = getElementById(selectedSubTask.id).find("#" + selectedSubTask.nameId);
    let strikedName = subTask.text().strike();
    let isStriked = getIsStriked(selectedSubTask);
    if (true == isStriked) {
        imageSpan.attr("class", "strike-image");
        subTask.html(strikedName);
        changeSubTaskInRight(true);
    } else {
        imageSpan.attr("class", "strike");
        subTask.text(selectedSubTask.subTaskName);
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
 * Used to strike the subtask information present in the right div.
 * 
 * @param {*} isStriked contains information about the task is finished or not. 
 */
function changeSubTaskInRight(isStriked) {
    let subTaskImage = getElementById("sub-task").find("#Strike");
    let subTaskName = getElementById("sub-task-name");
    let subStriked = subTaskName.text().strike();
    if (true === isStriked && true === isRightColOpen) {
        subTaskImage.attr("class", "strike-image");
        subTaskName.html(subStriked);
    } else if (true === isRightColOpen) {
        subTaskImage.attr("class", "strike");
        subTaskName.text(activeSubTask.subTaskName);
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
    stepInfo.stepName = step.val();
    activeSubTask.notes = notes.text();
    newSpan.attr("id", getId());
    iconSpan.attr("id", getId());
    addEventListeners(iconSpan, "click", strikeStep);
    iconSpan.attr("class", "strike");
    iconSpan.appendTo(newDiv);
    newSpan.attr("class", "newstep-style");
    newSpan.text(step.val());
    newSpan.appendTo(newDiv);
    newDiv.attr("id", getId());
    newDiv.attr("class", "new-step");
    newDiv.appendTo(steplist);
    stepInfo.id = newDiv.attr("id");
    stepInfo.isStriked = false;
    stepInfo.checkId = iconSpan.attr("id");
    stepInfo.nameId = newSpan.attr("id");
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
                activeSubTaskIndex = j;
            }
        }
    }
    isRightColOpen = true;
    right.attr("class", "right-column display-right-col-style");
    displayExistingSteps();
    makeInputEmpty("new-step");
}

/**
 * Used to display existing step in the subtask seleted.
 */
function displayExistingSteps() {
    let subTaskName = getElementById("sub-task-name");
    let strikeImage = getElementById("sub-task").find("#strike");
    let notes = getElementById("add-note-content");
    let steplist = getElementById("steps-list");
    let steps = activeSubTask.steps;
    if (true == activeSubTask.isStriked) {
        strikeImage.attr("class", "strike-image");
        subTaskName.html(activeSubTask.subTaskName.strike());
    } else {
        strikeImage.attr("class", "strike");
        subTaskName.text(activeSubTask.subTaskName);
    }
    steplist.html("");
    if (notes.html() && notes) { 
        notes.html(activeSubTask.notes); 
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
    iconSpan.attr("id",step.checkId);
    newDiv.attr("id", step.id);
    taskSpan.attr("id", step.nameId);
    addEventListeners(iconSpan, "click", strikeStep);
    iconSpan.appendTo(newDiv);
    if (true == step.isStriked) {
        iconSpan.attr("class", "strike-image");
        taskSpan.html(step.stepName.strike());
    } else {
        iconSpan.attr("class", "strike");
        taskSpan.text(step.stepName);
    }
    taskSpan.attr("class", "taskspan-style");
    newDiv.attr("class", "new-step");
    taskSpan.appendTo(newDiv);
    newDiv.appendTo(steplist);
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
        imageSpan.attr("class", "strike-image");
        stepName.html(currentStep.stepName.strike());
    } else {
        imageSpan.attr("class", "strike");
        stepName.text(currentStep.stepName);
    }
    stepName.attr("class", "newstep-style");
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
        return name.trim();
    } else {
        return (name+"&nbsp;("+size+")");
    }
}
