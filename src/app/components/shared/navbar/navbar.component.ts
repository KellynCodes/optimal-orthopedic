import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isNavbarOpen!: boolean;
  toggleNavbar() {
    if (window.innerWidth < 992) {
      this.isNavbarOpen = !this.isNavbarOpen;
    }
  }
}
