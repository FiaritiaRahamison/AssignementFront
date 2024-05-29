import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignment.model';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Server } from '../environment/server';

// importation des données de test
import { bdInitialAssignments } from './data';
import { ApiResponse } from '../models/api-response';

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
    const urlAssignment = `${this.server.getUrl()}/api/assignment/${id}`;

    const bearerToken = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearerToken}`
    });

    return this.http.get<ApiResponse>(urlAssignment, { headers }).pipe(
      map((response) => response.data),
      tap((data: Assignment) => {

      })
    );
  }

  getAssignments(page: number, limit: number): Observable<any> {
    const urlAssignment = `${this.server.getUrl()}/api/assignments?page=${page}&limit=${limit}`;

    const bearerToken = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearerToken}`
    });

    return this.http.get<ApiResponse>(urlAssignment, { headers }).pipe(
      map((response) => response.data),
      tap((data: Assignment[]) => {
      })
    );
  }

  deleteAssignment(assignmentId: string): Observable<any>  {
    const urlAssignment = `${this.server.getUrl()}/api/assignments/${assignmentId}`;

    return this.http.delete<any>(urlAssignment);
  }

    // ajoute un assignment et retourne une confirmation
  addAssignment(assignment:Assignment):Observable<any> {
    //this.assignments.push(assignment);
    this.logService.log(assignment.title, "ajouté");
    //return of("Assignment ajouté avec succès");
    const urlAssignment = `${this.server.getUrl()}/api/assignments`;
    return this.http.post<Assignment>(urlAssignment, assignment);
  }

  // modifie un assignment
  updateAssignment(assignment:Assignment):Observable<any> {
    // let assignment = this.getDetailAssignment(assignmentId);
    this.logService.log(assignment.title, "modifié");
    // const urlAssignment = `$(this.server.getUrl()}/api/assignments/${assignment._id}`;
    const urlAssignment = `${this.server.getUrl()}/api/assignments/${assignment._id}`;

    // return this.http.patch<Assignment>(urlAssignment, assignment);
    return this.http.put(`${urlAssignment}`, assignment);
  }

}
