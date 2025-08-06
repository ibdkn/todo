import {inject, Injectable} from '@angular/core';
import {Todolist} from '../interfaces/todolist.interface';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {todolistActions} from './todolist.actions';
import {of, switchMap} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

const initialTodolists: Todolist[] = [
  {id: 'todolist-1', title: 'What to buy', filter: 'all'},
  {id: 'todolist-2', title: 'What to learn', filter: 'all'},
];

@Injectable({
  providedIn: 'root'
})
export class TodolistEffects {
  // todolistService =
  actions$ = inject(Actions);

  getTodolists = createEffect(() => {
    return this.actions$.pipe(
      ofType(todolistActions.loadTodolists),
      switchMap(() =>
        of(todolistActions.todolistsLoaded({todolists: initialTodolists}))
      )
    )
  });
  deleteTodolist = createEffect(() => {
    return this.actions$.pipe(
      ofType(todolistActions.deleteTodolist),
      switchMap(({todolistId}) =>
        of(todolistActions.todolistDeleted({todolistId}))
      )
    )
  });
  createTodolist = createEffect(() => {
    return this.actions$.pipe(
      ofType(todolistActions.createTodolist),
      switchMap(({ title }) => {
        const todolist: Todolist = { id: uuidv4(), title, filter: 'all' };
        return of(todolistActions.todolistCreated({ todolist }));
      })
    )
  });
  updateTodolist = createEffect(() => {
    return this.actions$.pipe(
      ofType(todolistActions.updateTodolist),
      switchMap(({ todolistId, title }) =>
        of(todolistActions.todolistUpdated({ todolistId, title }))
      )
    )
  });
  filterTodolist = createEffect(() => {
    return this.actions$.pipe(
      ofType(todolistActions.filterTodolist),
      switchMap(({ todolistId, filter }) =>
        of(todolistActions.todolistFiltered({ todolistId, filter }))
      )
    )
  })
}
