import { TestBed } from '@angular/core/testing';
import { CursosService } from './cursos.service';

describe('CursosService', () => {
  let service: CursosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosService);
  });

  it('lista los cursos existentes', done => {
    service.listar().subscribe(cursos => {
      expect(cursos.length).toBeGreaterThan(0);
      done();
    });
  });

  it('crea un curso nuevo y lo agrega a la lista', done => {
    service.crear('Física').subscribe(nuevo => {
      expect(nuevo.nombre).toBe('Física');
      service.listar().subscribe(cursos => {
        expect(cursos.some(c => c.id === nuevo.id)).toBeTrue();
        done();
      });
    });
  });

  it('elimina un curso', done => {
    service.crear('Curso temporal').subscribe(nuevo => {
      service.eliminar(nuevo.id).subscribe(() => {
        service.listar().subscribe(cursos => {
          expect(cursos.some(c => c.id === nuevo.id)).toBeFalse();
          done();
        });
      });
    });
  });
});
