import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Server } from '../environment/server';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';

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

    return this.http.get<Subject[]>(urlSubject);
  }
}
