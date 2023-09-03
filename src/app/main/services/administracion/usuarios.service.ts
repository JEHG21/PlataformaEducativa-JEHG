import { Injectable } from '@angular/core';
import { UsuariosI } from 'src/app/interfaces/administracion/usuarios';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {
    SERVER: string = 'http://localhost:3000';
  private token: string;

  listadoUsuarios: any[] = []

constructor(private http:HttpClient) { }

getUsuarios() {
  return this.http.get(`${this.SERVER}/usuarios/listar`)
}

actualizarUsuario(usuario: UsuariosI, _id: string | null): Observable<UsuariosI> {
  return this.http.put<UsuariosI>(`${this.SERVER}/usuarios/editar/${_id}`,usuario);
}

getUsuarioByID(_id: string | null) {
  return this.http.get(`${this.SERVER}/usuarios/listar/${_id}`)
}

eliminarUsuario(_id: string): Observable<number>{
  return this.http.delete<number>(`${this.SERVER}/usuarios/eliminar/${_id}`);
}

// crearUsuario(usuario: UsuariosI): Observable<UsuariosI> {
//     return this.http.post<UsuariosI>(`${this.SERVER}/usuarios/crear`,usuario);
// }

logout(): string{
  this.token = '';
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem('EXPIRES_IN');
  return '';
}

}
