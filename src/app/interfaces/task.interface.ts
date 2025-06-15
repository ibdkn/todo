export interface Task {
  id: number
  title: string
  isDone: boolean
}

export type TaskStatus =  'all' | 'active' | 'completed';
