// src/app/layouts/toolbar/toolbar.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule
  ],
})
export class ToolbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  onLogout() {
    this.authService.logOut();
  }
}
