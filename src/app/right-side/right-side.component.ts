import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrls: ['./right-side.component.scss']
})
export class RightSideComponent implements OnInit {

  @Input() middleContent;

  isToggled:boolean;
  currentSubTask = [];
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
    let name = input.value;
    let step = {stepName:name, status:true, isStriked:false};
    this.currentSubTask.steps.push(step);
    input.value = "";
  }

  strikeStep(step):void{
    step.isStriked = !step.isStriked;
  }

  closeSubTaskInfo():void {
    this.isToggled = false;
  }

  deleteSubTask():void{
    if (confirm("Do you want to delete subTask?")){
      this.currentSubTask.status = false;
    }
  }

  deleteStep(step):void {
    if (confirm("Do you want to delete step?")){
      step.status = false;
    }
  }
}
