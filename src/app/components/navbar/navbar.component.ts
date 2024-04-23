import { Component, inject } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  //fernw to UserService (me tis methodous tou) mesa edw
  userService = inject(UserService)
  user = this.userService.user; //User ginetai o user pou einai kai sto service.

  logout() {
    this.userService.logoutUser() //kalei to logout apo to userService
  }

}
