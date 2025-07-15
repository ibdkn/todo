export interface Todolist {
  id: string;
  title: string;
  filter: FilterValues;
}

export type FilterValues = 'all' | 'active' | 'completed';
