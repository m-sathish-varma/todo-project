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

export const tasks: Array<TaskType> = [];
