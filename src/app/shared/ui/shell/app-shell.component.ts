import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Rol, ROLES_LABEL } from '../../../core/domain/models';

export interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.css']
})
export class AppShellComponent {
  @Input() rol!: Rol;
  @Input() nombreUsuario = '';
  @Input() navItems: NavItem[] = [];
  @Output() cerrarSesion = new EventEmitter<void>();

  get rolLabel(): string {
    return ROLES_LABEL[this.rol] ?? this.rol;
  }

  get badgeClass(): string {
    return `badge-rol badge-rol--${this.rol}`;
  }

  get inicial(): string {
    return (this.nombreUsuario || '?').charAt(0).toUpperCase();
  }

  onLogout(): void {
    this.cerrarSesion.emit();
  }
}
