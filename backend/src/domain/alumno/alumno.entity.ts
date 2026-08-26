export interface Alumno {
  id: number;
  nombres: string;
  apellidos: string;
  edad: number;
  /** ids de los cursos en los que está matriculado (viene de la tabla intermedia). */
  cursosIds: number[];
}
