import { Component, OnInit, Input } from '@angular/core';
import { tasks, SubTask } from '../tasks';


@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrls: ['./right-side.component.scss']
})
export class RightSideComponent implements OnInit {

  @Input() middleContent;

  isToggled: boolean;
  currentSubTask: SubTask;
  constructor() { }

  ngOnInit() {
  }

  /**
   * Used to strike the sub task if it is finished.
   */
  strikeSubTask(): void {
    this.middleContent.strikeSubTask(this.currentSubTask);
  }

  /**
   * Used to display the subtask information on the right side.
   *
   * @param subTaskInfo contains the subtask information to be displayed.
   */
  displaySubTaskInfo(subTaskInfo): void {
    this.currentSubTask = subTaskInfo;
  }

  /**
   * Used to add the step information into the subtask.
   *
   * @param input contains the name of the step.
   */
  addStep(input): void {
    if ('' !== input.value.trim()) {
      const name = input.value;
      const step = { stepName: name, isStriked: false };
      this.currentSubTask.steps.push(step);
      input.value = '';
    } else {
      input.value = '';
      input.focus();
    }
  }

  /**
   * Used to strike the step if it is finished.
   *
   * @param step contains the step information to be striked.
   */
  strikeStep(step): void {
    step.isStriked = !step.isStriked;
  }

  /**
   * Used to close the right div if the close button is pressed.
   */
  closeSubTaskInfo(): void {
    this.isToggled = false;
  }

  /**
   * Used to update the subtask name.
   *
   * @param updatedName contains the updated subtask name.
   */
  updateSubTaskName(updatedName): void {
    let name;
    if ('' !== updatedName.value.trim()) {
      name = updatedName.value;
      this.currentSubTask.subTaskName = name;
    } else {
      updatedName.value = this.currentSubTask.subTaskName;
    }
    updatedName.blur();
  }

  /**
   * Used to delete the current subtask information.
   */
  deleteSubTask(): void {
    if (confirm('Do you want to delete subTask?')) {
      console.log(tasks);
      this.middleContent.currentTask.subTasks.splice(this.middleContent.currentTask.subTasks.indexOf(this.currentSubTask), 1);
      this.isToggled = false;
    }
  }

  /**
   * Used to delete the step information from the subtask.
   *
   * @param step contains the step information to be deleted.
   */
  deleteStep(step): void {
    if (confirm('Do you want to delete step?')) {
      this.currentSubTask.steps.splice(this.currentSubTask.steps.indexOf(step), 1);
    }
  }
}
