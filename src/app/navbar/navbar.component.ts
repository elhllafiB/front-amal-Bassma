import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  title = 'V2';

  activeRoute = '/dashboard'; // valeur par défaut
  // Dans votre composant TypeScript
  isSidebarHidden = false;

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }


  setActive(route: string) {
    this.activeRoute = route;
  }
}
