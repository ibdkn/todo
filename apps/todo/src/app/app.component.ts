import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {
  CreateItemFormComponent,
  FilterValues, selectTasks,
  selectTodolists,
  Task, taskActions,
  todolistActions,
  TodolistComponent
} from '@todo/todolist';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-root',
  imports: [TodolistComponent, CreateItemFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  store: Store = inject(Store);
  title: string = 'todolist';
  themeMode: boolean = false;

  todolists = this.store.selectSignal(selectTodolists);
  tasks = this.store.selectSignal(selectTasks);

  ngOnInit() {
    this.store.dispatch(todolistActions.loadTodolists());
    this.store.dispatch(taskActions.loadTasks());

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.themeMode = true;
      document.body.classList.add('dark-theme');
    } else {
      this.themeMode = false;
      document.body.classList.remove('dark-theme');
    }
  }

  toggleTheme() {
    this.themeMode = !this.themeMode;
    if (this.themeMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  getFilteredTasks(tasks: Task[], filter: FilterValues) {
    if (filter === 'active') return tasks.filter(task => !task.isDone);
    if (filter === 'completed') return tasks.filter(task => task.isDone);
    return tasks;
  }

  createTask(todolistId: string, title: string): void {
    console.log(todolistId)
    this.store.dispatch(taskActions.createTask({todolistId, title}));
  }

  changeTaskStatus(todolistId: string, {taskId, isDone}: { taskId: string; isDone: boolean }): void {
    this.store.dispatch(taskActions.changeTaskStatus({todolistId, taskId, isDone}));
  }

  deleteTask(todolistId: string, taskId: string): void {
    this.store.dispatch(taskActions.deleteTask({todolistId, taskId}));
  }

  updateTaskTitle(todolistId: string, {taskId, title}: { taskId: string; title: string }) {
    this.store.dispatch(taskActions.updateTaskTitle({todolistId, taskId, title}));
  }

  deleteTodolist(todolistId: string): void {
    this.store.dispatch(todolistActions.deleteTodolist({todolistId}))
  }

  createTodolist(title: string): void {
    this.store.dispatch(todolistActions.createTodolist({title}))
  }

  updateTodolistTitle(todolistId: string, title: string): void {
    this.store.dispatch(todolistActions.updateTodolist({todolistId, title}))
  }

  changeFilter(todolistId: string, filter: FilterValues) {
    this.store.dispatch(todolistActions.filterTodolist({todolistId, filter}))
  }
}
