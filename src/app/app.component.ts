import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TodolistComponent} from './components/todolist/todolist.component';
import {Task, TasksState} from './interfaces/task.interface';
import {v4 as uuidv4} from 'uuid';
import {FilterValues, Todolist} from './interfaces/todolist.interface';
import {CreateItemFormComponent} from './components/create-item-form/create-item-form.component';

@Component({
  selector: 'app-root',
  imports: [TodolistComponent, CreateItemFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title: string = 'todolist';
  todolistId1: string = uuidv4();
  todolistId2: string = uuidv4();
  themeMode: boolean = false;

  todolists: Todolist[] = [
    {id: this.todolistId1, title: 'What to buy', filter: 'all'},
    {id: this.todolistId2, title: 'What to learn', filter: 'all'}
  ]

  tasks: TasksState = {
    [this.todolistId1]: [
      {id: uuidv4(), title: 'Apples', isDone: true},
      {id: uuidv4(), title: 'Bananas', isDone: true},
      {id: uuidv4(), title: 'Pepper', isDone: false}
    ],
    [this.todolistId2]: [
      {id: uuidv4(), title: 'HTML&CSS', isDone: true},
      {id: uuidv4(), title: 'JS', isDone: true},
      {id: uuidv4(), title: 'ReactJS', isDone: false}
    ],
  };

  ngOnInit() {
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

  getFilteredTasks(tasks: Task[], filter: FilterValues): Task[] {
    if (filter === 'active') return tasks.filter(task => !task.isDone);
    if (filter === 'completed') return tasks.filter(task => task.isDone);
    return tasks;
  }

  changeFilter(todolistId: string, filter: FilterValues) {
    this.todolists = this.todolists.map(tl =>
      tl.id === todolistId
        ? { ...tl, filter }
        : tl
    );
  }

  createTask(todolistId: string, title: string): void {
    const newTask = {id: uuidv4(), title, isDone: false}
    this.tasks = {
      ...this.tasks,
      [todolistId]: [newTask, ...this.tasks[todolistId]]
    }
  }

  changeTaskStatus(todolistId: string, {taskId, isDone}: { taskId: string, isDone: boolean }): void {
    this.tasks = {
      ...this.tasks,
      [todolistId]: this.tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)
    }
  }

  deleteTask(todolistId: string, taskId: string): void {
    this.tasks = {
      ...this.tasks,
      [todolistId]: this.tasks[todolistId].filter(task => task.id !== taskId)
    };
  }

  updateTaskTitle(todolistId: string, {taskId, title}: {taskId: string, title: string}) {
    this.tasks = {
      ...this.tasks,
      [todolistId]: this.tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)
    };
  }

  deleteTodolist(todolistId: string) {
    this.todolists = this.todolists.filter(tl => tl.id !== todolistId);
    const { [todolistId]: _, ...restTasks } = this.tasks;
    this.tasks = restTasks;
  }

  createTodolist(title: string) {
    const todolistId = uuidv4();
    this.todolists = [{id: todolistId, title, filter: 'all'}, ...this.todolists];
    this.tasks = {...this.tasks, [todolistId]: []};
  }

  updateTodolistTitle(todolistId: string, title: string) {
    this.todolists = this.todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl)
  }
}
