export type taskType = {taskName: string, subTasks: Array<subTask>};
export type subTask = {subTaskName: string, isStriked: boolean, steps: Array<step>};
export type step = {stepName: string, isStriked: boolean};
export const tasks: Array<taskType> = [];
