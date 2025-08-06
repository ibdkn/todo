import {Routes} from '@angular/router';
import {LoginComponent} from '@todo/auth';
import {LayoutComponent} from '@todo/layout';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {BoardComponent, TaskEffects, taskFeature, TodolistEffects, todolistFeature} from '@todo/task-board';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'task-board', pathMatch: 'full'},
      {
        path: 'task-board',
        component: BoardComponent,
        providers: [
          provideState(todolistFeature),
          provideState(taskFeature),
          provideEffects(TodolistEffects, TaskEffects),
        ]
      },
      {
        path: 'login',
        component: LoginComponent
      },
    ]
  },
];
