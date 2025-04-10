import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  activeLink: string = 'Home'; // Default active link
  isLogin: boolean = false;
  userPermissions: string[] = [];
  constructor(private _authService: AuthServiceService) {}

  ngOnInit(): void {
    this.userPermissions = this._authService.getPermissions();
    this._authService.userData.subscribe({
      next: () => {
        if (this._authService.userData.getValue() !== null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
      error: (err) => console.log(err),
    });
  }

  logOut() {
    this._authService.logout();
  }

  hasPermission(permission: string) {
    return this.userPermissions.includes(permission);
  }

  // Function to set active link based on user click
  setActiveLink(link: string) {
    this.activeLink = link;
  }
}
