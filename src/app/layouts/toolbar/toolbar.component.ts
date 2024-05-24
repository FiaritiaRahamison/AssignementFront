// src/app/layouts/toolbar/toolbar.component.ts
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../../shared/auth.service';
import { TitleService } from '../../shared/title.service';
import { Router } from '@angular/router';

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
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  pageTitle!: string;

  constructor(
    private authService: AuthService,
    private titleService: TitleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.titleService.currentTitle.subscribe(title => this.pageTitle = title);
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  onLogout() {
    this.authService.logOut();
  }

  navigateToProfile () {
    this.router.navigate(['/user/profile']);
  }
}
