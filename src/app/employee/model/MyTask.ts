export class MyTask{
    id: number;
    title: string;
    content: string;
    status: TaskStatusValues;
    createdBy: number;
    assignedTo: number;
}

export enum TaskStatus{
    NEW = "NEW",
    ASSIGNED = "ASSIGNED",
    DONE = "DONE",
    ENDED = "ENDED"   
}

export enum TaskStatusValues{
    NEW = 1,
    ASSIGNED = 2,
    DONE = 3,
    ENDED = 4   
}
