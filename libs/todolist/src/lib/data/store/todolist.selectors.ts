import {createSelector} from '@ngrx/store';
import {todolistFeature} from './todolist.reducer';


export const selectTodolists = createSelector(
  todolistFeature.selectTodolists,
  (todolists) => todolists
);
