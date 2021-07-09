import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@authentication/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input()
  showAuthenticatedMenu = false;

  constructor(private route: Router, private authService: AuthService) {}

  onLogoutClick(): void {
    this.authService.clearLocalStorage();
    this.route.navigate(['/auth/login']);
  }
}
