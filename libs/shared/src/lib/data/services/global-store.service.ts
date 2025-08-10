import {Injectable, signal, WritableSignal} from '@angular/core';
import {User} from '@todo/auth';

@Injectable({
  providedIn: 'root'
})
export class GlobalStoreService {
  me: WritableSignal<User | null> = signal<User | null>(null);
}
