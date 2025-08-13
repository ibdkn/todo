import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {todolistActions} from './todolist.actions';
import {concatMap, map, of, switchMap} from 'rxjs';
import {TodolistService} from '../services';

@Injectable({
  providedIn: 'root'
})
export class TodolistEffects {
  todolistService: TodolistService = inject(TodolistService);
  actions$ = inject(Actions);

  getTodolists = createEffect(() => {
    return this.actions$.pipe(
      ofType(todolistActions.loadTodolists),
      switchMap(() => {
          return this.todolistService.getTodolists().pipe(
            map(todolists => todolistActions.todolistsLoaded({todolists}))
          );
        }
      )
    )
  });
  deleteTodolist = createEffect(() => {
    return this.actions$.pipe(
      ofType(todolistActions.deleteTodolist),
      concatMap(({ todolistId }) =>
        this.todolistService.deleteTodolist(todolistId).pipe(
          map(() => todolistActions.todolistDeleted({ todolistId })),
        )
      )
    )
  });
  createTodolist = createEffect(() => {
    return this.actions$.pipe(
      ofType(todolistActions.createTodolist),
      concatMap(({ title }) =>
        this.todolistService.createTodolist({ title }).pipe(
          map(todolist => todolistActions.todolistCreated({ todolist })),
        )
      )
    )
  });
  updateTodolist = createEffect(() => {
    return this.actions$.pipe(
      ofType(todolistActions.updateTodolist),
      concatMap(({ todolistId, title }) =>
        this.todolistService.updateTodolist(todolistId, { title }).pipe(
          map(todolist => todolistActions.todolistUpdated({ todolist })),
        )
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
