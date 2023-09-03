import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CursosI } from 'src/app/interfaces/control-academico/cursos'; 
import { CursosService } from 'src/app/main/services/control-academico/cursos.service'; 
import { SnackBarService } from 'src/app/utils/snackBar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  listadoCursos: CursosI[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _cursoService: CursosService,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService,
    private router: Router,
    ) { 
    }

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(){
    this._cursoService.getCursos().subscribe((res: any)=>{
      this.listadoCursos = res;
      this.dataSource = new MatTableDataSource(this.listadoCursos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

eliminarCurso(idCurso: string): void{
  this._cursoService.eliminarCurso(idCurso)
  .subscribe(res =>{
    this._snackBarService.openSnackBar("¡Curso eliminado exitosamente!");
    this.cargarCursos();
  }, err => {
      if(err.error.code == 409){
  this._snackBarService.openSnackBar("¡El ID del curso no existe!");
  } else {
    this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
   }
  })
}

actualizarCurso(idCurso: string): void{
  localStorage.setItem('curso', idCurso);
}

onLogout(): void{
  this._cursoService.logout();
  this._snackBarService.openSnackBar("Sesión cerrada exitosamente, ¡Vuelve pronto!");
  this.router.navigateByUrl('/auth/inicio-sesion');
}

}
