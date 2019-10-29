export interface TaskType {
    taskName: string;
    subTasks: Array<SubTask>;
}

export interface SubTask {
    subTaskName: string;
    isStriked: boolean;
    steps: Array<Step>;
}

export interface Step {
    stepName: string;
    isStriked: boolean;
}

export const currentTask: TaskType = {taskName: '', subTasks: []};

export const currentSubTask: SubTask = {subTaskName: '', isStriked: false, steps: []};

export const tasks: Array<TaskType> = [];
