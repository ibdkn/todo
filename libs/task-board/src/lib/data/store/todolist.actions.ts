import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {FilterValues, Todolist} from '../interfaces/todolist.interface';

export const todolistActions = createActionGroup({
  source: 'todolist',
  events: {
    'load todolists': emptyProps(),
    'todolists loaded': props<{ todolists: Todolist[] }>(),
    'delete todolist': props<{ todolistId: number }>(),
    'todolist deleted': props<{ todolistId: number }>(),
    'create todolist': props<{ title: string }>(),
    'todolist created': props<{ todolist: Todolist }>(),
    'update todolist': props<{ todolistId: number, title: string }>(),
    'todolist updated': props<{ todolist: Todolist }>(),
    'filter todolist': props<{ todolistId: number, filter: FilterValues }>(),
    'todolist filtered': props<{ todolistId: number; filter: FilterValues }>()
  }
})
