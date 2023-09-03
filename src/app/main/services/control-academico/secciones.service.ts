import { Injectable } from '@angular/core';
import { SeccionesI } from 'src/app/interfaces/control-academico/secciones';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SeccionesService {
    SERVER: string = 'http://localhost:3000';
  private token: string;

  listadoSecciones: any[] = []

constructor(private http:HttpClient) { }

getSecciones() {
  return this.http.get(`${this.SERVER}/secciones/listar`)
}

actualizarSeccion(seccion: SeccionesI, idSeccion: string | null): Observable<SeccionesI> {
  return this.http.put<SeccionesI>(`${this.SERVER}/secciones/editar/${idSeccion}`,seccion);
}

getSeccionByID(idSeccion: string | null) {
  return this.http.get(`${this.SERVER}/secciones/listar/${idSeccion}`)
}

eliminarSeccion(idSeccion: string): Observable<number>{
  return this.http.delete<number>(`${this.SERVER}/secciones/eliminar/${idSeccion}`);
}

crearSeccion(seccion: SeccionesI): Observable<SeccionesI> {
    return this.http.post<SeccionesI>(`${this.SERVER}/secciones/crear`,seccion);
}

logout(): string{
  this.token = '';
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem('EXPIRES_IN');
  return '';
}

}
