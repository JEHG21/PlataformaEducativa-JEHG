import { Injectable } from '@angular/core';
import { CalificacionesI } from 'src/app/interfaces/control-notas/calificaciones'; 
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CalificacionesService {
    SERVER: string = 'http://localhost:3000';
  private token: string;

  listadoCalificaciones: any[] = []

constructor(private http:HttpClient) { }

getCalificaciones() {
  return this.http.get(`${this.SERVER}/calificaciones/listar`)
}

actualizarCalificacion(calificacion: CalificacionesI, idCalificacion: string | null): Observable<CalificacionesI> {
  return this.http.put<CalificacionesI>(`${this.SERVER}/calificaciones/editar/${idCalificacion}`,calificacion);
}

getCalificacionByID(idCalificacion: string | null) {
  return this.http.get(`${this.SERVER}/calificaciones/listar/${idCalificacion}`)
}

eliminarCalificacion(idCalificacion: string): Observable<number>{
  return this.http.delete<number>(`${this.SERVER}/calificaciones/eliminar/${idCalificacion}`);
}

crearCalificacion(calificacion: CalificacionesI): Observable<CalificacionesI> {
    return this.http.post<CalificacionesI>(`${this.SERVER}/calificaciones/crear`,calificacion);
}

logout(): string{
  this.token = '';
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem('EXPIRES_IN');
  return '';
}

}
