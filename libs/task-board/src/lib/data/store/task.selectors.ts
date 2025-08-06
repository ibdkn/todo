import {createSelector} from '@ngrx/store';
import {taskFeature} from './task.reducer';

export const selectTasks = createSelector(
  taskFeature.selectTasks,
  (tasks) => tasks
);
