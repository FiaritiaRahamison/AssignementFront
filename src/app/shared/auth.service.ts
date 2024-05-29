import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Server } from '../environment/server';
import { Token } from '../models/token';
import { Observable, of } from "rxjs";
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ApiResponse } from './apiresponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // propriété pour savoir si l'utilisateur est connecté
  loggedIn = false;

  constructor(
    private http: HttpClient,
    private server: Server,
    private router: Router
  ) {
    this.loggedIn = !!localStorage.getItem('token');
   }

  // méthode pour connecter l'utilisateur
  // Typiquement, il faudrait qu'elle accepte en paramètres
  // un nom d'utilisateur et un mot de passe, que l'on vérifierait
  // auprès d'un serveur...
  logIn(login: string, password: string): Observable<ApiResponse> {
    const urlLogin = `${this.server.getUrl()}/api/users/login`;
    const param = {
      login,
      password
    }

    return this.http.post<ApiResponse>(urlLogin, param).pipe(
      tap((response: ApiResponse) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        this.loggedIn = true;
      })
    );
  }

  // méthode pour déconnecter l'utilisateur
  logOut() {
    this.loggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isUserLoggedIn(): boolean {
    return this.loggedIn;
  }

  // methode qui indique si on est connecté en tant qu'admin ou pas
  // pour le moment, on est admin simplement si on est connecté
  // En fait cette méthode ne renvoie pas directement un booleén
  // mais une Promise qui va renvoyer un booléen (c'est imposé par
  // le système de securisation des routes de Angular)
  //
  // si on l'utilisait à la main dans un composant, on ferait:
  // this.authService.isAdmin().then(....) ou
  // admin = await this.authService.isAdmin()
  isAdmin() {
    const promesse = new Promise((resolve, reject) => {
      // ici accès BD? Web Service ? etc...
      resolve(this.loggedIn);
      // pas de cas d'erreur ici, donc pas de reject
    });

    return promesse;
  }
}
