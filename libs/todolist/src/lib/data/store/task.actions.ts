import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Task, TasksState} from '../interfaces/task.interface';

export const taskActions = createActionGroup({
  source: 'task',
  events: {
    'load tasks': emptyProps(),
    'tasks loaded': props<{ tasks: TasksState }>(),
    'create task': props<{ todolistId: string, title: string }>(),
    'task created': props<{ todolistId: string; task: Task }>(),
    'update task title': props<{ todolistId: string, taskId: string; title: string }>(),
    'task title updated': props<{ todolistId: string; taskId: string; title: string }>(),
    'change task status': props<{ todolistId: string; taskId: string; isDone: boolean }>(),
    'task status changed': props<{ todolistId: string; taskId: string; isDone: boolean }>(),
    'delete task': props<{ todolistId: string; taskId: string }>(),
    'task deleted': props<{ todolistId: string; taskId: string }>(),
  }
})
