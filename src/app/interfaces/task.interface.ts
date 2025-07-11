export interface Task {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = {
  [todolistId: string]: Task[]
}
