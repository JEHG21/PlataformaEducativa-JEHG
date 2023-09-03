import { Injectable } from '@angular/core';
import { SedesI } from 'src/app/interfaces/control-academico/sedes';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SedesService {
    SERVER: string = 'http://localhost:3000';
  private token: string;

  listadoSedes: any[] = []

constructor(private http:HttpClient) { }

getSedes() {
  return this.http.get(`${this.SERVER}/sedes/listar`)
}

actualizarSede(sede: SedesI, idSede: string | null): Observable<SedesI> {
  return this.http.put<SedesI>(`${this.SERVER}/sedes/editar/${idSede}`,sede);
}

getSedeByID(idSede: string | null) {
  return this.http.get(`${this.SERVER}/sedes/listar/${idSede}`)
}

eliminarSede(idSede: string): Observable<number>{
  return this.http.delete<number>(`${this.SERVER}/sedes/eliminar/${idSede}`);
}

crearSede(sede: SedesI): Observable<SedesI> {
    return this.http.post<SedesI>(`${this.SERVER}/sedes/crear`,sede);
}

logout(): string{
  this.token = '';
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem('EXPIRES_IN');
  return '';
}

}
