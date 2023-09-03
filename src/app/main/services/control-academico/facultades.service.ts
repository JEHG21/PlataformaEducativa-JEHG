import { Injectable } from '@angular/core';
import { FacultadesI } from 'src/app/interfaces/control-academico/facultades'; 
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FacultadesService {
    SERVER: string = 'http://localhost:3000';
  private token: string;

  listadoFacultades: any[] = []

constructor(private http:HttpClient) { }

getFacultades() {
  return this.http.get(`${this.SERVER}/facultades/listar`)
}

actualizarFacultad(facultad: FacultadesI, idFacultad: string | null): Observable<FacultadesI> {
  return this.http.put<FacultadesI>(`${this.SERVER}/facultades/editar/${idFacultad}`,facultad);
}

getFacultadByID(idFacultad: string | null) {
  return this.http.get(`${this.SERVER}/facultades/listar/${idFacultad}`)
}

eliminarFacultad(idFacultad: string): Observable<number>{
  return this.http.delete<number>(`${this.SERVER}/facultades/eliminar/${idFacultad}`);
}

crearFacultad(facultad: FacultadesI): Observable<FacultadesI> {
    return this.http.post<FacultadesI>(`${this.SERVER}/facultades/crear`,facultad);
}

logout(): string{
  this.token = '';
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem('EXPIRES_IN');
  return '';
}

}
