import { Observable } from 'rxjs';
import { Server } from '../environment/server';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/token';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http:HttpClient,
    private server: Server
  ){}

  getUsers(page: number, limit: number): Observable<any> {
    const urlUser = `${this.server.getUrl()}/api/users?page=${page}&limit=${limit}`;

    return this.http.get<User[]>(urlUser);
  }

}
