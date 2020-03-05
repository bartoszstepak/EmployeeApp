export class MyTask{
    id: number;
    title: string;
    content: string;
    status: TaskStatusValues;
    createdBy: number;
    assignedTo: number;
}

export enum TaskStatusNames{ 
    NEW = "NEW",
    ASSIGNED = "ASSIGNED",
    DONE = "DONE",
    ENDED = "ENDED"   
}

export enum TaskStatusValues{
    NEW = 3,
    ASSIGNED = 2,
    DONE = 1,
    ENDED = 0   
}
