import { Injectable } from '@angular/core';
import { CursosI } from 'src/app/interfaces/control-academico/cursos'; 
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CursosService {
    SERVER: string = 'http://localhost:3000';
  private token: string;

  listadoCursos: any[] = []

constructor(private http:HttpClient) { }

getCursos() {
  return this.http.get(`${this.SERVER}/cursos/listar`)
}

actualizarCurso(curso: CursosI, idCurso: string | null): Observable<CursosI> {
  return this.http.put<CursosI>(`${this.SERVER}/cursos/editar/${idCurso}`,curso);
}

getCursoByID(idCurso: string | null) {
  return this.http.get(`${this.SERVER}/cursos/listar/${idCurso}`)
}

eliminarCurso(idCurso: string): Observable<number>{
  return this.http.delete<number>(`${this.SERVER}/cursos/eliminar/${idCurso}`);
}

crearCurso(curso: CursosI): Observable<CursosI> {
    return this.http.post<CursosI>(`${this.SERVER}/cursos/crear`,curso);
}

logout(): string{
  this.token = '';
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem('EXPIRES_IN');
  return '';
}

}
