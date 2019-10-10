import { Component, OnInit, Input } from '@angular/core';
import { tasks, taskType } from '../tasks';

@Component({
  selector: 'app-middle-content',
  templateUrl: './middle-content.component.html',
  styleUrls: ['./middle-content.component.scss']
})
export class MiddleContentComponent implements OnInit {
  @Input() rightSide;

  currentTask: taskType;
  isClicked = false;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Used to display the task information into the middle div.
   *
   * @param task contains the information to be displayed.
   */
  displayTaskname(task): void {
    this.currentTask = task;
    this.rightSide.isToggled = false;
  }

  /**
   * Used to add subtask information into the main task.
   *
   * @param input contains the name of the subtask.
   */
  addSubTask(input): void {
    if ('' !== input.value.trim()) {
      const name = input.value;
      const subTaskInfo = {subTaskName: name, isStriked: false, steps: []};
      this.currentTask.subTasks.push(subTaskInfo);
      input.value = '';
    } else {
        input.value = '';
        input.focus();
    }
  }

  /**
   * Used to strike the subtask if the subtask is finished.
   *
   * @param subTask contains the subtask to be striked.
   */
  strikeSubTask(subTask): void {
    subTask.isStriked = !subTask.isStriked;
  }

  /**
   * Used to display the subtask information in the right content.
   *
   * @param subTask contains the subtask information to be displayed.
   */
  displaySubTask(subTask): void {
    this.isClicked = !this.isClicked;
    this.rightSide.isToggled = true;
    this.rightSide.displaySubTaskInfo(subTask);
  }

  /**
   * Used to get the count of the steps in the subtask.
   *
   * @param subTask contains the subtask inforamtion used to get the step count.
   */
  getStepCount(subTask): number {
    const stepCount: number = subTask.steps.filter(step => step.isStriked).length;
    return stepCount;
  }

  /**
   * Used to update the task name if user changed the name of the task.
   *
   * @param taskName contains the updated name information.
   */
  updateTaskName(taskName): void {
    let name;
    if ('' !== taskName.value.trim() && 'Task' !== this.currentTask.taskName) {
      name = taskName.value;
      this.currentTask.taskName = name;
    } else {
      taskName.value = this.currentTask.taskName;
    }
    taskName.blur();
  }

  /**
   * Used to delete the task information from the main task object.
   */
  deleteTask(): void {
    let index = tasks.indexOf(this.currentTask);
    if (confirm('Do you want to delete Task?')) {
      tasks.splice(index, 1);
      if (index !== 0) {
        index = index - 1;
      }
      this.currentTask = tasks[index];
    }
  }
}
