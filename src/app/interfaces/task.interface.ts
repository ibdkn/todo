export interface Task {
  id: string
  title: string
  isDone: boolean
}

export type TaskStatus =  'all' | 'active' | 'completed';
