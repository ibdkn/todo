export interface Task {
  todolistId: number;
  id: number;
  title: string;
  isDone: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type TasksState = Record<number, Task[]>;

export interface CreateTaskDto {
  todolistId: number;
  title: string;
}

export interface UpdateTaskDto {
  todolistId: number;
  title?: string;
  isDone?: boolean;
}

export interface DeleteTaskDto {
  todolistId: number;
  taskId: number;
}
