import { Observable } from 'rxjs';
import { Server } from '../environment/server';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/token';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response';
import { response } from 'express';
import { map, tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http:HttpClient,
    private server: Server,
    private logService:LoggingService,
  ){}

  getTeachers(page: number, limit: number): Observable<any> {
    const urlUser = `${this.server.getUrl()}/api/teachers?page=${page}&limit=${limit}`;

    const bearerToken = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearerToken}`
    });

    return this.http.get<ApiResponse>(urlUser, { headers }).pipe(
      map((response) => response.data),
      tap((data: User[]) => {

      })
    );
  }

  getStudents(page: number, limit: number): Observable<any> {
    const urlUser = `${this.server.getUrl()}/api/students?page=${page}&limit=${limit}`;

    const bearerToken = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearerToken}`
    });

    return this.http.get<ApiResponse>(urlUser, { headers }).pipe(
      map((response) => response.data),
      tap((data: User[]) => {

      })
    );
  }

    // enregistre un nouvek utilisateur
    createUser(user:User):Observable<any> {
      this.logService.log(user.login, "ajouté");
      //return of("Assignment ajouté avec succès");
      const url = `${this.server.getUrl()}/api/users`;
      const bearerToken = localStorage.getItem('token');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
      });

      return this.http.post<ApiResponse>(url, {}, { headers }).pipe(
        map((response) => response.data),
        tap((data: User) => {
        })
      );
    }

}
