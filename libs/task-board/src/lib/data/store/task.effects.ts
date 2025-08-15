import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, of, switchMap, tap} from 'rxjs';
import {taskActions} from './task.actions';
import {TaskService} from '../services';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TaskEffects {
  taskService: TaskService = inject(TaskService);
  toastr: ToastrService = inject(ToastrService);
  actions$ = inject(Actions);

  getTasks = createEffect(() => {
    return this.actions$.pipe(
      ofType(taskActions.loadTasks),
      switchMap(() =>
        this.taskService.getTasks().pipe(
          map(tasks => taskActions.tasksLoaded({ tasks })),
        )
      ),
    );
  });
  createTask = createEffect(() => {
    return this.actions$.pipe(
      ofType(taskActions.createTask),
      concatMap(({ todolistId, title }) =>
        this.taskService.createTask({ todolistId, title }).pipe(
          tap(() => this.toastr.success('Task created successfully', 'Success')),
          map(task => taskActions.taskCreated({ todolistId, task })),
        )
      )
    )
  });
  updateTaskTitle = createEffect(() => {
    return this.actions$.pipe(
      ofType(taskActions.updateTaskTitle),
      concatMap(({todolistId, taskId, title}) =>
        this.taskService.updateTask(taskId, {todolistId, title}).pipe(
          tap(() => this.toastr.success('Task updated successfully', 'Success')),
          map(task => taskActions.taskTitleUpdated({todolistId, taskId, title})),
        )
      )
    )
  });
  changeTaskStatus = createEffect(() => {
    return this.actions$.pipe(
      ofType(taskActions.changeTaskStatus),
      concatMap(({todolistId, taskId, isDone}) =>
        this.taskService.updateTask(taskId, {todolistId, isDone}).pipe(
          tap(() => this.toastr.success('Task updated successfully', 'Success')),
          map(task => taskActions.taskStatusChanged({todolistId, taskId, isDone})),
        )
      )
    )
  });
  deleteTask = createEffect(() => {
    return this.actions$.pipe(
      ofType(taskActions.deleteTask),
      concatMap(({ todolistId, taskId }) =>
        this.taskService.deleteTask(taskId).pipe(
          tap(() => this.toastr.success('Task deleted successfully', 'Success')),
          map(() => taskActions.taskDeleted({ todolistId, taskId })),
        )
      )
    )
  });
}
