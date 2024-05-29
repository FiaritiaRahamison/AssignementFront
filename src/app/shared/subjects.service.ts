import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Server } from '../environment/server';
import { Observable,forkJoin } from 'rxjs';
import { Subject } from '../models/subject.model';
import { LoggingService } from './logging.service';
import { bdInitialSubjects } from './mock_data/MOCK_DATA _SUBJECTS';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(
    private http:HttpClient,
    private server: Server,
    private logService:LoggingService,
  ) { }

  getSubjects(page: number, limit: number): Observable<any> {
    const urlSubject = `${this.server.getUrl()}/api/subjects?page=${page}&limit=${limit}`;

    return this.http.get<Subject[]>(urlSubject);
  }

  // ajoute une matière
  addSubject(subject:Subject):Observable<any> {
    const token=localStorage.getItem('token');
    const urlUser = `${this.server.getUrl()}/api/subjects`;
    const headers = {Authorization : "bearer "+ token};
    this.logService.log(subject.name, "ajouté");
    return this.http.post<Subject>(urlUser, subject, {headers});
  }

  peuplerBDSubjects():Observable<any> {
    let appelsVersAddAssignment:Observable<any>[] = [];

    bdInitialSubjects.forEach(s => {
      const newSubject = new Subject();
      newSubject.name = s.name;
      newSubject.photo = s.photo;
      newSubject.teacher = s.teacher;

      appelsVersAddAssignment.push(this.addSubject(newSubject))
    });

    return forkJoin(appelsVersAddAssignment);
  }
}
