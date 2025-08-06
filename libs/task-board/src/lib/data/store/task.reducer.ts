import {TasksState} from '../interfaces/task.interface';
import {createFeature, createReducer, on} from '@ngrx/store';
import {taskActions} from './task.actions';

export interface TaskState {
  tasks: TasksState
}

export const taskInitialState: TaskState = {
  tasks: {}
}

export const taskFeature = createFeature({
  name: 'taskFeature',
  reducer: createReducer(
    taskInitialState,
    on(taskActions.loadTasks, (state) => ({
      ...state
    })),
    on(taskActions.tasksLoaded, (state, payload) => ({
      ...state,
      tasks: payload.tasks
    })),
    on(taskActions.taskCreated, (state, payload) => {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [payload.todolistId]: [payload.task, ...(state.tasks[payload.todolistId] ?? [])]
        }
      };
    }),
    on(taskActions.taskTitleUpdated, (state, payload) => {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [payload.todolistId]: state.tasks[payload.todolistId].map((task) => task.id === payload.taskId ? {
            ...task,
            title: payload.title
          } : task),
        }
      };
    }),
    on(taskActions.taskStatusChanged, (state, payload) => {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [payload.todolistId]: state.tasks[payload.todolistId].map((task) => task.id === payload.taskId ? {
            ...task,
            isDone: payload.isDone
          } : task),
        }
      };
    }),
    on(taskActions.taskDeleted, (state, payload) => {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [payload.todolistId]: state.tasks[payload.todolistId].filter((task) => task.id !== payload.taskId)
        }
      };
    })
  )
});

