import {ChangeDetectionStrategy, Component, computed, Signal, signal, WritableSignal} from '@angular/core';
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
export class AppComponent {
  title: string = 'todo';

  tasks: WritableSignal<Task[]> = signal<Task[]>([
    { id: uuidv4(), title: 'HTML&CSS', isDone: true },
    { id: uuidv4(), title: 'JS', isDone: true },
    { id: uuidv4(), title: 'ReactJS', isDone: false }
  ]);

  currentFilter: WritableSignal<TaskStatus> = signal<TaskStatus>('all');
  filteredTasks: Signal<Task[]> = computed(() => {
    const filter: TaskStatus = this.currentFilter();
    const tasks: Task[] = this.tasks();
    if (filter === 'active') return tasks.filter(t => !t.isDone);
    if (filter === 'completed') return tasks.filter(t => t.isDone);
    return tasks;
  });

  deleteTask(taskId: string): void {
    this.tasks.update(tasks => tasks.filter(t => t.id !== taskId));
  }

  changeFilter(taskStatus: TaskStatus): void {
    this.currentFilter.set(taskStatus);
  }

  createTask(newTask: Task): void {
    this.tasks.update(tasks => [...tasks, newTask]);
  }

  changeTaskStatus({ id, isDone }: Pick<Task, 'id' | 'isDone'>): void {
    this.tasks.update(tasks =>
      tasks.map(t =>
        t.id === id ? { ...t, isDone } : t
      )
    );
  }
}
