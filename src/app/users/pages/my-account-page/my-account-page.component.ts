import { Component, OnInit } from '@angular/core';
import { AuthService } from '@authentication/services/auth.service';
import { IAuthenticatedUserData } from '@onboarding/models/iauthenticated-user';

@Component({
  selector: 'app-my-account-page',
  templateUrl: './my-account-page.component.html',
  styleUrls: ['./my-account-page.component.scss'],
})
export class MyAccountPageComponent implements OnInit {
  user: IAuthenticatedUserData | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }
}
