import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { ToolbarComponent } from './layouts/toolbar/toolbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule,
    SidebarComponent,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    ToolbarComponent
  ],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.css'
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  // Méthode pour vérifier si l'utilisateur est connecté
  public isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }
}
