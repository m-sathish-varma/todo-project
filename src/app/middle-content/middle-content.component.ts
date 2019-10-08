import { Component, OnInit, Input } from '@angular/core';
import { tasks } from '../tasks';

@Component({
  selector: 'app-middle-content',
  templateUrl: './middle-content.component.html',
  styleUrls: ['./middle-content.component.scss']
})
export class MiddleContentComponent implements OnInit {
  
  @Input() rightSide;

  currentTask = {};
  isClicked:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  displayTaskname(task):void{
    this.currentTask = task;
    this.rightSide.isToggled = false;
  }

  addSubTask(input):void {
    if("" !== input.value.trim()) {
      let name = input.value;
      let subTaskInfo = {subTaskName:name, isStriked:false, steps:[]};
      this.currentTask.subTasks.push(subTaskInfo);
      input.value = "";
    } else {
        input.value = "";
        input.focus();
    }
  }
  
  strikeSubTask(subTask):void {
    subTask.isStriked = !subTask.isStriked;
  }

  displaySubTask(subTask):void {
    this.isClicked = !this.isClicked;
    this.rightSide.isToggled = true;
    this.rightSide.displaySubTaskInfo(subTask);
  }

  getStepCount(subTask):number {
    let stepCount:number = subTask.steps.filter(step => step.isStriked).length;
    return stepCount;
  }

  deleteTask():void {
    let index;
    if (confirm("Do you want to delete Task?")){
      if (tasks.indexOf(this.currentTask) === 0) {
        index = 0;
      } else {
        index = 1;
      }
      tasks.splice(tasks.indexOf(this.currentTask), 1);
      this.currentTask = tasks[index];
    }
  }
}
