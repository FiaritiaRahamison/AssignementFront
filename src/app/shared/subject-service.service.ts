import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Server } from '../environment/server';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class SubjectServiceService {

  constructor(
    private http:HttpClient,
    private server: Server
  ) { }

  getSubjects(page: number, limit: number): Observable<any> {
    const urlSubject = `${this.server.getUrl()}/api/subjects?page=${page}&limit=${limit}`;

    const bearerToken = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearerToken}`
    });

    return this.http.get<ApiResponse>(urlSubject, { headers }).pipe(
      map((response) => response.data),
      tap((data: Subject[]) => {
      })
    );
  }
}
