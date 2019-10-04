import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-middle-content',
  templateUrl: './middle-content.component.html',
  styleUrls: ['./middle-content.component.scss']
})
export class MiddleContentComponent implements OnInit {
  
  @Input() rightSide;

  currentTask = [];
  isClicked:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  displayTaskname(task):void{
    this.currentTask = task;
  }

  addSubTask(input):void {
    let name = input.value;
    let subTaskInfo = {subTaskName:name, status:true, isStriked:false, steps:[]};
    this.currentTask.subTasks.push(subTaskInfo);
    input.value = "";
  }
  
  strikeSubTask(subTask):void {
    subTask.isStriked = !subTask.isStriked;
  }

  displaySubTask(subTask):void {
    this.isClicked = !this.isClicked;
    let isClicked = this.isClicked;
    this.rightSide.isToggled = true;
    this.rightSide.displaySubTaskInfo(subTask);
  }

  deleteTask():void {
    if (confirm("Do you want to delete Task?")){
      this.currentTask.status = false;
    }
  }
}
