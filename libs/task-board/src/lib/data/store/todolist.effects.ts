import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {todolistActions} from './todolist.actions';
import {concatMap, map, of, switchMap, tap} from 'rxjs';
import {TodolistService} from '../services';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TodolistEffects {
  todolistService: TodolistService = inject(TodolistService);
  toastr: ToastrService = inject(ToastrService);
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
  createTodolist = createEffect(() => {
    return this.actions$.pipe(
      ofType(todolistActions.createTodolist),
      concatMap(({ title }) =>
        this.todolistService.createTodolist({ title }).pipe(
          tap(() => this.toastr.success('Todolist created successfully', 'Success')),
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
          tap(() => this.toastr.success('Todolist updated successfully', 'Success')),
          map(todolist => todolistActions.todolistUpdated({ todolist })),
        )
      )
    )
  });
  deleteTodolist = createEffect(() => {
    return this.actions$.pipe(
      ofType(todolistActions.deleteTodolist),
      concatMap(({ todolistId }) =>
        this.todolistService.deleteTodolist(todolistId).pipe(
          tap(() => this.toastr.success('Todolist deleted successfully', 'Success')),
          map(() => todolistActions.todolistDeleted({ todolistId })),
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
