import { Injectable } from '@angular/core';
import { EstudiantesI } from '../../../interfaces/personal/estudiantes';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EstudiantesService {
    ESTUDIANTES_SERVER: string = 'http://localhost:3000';
  private token: string;

  listadoEstudiantes: any[] = [
    {carnet: '994119189', nombre: 'Johan', correo: 'jhernandez@miumg.edu.gt', celular: '59909019', estado: 'Activo'}
  ]

constructor(private http:HttpClient) { }

getEstudiantes() {
  return this.http.get(`${this.ESTUDIANTES_SERVER}/estudiantes/listar`)
}

getEstudianteByID(carnet: string | null) {
  return this.http.get(`${this.ESTUDIANTES_SERVER}/estudiantes/listar/${carnet}`)
}

eliminarEstudiante(carnet: string): Observable<number>{
  return this.http.delete<number>(`${this.ESTUDIANTES_SERVER}/estudiantes/eliminar/${carnet}`);
}

crearEstudiante(estudiante: EstudiantesI): Observable<EstudiantesI> {
    return this.http.post<EstudiantesI>(`${this.ESTUDIANTES_SERVER}/estudiantes/crear`,estudiante);
}

actualizarEstudiante(estudiante: EstudiantesI, carnet: string | null): Observable<EstudiantesI> {
  return this.http.put<EstudiantesI>(`${this.ESTUDIANTES_SERVER}/estudiantes/editar/${carnet}`,estudiante);
}

logout(): string{
  this.token = '';
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem('EXPIRES_IN');
  return '';
}

}
