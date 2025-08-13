import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todolist} from '@todo/task-board';
import {CreateTodolistDto, UpdateTodolistDto} from '../interfaces/todolist.interface';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  http: HttpClient = inject(HttpClient);

  baseApiUrl: string = 'http://localhost:3000/api/todolists';

  getTodolists(): Observable<Todolist[]> {
    return this.http.get<Todolist[]>(`${this.baseApiUrl}`);
  }

  createTodolist(dto: CreateTodolistDto): Observable<Todolist> {
    return this.http.post<Todolist>(`${this.baseApiUrl}/`, dto);
  }

  updateTodolist(id: number, dto: UpdateTodolistDto): Observable<Todolist> {
    return this.http.patch<Todolist>(`${this.baseApiUrl}/${id}`, dto);
  }

  deleteTodolist(id: number) {
    return this.http.delete(`${this.baseApiUrl}/${id}`);
  }
}
