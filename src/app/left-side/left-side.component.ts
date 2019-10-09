import { Component, OnInit, Input, HostListener} from '@angular/core';
import {tasks, taskType} from '../tasks';
@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.scss']
})

export class LeftSideComponent implements OnInit {

  @Input() middleContent;

  @Input() rightSide;

  tasks = tasks;
  isToggled:boolean = false;
  constructor() {
  }

  ngOnInit() {
    let taskInfo:taskType = {taskName:"Task", subTasks:[]};
    tasks.push(taskInfo);
    this.middleContent.currentTask = taskInfo;
  }

  /**
   * Used to toggle the left side menu bar.
   */
  toggleLeftmenu():void {
    this.isToggled = !this.isToggled;
    console.log(tasks);
  }

  /**
   * Used to toggle the left menuBar by the plus button on the left side.
   */
  toggleLeftDivByPlus():void {
    this.toggleLeftmenu();
  }

  /**
   * Used to add the task information into the global object created.
   * 
   * @param input contains the name of the task.
   */
  addTask(input):void {
    if("" !== input.value.trim()) {
      let taskname:string = input.value;
      let task = {taskName:this.checkTaskName(taskname), subTasks:[]};
      tasks.push(task);
      input.value = "";
      this.middleContent.displayTaskname(task);
      this.rightSide.isToggled = false;
    } else {
      input.value = "";
      input.focus();
    }
  }

  /**
   * Used to display task information.
   * 
   * @param task contains the task information to be displayed.
   */
  displayTaskInfo(task):void {
    this.middleContent.displayTaskname(task);
  }

  /**
   * Used to get random generated id.
   */
  getId():string {
    return Math.random().toString(36).substr(2, 9);
  }

  /**
   * Used to check the name of task already exists or not, 
   * if exists it appends number of the copies present.
   * 
   * @param {*} name contains the name of task to be checked.
   */
  checkTaskName(name):string {
    let count:number = 0;
    var list = tasks.filter(function(task) {
        if(task.taskName.includes("(")) {
            count++;
            return name === task.taskName.slice(0, task.taskName.indexOf("("));
        } else {
            return task.taskName == name;
        }
    });
    let size = list.length;
    if(0 == size) {
        return name.trim();
    } else {
        return (name+" ("+(count * 1 + 1) +")");
    }
  }

  getTaskCount(item):number {
    let taskCount:number = item.subTasks.filter(subTask => !subTask.isStriked).length;
    return taskCount ? taskCount : null;
  }
}
