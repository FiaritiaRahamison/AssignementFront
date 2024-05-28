import { Observable, forkJoin } from 'rxjs';
import { Server } from '../environment/server';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/token';
import { Injectable } from '@angular/core';
import { bdInitialUsers} from './mock_data/MOCK_DATA_USERS';
import { UserModel } from '../models/user.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private logService:LoggingService,
    private http:HttpClient,
    private server: Server
  ){}

  getUsers(page: number, limit: number): Observable<any> {
    const urlUser = `${this.server.getUrl()}/api/users?page=${page}&limit=${limit}`;

    return this.http.get<User[]>(urlUser);
  }

  // ajoute un assignment et retourne une confirmation
  addUser(user:UserModel):Observable<any> {
    const urlUser = `${this.server.getUrl()}/api/users`;

    //this.assignments.push(assignment);
    this.logService.log(user.name, "ajouté");
    //return of("Assignment ajouté avec succès");
    return this.http.post<UserModel>(urlUser, user);
  }

  peuplerBDUsers():Observable<any> {
    let appelsVersAddAssignment:Observable<any>[] = [];

    bdInitialUsers.forEach(u => {
      const newUser = new UserModel();
      newUser.name = u.name;
      newUser.firstname = u.firstname;
      newUser.login = u.login;
      newUser.password=u.password;
      newUser.photo=u.photo;
      newUser.role=u.role;

      appelsVersAddAssignment.push(this.addUser(newUser))
    });

    return forkJoin(appelsVersAddAssignment);
  }

}
