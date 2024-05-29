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
import { response } from 'express';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [];

  constructor(private logService:LoggingService,
              private http:HttpClient,
              private server: Server) { }

  getAssignmentAuthorWhereIsNotDone(page: number, limit: number): Observable<any> {
    const urlAssignment = `${this.server.getUrl()}/api/assignments/toDo?page=${page}&limit=${limit}`;

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

  getAssignmentAuthorWhereIsDone(page: number, limit: number): Observable<any> {
    const urlAssignment = `${this.server.getUrl()}/api/assignments/done?page=${page}&limit=${limit}`;

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

  getAssignmentAuthorWhereIsMarked(page: number, limit: number): Observable<any> {
    const urlAssignment = `${this.server.getUrl()}/api/assignments/marked?page=${page}&limit=${limit}`;

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

  // updateAssignment(assignment:Assignment):Observable<any> {
  //   const urlAssignment = `${this.server.getUrl()}/api/assignments/${assignment._id}`;

  //   return this.http.put<Assignment>(urlAssignment, assignment);
  // }

  getAssignmentTeacherNotNoted(page: number, limit: number): Observable<any> {
    const urlAssignment = `${this.server.getUrl()}/api/assignments/done?page=${page}&limit=${limit}`;

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

  getAssignmentTeacherNoted(page: number, limit: number): Observable<any> {
    const urlAssignment = `${this.server.getUrl()}/api/assignments/marked?page=${page}&limit=${limit}`;

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

  getResultsAssignment(id: string|undefined): Observable<any> {
    const urlAssignment = `${this.server.getUrl()}/api/assignments/result/${id}`;
    const bearerToken = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearerToken}`
    });

    return this.http.get<ApiResponse>(urlAssignment, { headers }).pipe(
      map((response) => response.data),
      tap((data: Assignment) => {
        // console.log('Received data:', data);
      })
    );
  }

  addAssignmentResult(id: string) {
    const urlAssignment = `${this.server.getUrl()}/api/assignment/${id}`;

    const bearerToken = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearerToken}`,
    });

    return this.http.post<ApiResponse>(urlAssignment, {}, { headers }).pipe(
      map((response) => response.data),
      tap((data: Assignment) => {
      })
    );
  }

  addNoteAssignment(id: string, mark: number, remark: string) {
    const urlAssignment = `${this.server.getUrl()}/api/assignments/result/${id}`;

    const bearerToken = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearerToken}`,
    });

    return this.http.post<ApiResponse>(urlAssignment, {mark: mark, remark: remark }, { headers }).pipe(
      map((response) => response.data),
      tap((data: Assignment) => {
      })
    );
  }

  deleteAssignment(assignmentId: string): Observable<any>  {
    const urlAssignment = `${this.server.getUrl()}/api/assignment/${assignmentId}`;

    const bearerToken = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearerToken}`,
    });

    return this.http.delete<any>(urlAssignment, { headers });
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

  getAverageMarkStudent(): Observable<any> {
    const urlAssignment = `${this.server.getUrl()}/api/assignments/average`;

    const bearerToken = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearerToken}`
    });

    return this.http.get<ApiResponse>(urlAssignment, { headers }).pipe(
      map((response) => response.data),
      tap((data: Note[]) => {
      })
    );
  }

  getAverageMarkTeacher(page: number, limit: number): Observable<any> {
    const urlAssignment = `${this.server.getUrl()}/api/assignments/average?page=${page}&limit=${limit}`;

    const bearerToken = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearerToken}`
    });

    return this.http.get<ApiResponse>(urlAssignment, { headers }).pipe(
      map((response) => response.data),
      tap((data: Note[]) => {
      })
    );
  }

}
