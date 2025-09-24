import {Todolist} from '@todo/task-board';
import {createFeature, createReducer, on} from '@ngrx/store';
import {todolistActions} from './todolist.actions';

export interface TodolistState {
  todolists: Todolist[]
}

export const todolistInitialState: TodolistState = {
  todolists: []
}

export const todolistFeature = createFeature({
  name: 'todolistFeature',
  reducer: createReducer(
    todolistInitialState,
    on(todolistActions.loadTodolists, (state) => {
      return {
        ...state
      }
    }),
    on(todolistActions.todolistsLoaded, (state, payload) => {
      return {
        ...state,
        todolists: payload.todolists.map(tl => ({
          ...tl,
          filter: 'all' as const
        })).sort((a, b) => a.position - b.position)
      }
    }),
    on(todolistActions.todolistDeleted, (state, payload) => {
      return {
        ...state,
        todolists: state.todolists.filter(tl => tl.id !== payload.todolistId)
      }
    }),
    on(todolistActions.todolistCreated, (state, payload) => {
      return {
        ...state,
        todolists: [...state.todolists, payload.todolist]
      }
    }),
    on(todolistActions.todolistUpdated, (state, payload) => {
      return {
        ...state,
        todolists: state.todolists.map(tl => tl.id === payload.todolist.id ? { ...tl, title: payload.todolist.title } : tl)
      }
    }),
    on(todolistActions.todolistFiltered, (state, payload) => {
      return {
        ...state,
        todolists: state.todolists.map(tl => tl.id === payload.todolistId ? { ...tl, filter: payload.filter } : tl)
      }
    }),
    on(todolistActions.reorderTodolists, (state, { orderedIds }) => {
      // обновим position по индексу
      const byId = new Map(state.todolists.map(t => [t.id, t]));
      const next = orderedIds.map((id, index) => ({ ...byId.get(id)!, position: index }));
      return { ...state, todolists: next };
    }),
    on(todolistActions.todolistsReordered, (state) => state),
  )
})
