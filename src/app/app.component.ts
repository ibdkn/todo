import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TodolistComponent} from './components/todolist/todolist.component';
import {Task, TaskStatus} from './interfaces/task.interface';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  imports: [TodolistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title: string = 'todo';

  tasks = [
    { id: uuidv4(), title: 'HTML&CSS', isDone: true },
    { id: uuidv4(), title: 'JS', isDone: true },
    { id: uuidv4(), title: 'ReactJS', isDone: false },
  ];

  filteredTasks: Task[] = [];

  currentFilter: TaskStatus = 'all'

  ngOnInit(): void {
    this.filteredTasks = this.tasks.slice();
  }

  deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.updateFilter();
  }

  changeFilter(taskStatus: TaskStatus): void {
    this.currentFilter = taskStatus;
    switch (taskStatus) {
      case 'active':
        this.filteredTasks = this.tasks.filter(t => !t.isDone);
        break;
      case 'completed':
        this.filteredTasks = this.tasks.filter(t => t.isDone);
        break;
      default:
        this.filteredTasks = this.tasks.slice();
    }
  }

  createTask(newTask: Task): void {
    this.tasks = [...this.tasks, newTask];
    this.updateFilter();
  }

  changeTaskStatus({ id, isDone }: Pick<Task, 'id' | 'isDone'>): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.isDone = isDone;
    }
    this.updateFilter();
  }

  updateFilter(): void {
    this.changeFilter(this.currentFilter);
  }
}
