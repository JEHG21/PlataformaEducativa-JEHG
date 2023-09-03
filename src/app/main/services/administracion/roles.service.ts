import { Injectable } from '@angular/core';
import { RolesI } from 'src/app/interfaces/administracion/roles'; 
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RolesService {
    SERVER: string = 'http://localhost:3000';
  private token: string;

  listadoRoles: any[] = []

constructor(private http:HttpClient) { }

getRoles() {
  return this.http.get(`${this.SERVER}/roles/listar`)
}

actualizarRol(rol: RolesI, _id: string | null): Observable<RolesI> {
  return this.http.put<RolesI>(`${this.SERVER}/roles/editar/${_id}`,rol);
}

getRolByID(_id: string | null) {
  return this.http.get(`${this.SERVER}/roles/listar/${_id}`)
}

eliminarRol(_id: string): Observable<number>{
  return this.http.delete<number>(`${this.SERVER}/roles/eliminar/${_id}`);
}

crearRol(rol: RolesI): Observable<RolesI> {
    return this.http.post<RolesI>(`${this.SERVER}/roles/crear`,rol);
}

logout(): string{
  this.token = '';
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem('EXPIRES_IN');
  return '';
}

}
