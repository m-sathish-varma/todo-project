import { Component, OnInit} from '@angular/core';
import {tasks} from '../tasks';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.scss']
})

export class LeftSideComponent implements OnInit {
  tasks = tasks;
  isToggled:boolean = false;
  constructor() {
  }

  ngOnInit() {
  }

  toggleLeftmenu():void {
    this.isToggled = !this.isToggled;
  }

  toggleLeftDivByPlus():void {
    this.toggleLeftmenu();
  }

  addTask(input):void {
    if("" !== input.value.trim()) {
      let taskname = input.value;
      let task = [{taskName:this.checkTaskName(taskname), status:true}];
      tasks.push(task[0]);
      input.value = "";
    } else {
      input.value = "";
      input.focus();
    }
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
    console.log(tasks);
    let count:number = 0;
    var list = tasks.filter(function(task) {
        if(task.taskName.includes("(")) {
            count++;
            return name === task.taskName.slice(0, task.taskName.indexOf("("));
        } else {
            return task.taskName == name;
        }
    });
    console.log(count);
    let size = list.length;
    if(0 == size) {
        return name.trim();
    } else {
        return (name+" ("+(count * 1 + 1) +")");
    }
  }
}
