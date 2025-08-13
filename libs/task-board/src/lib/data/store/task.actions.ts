import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Task, TasksState} from '../interfaces/task.interface';

export const taskActions = createActionGroup({
  source: 'task',
  events: {
    'load tasks': emptyProps(),
    'tasks loaded': props<{ tasks: TasksState }>(),
    'create task': props<{ todolistId: number, title: string }>(),
    'task created': props<{ todolistId: number; task: Task }>(),
    'update task title': props<{ todolistId: number, taskId: string; title: string }>(),
    'task title updated': props<{ todolistId: number; taskId: string; title: string }>(),
    'change task status': props<{ todolistId: number; taskId: string; isDone: boolean }>(),
    'task status changed': props<{ todolistId: number; taskId: string; isDone: boolean }>(),
    'delete task': props<{ todolistId: number; taskId: string }>(),
    'task deleted': props<{ todolistId: number; taskId: string }>(),
  }
})
