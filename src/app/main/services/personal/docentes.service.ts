import { Injectable } from '@angular/core';
import { DocentesI } from 'src/app/interfaces/personal/docentes';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DocentesService {
    SERVER: string = 'http://localhost:3000';
  private token: string;

  listadoDocentes: any[] = []

constructor(private http:HttpClient) { }

getDocentes() {
  return this.http.get(`${this.SERVER}/docentes/listar`)
}

actualizarDocente(docente: DocentesI, dpi: string | null): Observable<DocentesI> {
  return this.http.put<DocentesI>(`${this.SERVER}/docentes/editar/${dpi}`,docente);
}

getDocenteByID(dpi: string | null) {
  return this.http.get(`${this.SERVER}/docentes/listar/${dpi}`)
}

eliminarDocente(dpi: string): Observable<number>{
  return this.http.delete<number>(`${this.SERVER}/docentes/eliminar/${dpi}`);
}

crearDocente(docente: DocentesI): Observable<DocentesI> {
    return this.http.post<DocentesI>(`${this.SERVER}/docentes/crear`,docente);
}

logout(): string{
  this.token = '';
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem('EXPIRES_IN');
  return '';
}

}
