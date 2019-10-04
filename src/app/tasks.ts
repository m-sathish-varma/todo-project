export type taskType = Array<{taskName:string, status:boolean, subTasks:Array<subTask>}>;
export type subTask = Array<{subTaskName:string, status:boolean, isStriked:boolean, steps:Array<step>}>;
export type step = Array<{stepName:string, status:boolean, isStriked:boolean}>;
export const tasks:Array<taskType> = [];