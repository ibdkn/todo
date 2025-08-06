import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of, switchMap} from 'rxjs';
import {taskActions} from './task.actions';
import {Task, TasksState} from '../interfaces/task.interface';
import {v4 as uuidv4} from 'uuid';

const initialTasks: TasksState = {
  ['todolist-1']: [
    {id: uuidv4(), title: 'Apples', isDone: true},
    {id: uuidv4(), title: 'Bananas', isDone: true},
    {id: uuidv4(), title: 'Pepper', isDone: false},
  ],
  ['todolist-2']: [
    {id: uuidv4(), title: 'HTML&CSS', isDone: true},
    {id: uuidv4(), title: 'JS', isDone: true},
    {id: uuidv4(), title: 'ReactJS', isDone: false},
  ],
};

@Injectable({
  providedIn: 'root'
})
export class TaskEffects {
  // taskService =
  actions$ = inject(Actions);

  getTasks = createEffect(() => {
    return this.actions$.pipe(
      ofType(taskActions.loadTasks),
      switchMap(() =>
        of(taskActions.tasksLoaded({tasks: initialTasks}))
      )
    )
  });
  createTask = createEffect(() => {
    return this.actions$.pipe(
      ofType(taskActions.createTask),
      switchMap(({ todolistId, title }) => {
        const task: Task = { id: uuidv4(), title, isDone: false };
        return of(taskActions.taskCreated({ todolistId, task }));
      })
    )
  });
  updateTaskTitle = createEffect(() => {
    return this.actions$.pipe(
      ofType(taskActions.updateTaskTitle),
      switchMap(({ todolistId, taskId, title }) => {
        return of(taskActions.taskTitleUpdated({ todolistId, taskId, title }));
      })
    )
  });
  changeTaskStatus = createEffect(() => {
    return this.actions$.pipe(
      ofType(taskActions.changeTaskStatus),
      switchMap(({ todolistId, taskId, isDone }) => {
        return of(taskActions.taskStatusChanged({ todolistId, taskId, isDone }));
      })
    )
  });
  deleteTask = createEffect(() => {
    return this.actions$.pipe(
      ofType(taskActions.deleteTask),
      switchMap(({ todolistId, taskId }) => {
        return of(taskActions.taskDeleted({ todolistId, taskId }));
      })
    )
  });
}
