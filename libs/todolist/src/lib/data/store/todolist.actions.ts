import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {FilterValues, Todolist} from '@todo/todolist';

export const todolistActions = createActionGroup({
  source: 'todolist',
  events: {
    'load todolists': emptyProps(),
    'todolists loaded': props<{ todolists: Todolist[] }>(),
    'delete todolist': props<{ todolistId: string }>(),
    'todolist deleted': props<{ todolistId: string }>(),
    'create todolist': props<{ title: string }>(),
    'todolist created': props<{ todolist: Todolist }>(),
    'update todolist': props<{ todolistId: string, title: string }>(),
    'todolist updated': props<{ todolistId: string, title: string }>(),
    'filter todolist': props<{ todolistId: string, filter: FilterValues }>(),
    'todolist filtered': props<{ todolistId: string, filter: FilterValues }>(),
  }
})
