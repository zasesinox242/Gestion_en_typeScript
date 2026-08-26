export interface Alumno {
  id: number;
  nombres: string;
  apellidos: string;
  edad: number;
  /** ids de los cursos en los que está matriculado */
  cursosIds: number[];
}
