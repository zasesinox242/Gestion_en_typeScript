import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RoleGuard } from './role.guard';
import { AuthService } from '../services/auth.service';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getRol']);
    routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(RoleGuard);
  });

  function snapshotConRoles(roles: string[] | undefined) {
    return { data: { roles } } as any;
  }

  it('permite el acceso si el rol del usuario está en la lista permitida', () => {
    authServiceSpy.getRol.and.returnValue('admin');
    const resultado = guard.canActivate(snapshotConRoles(['admin', 'profesor']));
    expect(resultado).toBeTrue();
  });

  it('deniega el acceso si el rol no está permitido', () => {
    authServiceSpy.getRol.and.returnValue('alumno');
    routerSpy.parseUrl.and.returnValue('URL_LOGIN' as any);
    const resultado = guard.canActivate(snapshotConRoles(['admin']));
    expect(resultado).toBe('URL_LOGIN' as any);
    expect(routerSpy.parseUrl).toHaveBeenCalledWith('/login');
  });

  it('redirige a login si no hay usuario autenticado', () => {
    authServiceSpy.getRol.and.returnValue(null);
    routerSpy.parseUrl.and.returnValue('URL_LOGIN' as any);
    const resultado = guard.canActivate(snapshotConRoles(['admin']));
    expect(resultado).toBe('URL_LOGIN' as any);
  });

  it('permite el acceso si la ruta no define roles', () => {
    authServiceSpy.getRol.and.returnValue('alumno');
    const resultado = guard.canActivate(snapshotConRoles(undefined));
    expect(resultado).toBeTrue();
  });
});
