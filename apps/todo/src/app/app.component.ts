import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import {
  CreateItemFormComponent,
  FilterValues,
  selectTodolists,
  Task,
  TasksState, todolistActions,
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
  todolistId1: string = uuidv4();
  todolistId2: string = uuidv4();
  themeMode: boolean = false;

  todolists = this.store.selectSignal(selectTodolists);

  tasks: TasksState = {
    [this.todolistId1]: [
      {id: uuidv4(), title: 'Apples', isDone: true},
      {id: uuidv4(), title: 'Bananas', isDone: true},
      {id: uuidv4(), title: 'Pepper', isDone: false},
    ],
    [this.todolistId2]: [
      {id: uuidv4(), title: 'HTML&CSS', isDone: true},
      {id: uuidv4(), title: 'JS', isDone: true},
      {id: uuidv4(), title: 'ReactJS', isDone: false},
    ],
  };

  ngOnInit() {
    this.store.dispatch(todolistActions.loadTodolists());
    console.log(this.todolists())

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
    // if (filter === 'active') return tasks.filter((task) => !task.isDone);
    // if (filter === 'completed') return tasks.filter((task) => task.isDone);
    // return tasks;
  }

  createTask(todolistId: string, title: string): void {
    // const newTask = { id: uuidv4(), title, isDone: false };
    // this.tasks = {
    //   ...this.tasks,
    //   [todolistId]: [newTask, ...this.tasks[todolistId]],
    // };
  }

  changeTaskStatus(
    todolistId: string,
    {taskId, isDone}: { taskId: string; isDone: boolean }
  ): void {
    // this.tasks = {
    //   ...this.tasks,
    //   [todolistId]: this.tasks[todolistId].map((t) =>
    //     t.id === taskId ? { ...t, isDone } : t
    //   ),
    // };
  }

  deleteTask(todolistId: string, taskId: string): void {
    // this.tasks = {
    //   ...this.tasks,
    //   [todolistId]: this.tasks[todolistId].filter((task) => task.id !== taskId),
    // };
  }

  updateTaskTitle(
    todolistId: string,
    {taskId, title}: { taskId: string; title: string }
  ) {
    // this.tasks = {
    //   ...this.tasks,
    //   [todolistId]: this.tasks[todolistId].map((task) =>
    //     task.id === taskId ? { ...task, title } : task
    //   ),
    // };
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
