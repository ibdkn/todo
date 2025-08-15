import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateTaskDto, Task, UpdateTaskDto} from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  http: HttpClient = inject(HttpClient);

  baseApiUrl: string = 'http://localhost:3000/api/tasks';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseApiUrl}`);
  }

  createTask(dto: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(`${this.baseApiUrl}`, dto);
  }

  updateTask(id: number, dto: UpdateTaskDto): Observable<Task> {
    return this.http.patch<Task>(`${this.baseApiUrl}/${id}`, dto);
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.baseApiUrl}/${id}`);
  }
}
