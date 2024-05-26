import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { Server } from '../environment/server';

// importation des données de test
import { bdInitialAssignments } from './data';

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

  updateAssignment(assignment:Assignment):Observable<any> {
    const urlAssignment = `${this.server.getUrl()}/api/assignments/${assignment._id}`;

    return this.http.put<Assignment>(urlAssignment, assignment);
  }

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

    // ajoute un assignment et retourne une confirmation
  addAssignment(assignment:Assignment):Observable<any> {
    //this.assignments.push(assignment);
    this.logService.log(assignment.title, "ajouté");
    //return of("Assignment ajouté avec succès");
    const urlAssignment = `${this.server.getUrl()}/api/assignments`;
    return this.http.post<Assignment>(urlAssignment, assignment);
  }
}
