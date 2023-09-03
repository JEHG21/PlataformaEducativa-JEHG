import { Injectable } from '@angular/core';
import { ActividadesZonaI } from 'src/app/interfaces/control-notas/actividades-zona'; 
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ActividadesZonaService {
    SERVER: string = 'http://localhost:3000';
  private token: string;

  listadoActividades: any[] = []

constructor(private http:HttpClient) { }

getActividades() {
  return this.http.get(`${this.SERVER}/actividades/listar`)
}

actualizarActividad(actividad: ActividadesZonaI, idActividad: string | null): Observable<ActividadesZonaI> {
  return this.http.put<ActividadesZonaI>(`${this.SERVER}/actividades/editar/${idActividad}`,actividad);
}

getActividadByID(idActividad: string | null) {
  return this.http.get(`${this.SERVER}/actividades/listar/${idActividad}`)
}

eliminarActividad(idActividad: string): Observable<number>{
  return this.http.delete<number>(`${this.SERVER}/actividades/eliminar/${idActividad}`);
}

crearActividad(actividad: ActividadesZonaI): Observable<ActividadesZonaI> {
    return this.http.post<ActividadesZonaI>(`${this.SERVER}/actividades/crear`,actividad);
}

logout(): string{
  this.token = '';
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem('EXPIRES_IN');
  return '';
}

}
