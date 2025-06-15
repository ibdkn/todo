import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TodolistComponent} from './components/todolist/todolist.component';
import {Task, TaskStatus} from './interfaces/task.interface';

@Component({
  selector: 'app-root',
  imports: [TodolistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'todo';

  tasks = [
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
  ];

  filteredTasks: Task[] = [];

  currentFilter: TaskStatus = 'all'

  ngOnInit(): void {
    this.filteredTasks = this.tasks.slice();
  }

  deleteTask(taskId: number): void {
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

  updateFilter(): void {
    this.changeFilter(this.currentFilter);
  }
}
