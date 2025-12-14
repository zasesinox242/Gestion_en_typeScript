import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cursos-horizontal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cursos-horizontal.component.html',
  styleUrls: ['./cursos-horizontal.component.css']
})
export class CursosHorizontalComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
