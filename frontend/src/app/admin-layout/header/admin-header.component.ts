import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {

  authService = inject(AuthService)

  public logOut(){
    this.authService.signOut();
  }
}
