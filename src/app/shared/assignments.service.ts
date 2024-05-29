import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignment.model';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { Server } from '../environment/server';

// importation des données de test
import { bdInitialAssignments } from './mock_data/MOCK_DATA_ASSIGNMENTS';
import { TitleService } from './title.service';
import { Subject } from './../models/subject';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [];

  constructor(private logService:LoggingService,
              private http:HttpClient,
              private server: Server) { }

  getAssignmentAuthorWhereIsNotDone(name: string, firstname: string, page: number, limit: number): Observable<any> {
    const urlAssignment = `${this.server.getUrl()}/api/assignments/author/notDone?name=${name}&firstname=${firstname}&page=${page}&limit=${limit}`;

    return this.http.get<Assignment[]>(urlAssignment);
  }

  getAssignmentAuthorWhereIsDone(name: string, firstname: string, page: number, limit: number): Observable<any> {
    const urlAssignment = `${this.server.getUrl()}/api/assignments/author/isDoneNotMarked?name=${name}&firstname=${firstname}&page=${page}&limit=${limit}`;

    return this.http.get<Assignment[]>(urlAssignment);
  }

  getAssignmentAuthorWhereIsMarked(name: string, firstname: string, page: number, limit: number): Observable<any> {
    const urlAssignment = `${this.server.getUrl()}/api/assignments/author/isMarked?name=${name}&firstname=${firstname}&page=${page}&limit=${limit}`;

    return this.http.get<Assignment[]>(urlAssignment);
  }

  // updateAssignment(assignment:Assignment):Observable<any> {
  //   const urlAssignment = `${this.server.getUrl()}/api/assignments/${assignment._id}`;

  //   return this.http.put<Assignment>(urlAssignment, assignment);
  // }

  getAssignmentTeacherNotNoted(name: string, firstname: string, page: number, limit: number): Observable<any> {
    const urlAssignment = `${this.server.getUrl()}/api/assignments/teacher/isNotMarked?name=${name}&firstname=${firstname}&page=${page}&limit=${limit}`;

    return this.http.get<Assignment[]>(urlAssignment);
  }

  getAssignmentTeacherNoted(name: string, firstname: string, page: number, limit: number): Observable<any> {
    const urlAssignment = `${this.server.getUrl()}/api/assignments/teacher/isMarked?name=${name}&firstname=${firstname}&page=${page}&limit=${limit}`;

    return this.http.get<Assignment[]>(urlAssignment);
  }

  getDetailAssignment(id: string|undefined): Observable<any> {
    const urlAssignment = `${this.server.getUrl()}/api/assignments/${id}`;

    return this.http.get<Assignment>(urlAssignment);
  }

  getAssignments(page: number, limit: number): Observable<any> {
    const urlAssignment = `${this.server.getUrl()}/api/assignments?page=${page}&limit=${limit}`;

    return this.http.get<Assignment[]>(urlAssignment);
  }

  deleteAssignment(assignmentId: string): Observable<any>  {
    const urlAssignment = `${this.server.getUrl()}/api/assignments/${assignmentId}`;

    return this.http.delete<any>(urlAssignment);
  }

  // modifie un assignment
  updateAssignment(assignment: Assignment): Observable<any> {
    // let assignment = this.getDetailAssignment(assignmentId);
    this.logService.log(assignment.title!, 'modifié');
    // const urlAssignment = `$(this.server.getUrl()}/api/assignments/${assignment._id}`;
    const urlAssignment = `${this.server.getUrl()}/api/assignments/${
      assignment._id
    }`;

    // return this.http.patch<Assignment>(urlAssignment, assignment);
    return this.http.put(`${urlAssignment}`, assignment);
  }

  // ajoute une devoir
  addAssignment(assignment:Assignment):Observable<any> {
    const token=localStorage.getItem('token');
    const urlAssign = `${this.server.getUrl()}/api/assignments`;
    const headers = {Authorization : "bearer "+ token};
    this.logService.log(assignment.title!, "ajouté");
    return this.http.post<Assignment>(urlAssign, assignment, {headers});
  }

  peuplerBDAssignments():Observable<any> {
    let appelsVersAddAssignment:Observable<any>[] = [];

    bdInitialAssignments.forEach((s) => {
      const newAssignment = new Assignment();
      newAssignment.title = s.title;
      newAssignment.description = s.description || '';
      newAssignment.subject = s.subject;
      newAssignment.creationDate = new Date(s.creationDate);
      newAssignment.deadline = new Date(s.deadline);
      newAssignment.link = s.link || '';

      appelsVersAddAssignment.push(this.addAssignment(newAssignment));
    });

    return forkJoin(appelsVersAddAssignment);
  }

}
