import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  afterEach(() => localStorage.clear());

  it('debería autenticar con credenciales válidas y guardar la sesión', done => {
    service.login('admin', 'admin123').subscribe(sesion => {
      expect(sesion.rol).toBe('admin');
      expect(service.isAuthenticated()).toBeTrue();
      expect(service.getRol()).toBe('admin');
      done();
    });
  });

  it('debería rechazar credenciales inválidas', done => {
    service.login('admin', 'password-incorrecto').subscribe({
      next: () => fail('no debería autenticar con credenciales inválidas'),
      error: err => {
        expect(err.message).toBeTruthy();
        expect(service.isAuthenticated()).toBeFalse();
        done();
      }
    });
  });

  it('logout debería limpiar la sesión', done => {
    service.login('profe', 'profe123').subscribe(() => {
      service.logout();
      expect(service.isAuthenticated()).toBeFalse();
      expect(service.getRol()).toBeNull();
      done();
    });
  });
});
