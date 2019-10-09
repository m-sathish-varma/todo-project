import { Component, OnInit, Input } from '@angular/core';
import { tasks, subTask} from '../tasks';


@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrls: ['./right-side.component.scss']
})
export class RightSideComponent implements OnInit {

  @Input() middleContent;

  isToggled:boolean;
  currentSubTask:subTask;
  constructor() { }

  ngOnInit() {
  }
  
  strikeSubTask():void {
    this.middleContent.strikeSubTask(this.currentSubTask);
  }

  displaySubTaskInfo(subTask):void{
    this.currentSubTask = subTask;
  }

  addStep(input):void {
    if("" !== input.value.trim()) {
      let name = input.value;
      let step = {stepName:name, isStriked:false};
      this.currentSubTask.steps.push(step);
      input.value = "";
    } else {
        input.value = "";
        input.focus();
    }
  }

  strikeStep(step):void{
    step.isStriked = !step.isStriked;
  }

  closeSubTaskInfo():void {
    this.isToggled = false;
  }

  updateSubTaskName(updatedName):void {
    let name;
    if("" !== updatedName.value.trim()) {
      name = updatedName.value;
      this.currentSubTask.subTaskName = name; 
    } else {
      updatedName.value = this.currentSubTask.subTaskName;
    }
    updatedName.blur();
  }

  deleteSubTask():void{
    if (confirm("Do you want to delete subTask?")){
      console.log(tasks);
      this.middleContent.currentTask.subTasks.splice(this.middleContent.currentTask.subTasks.indexOf(this.currentSubTask),1);
      this.isToggled = false;
    }
  }

  deleteStep(step):void {
    if (confirm("Do you want to delete step?")){
      this.currentSubTask.steps.splice(this.currentSubTask.steps.indexOf(step), 1);
    }
  }
}
