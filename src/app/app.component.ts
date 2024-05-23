import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AuthService } from './shared/auth.service';
import { AssignmentsService } from './shared/assignments.service';
import { NgModule } from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { ToolbarComponent } from './layouts/toolbar/toolbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatButtonModule, MatDividerModule,

          MatIconModule, MatSlideToggleModule,
            AssignmentsComponent, SidebarComponent,CommonModule,
              
              MatSidenavModule,
              MatToolbarModule,
              MatListModule, ToolbarComponent],

  templateUrl: 'app.component.html',
  styleUrl: 'app.component.css'
})
export class AppComponent {
  // title = 'Application de gestion des assignments';

  // constructor(private authService:AuthService,
  //             private assignmentsService: AssignmentsService,
  //             private router:Router) {}

  // login() {
  //   // on utilise le service d'autentification
  //   // pour se connecter ou se déconnecter
  //   if(!this.authService.loggedIn) {
  //     this.authService.logIn();
  //   } else {
  //     this.authService.logOut();
  //     // on navigue vers la page d'accueil
  //     this.router.navigate(['/home']);
  //   }
  // }

  // genererDonneesDeTest() {
  //   // on utilise le service
  //   /* VERSION NAIVE
  //   this.assignmentsService.peuplerBD();
  //   */

  //   // VERSION AVEC Observable
  //   this.assignmentsService.peuplerBDavecForkJoin()
  //   .subscribe(() => {
  //     console.log("Données générées, on rafraichit la page pour voir la liste à jour !");
  //     window.location.reload();
  //     // On devrait pouvoir le faire avec le router, jussqu'à la version 16 ça fonctionnait avec
  //     // this.router.navigate(['/home'], {replaceUrl:true});
  //   });
  // }
}
