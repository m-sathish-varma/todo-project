import { Component, OnInit, Input} from '@angular/core';
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
  isToggled = false;
  constructor() {
  }

  ngOnInit() {
    const taskInfo: taskType = {taskName: 'Tasks', subTasks: []};
    tasks.push(taskInfo);
    this.middleContent.currentTask = taskInfo;
  }

  /**
   * Used to toggle the left side menu bar.
   */
  toggleLeftmenu(): void {
    this.isToggled = !this.isToggled;
    console.log(tasks);
  }

  /**
   * Used to toggle the left menuBar by the plus button on the left side.
   *
   */
  toggleLeftDivByPlus(): void {
    this.toggleLeftmenu();
  }

  /**
   * Used to add the task information into the global object created.
   *
   * @param input contains the name of the task.
   */
  addTask(input): void {
    if ('' !== input.value.trim()) {
      const taskname: string = input.value;
      const task = {taskName: this.checkTaskName(taskname), subTasks: []};
      tasks.push(task);
      input.value = '';
      this.middleContent.displayTaskname(task);
      this.rightSide.isToggled = false;
    } else {
      input.value = '';
      input.focus();
    }
  }

  /**
   * Used to display task information.
   *
   * @param task contains the task information to be displayed.
   */
  displayTaskInfo(task): void {
    this.middleContent.displayTaskname(task);
  }

  /**
   * Used to get random generated id.
   */
  getId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  /**
   * Used to check the name of task already exists or not,
   * if exists it appends number of the copies present.
   *
   * @param name contains the name of task to be checked.
   */
  checkTaskName(name): string {
    let count = 0;
    const list = tasks.filter((task) => {
        if (task.taskName.includes('(')) {
            count++;
            return name === task.taskName.slice(0, task.taskName.indexOf('('));
        } else {
            return task.taskName === name;
        }
    });
    const size = list.length;
    if (0 === size) {
        return name.trim();
    } else {
        return (name + '(' + (count * 1 + 1) + ')');
    }
  }

  /**
   * Used  to get the task count to display to the user.
   *
   * @param item contains the task information used to get the count.
   */
  getTaskCount(item): number {
    const taskCount: number = item.subTasks.filter(subTask => !subTask.isStriked).length;
    return taskCount ? taskCount : null;
  }
}
