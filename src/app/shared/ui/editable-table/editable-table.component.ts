import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type TipoColumna = 'text' | 'number' | 'select' | 'badge';

export interface OpcionColumna {
  value: string;
  label: string;
}

export interface ColumnaTabla<T> {
  key: keyof T;
  label: string;
  tipo?: TipoColumna;
  /** Requerido para tipo 'select' y 'badge': mapea el valor crudo a una etiqueta. */
  opciones?: OpcionColumna[];
  /** Oculta el valor real en modo lectura (ej. contraseñas) mostrando '••••••••'. */
  enmascarar?: boolean;
  ancho?: string;
}

let contadorInstancias = 0;

/**
 * Tabla con edición inline (ver → editar → guardar) reutilizable entre
 * features. Antes de este componente, `gestion-cursos`, `gestion-usuarios`
 * y `lista-alumnos` repetían el mismo patrón de tabla + botones
 * Editar/Guardar/Eliminar con solo las columnas cambiando.
 *
 * El componente NO llama servicios: solo administra el estado visual de
 * "qué fila está en edición" y emite `guardar`/`eliminar` con el item para
 * que el componente padre decida cómo persistirlo. Así el padre conserva el
 * control sobre la capa de datos, tal como pide una separación limpia entre
 * UI y lógica de negocio.
 *
 * Para acciones extra por fila (ej. el link "Ver alumnos" en cursos) se usa
 * proyección de contenido con un `ng-template #accionesExtra`.
 */
@Component({
  selector: 'app-editable-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editable-table.component.html'
})
export class EditableTableComponent<T extends { id: number }> {
  @Input() items: T[] = [];
  @Input() columnas: ColumnaTabla<T>[] = [];
  @Input() mensajeVacio = 'No hay registros.';

  @Output() guardar = new EventEmitter<T>();
  @Output() eliminar = new EventEmitter<T>();

  @ContentChild('accionesExtra') accionesExtraTpl: TemplateRef<{ $implicit: T }> | null = null;

  readonly instanciaId = contadorInstancias++;
  private editando = new Set<number>();

  trackById: TrackByFunction<T> = (_, item) => item.id;

  estaEditando(item: T): boolean {
    return this.editando.has(item.id);
  }

  editar(item: T): void {
    this.editando.add(item.id);
  }

  onGuardar(item: T): void {
    this.editando.delete(item.id);
    this.guardar.emit(item);
  }

  onEliminar(item: T): void {
    this.eliminar.emit(item);
  }

  valor(item: T, columna: ColumnaTabla<T>): any {
    return item[columna.key];
  }

  actualizarValor(item: T, columna: ColumnaTabla<T>, valorNuevo: any): void {
    (item as Record<string, unknown>)[columna.key as string] =
      columna.tipo === 'number' ? Number(valorNuevo) : valorNuevo;
  }

  etiquetaOpcion(columna: ColumnaTabla<T>, item: T): string {
    const valorCrudo = String(item[columna.key]);
    return columna.opciones?.find(o => o.value === valorCrudo)?.label ?? valorCrudo;
  }

  campoNombre(columna: ColumnaTabla<T>, item: T): string {
    return `${String(columna.key)}-${item.id}-${this.instanciaId}`;
  }
}
