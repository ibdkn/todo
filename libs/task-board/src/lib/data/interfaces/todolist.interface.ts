export interface Todolist {
  id: number;
  userId: number;
  title: string;
  position: number,
  createdAt: string;
  updatedAt: string;
  filter: FilterValues;
}

export interface CreateTodolistDto {
  title: string;
}

export interface UpdateTodolistDto {
  title: string;
}

export type FilterValues = 'all' | 'active' | 'completed';
