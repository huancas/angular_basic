import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Medico } from 'src/app/_model/medico';
//import { Medico } from 'src/app/_model/medico';
import { MedicoService } from 'src/app/_service/medico.service';
import { MedicoDialogoComponent } from './medico-dialogo/medico-dialogo.component';
//import { MedicoDialogoComponent } from './medico-dialogo/medico-dialogo.component';
import { Router, ActivatedRoute, Params, provideRoutes } from '@angular/router';


@Component({
  selector: 'app-medico-tipo',
  templateUrl: './medicotipo.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoTipoComponent implements OnInit {

  displayedColumns = ['idmedico', 'nombres', 'apellidos', 'cmp', 'acciones'];
  dataSource: MatTableDataSource<Medico>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private medicoService: MedicoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private _route:ActivatedRoute,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.listarMedicoTipo();

    this.medicoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

   /* this.medicoService.listar().subscribe(data => {
      this.crearTabla(data);
    });*/
  }
  listarMedicoTipo(){
    this._route.params.forEach((params:Params)=>{  
      let id = params['id'] ;
      console.log('id:'+id);
     this.medicoService.listarPorIdMedico(id).subscribe(data => {
         console.log(data);
        this.crearTabla(data);
      }); 
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  crearTabla(data: Medico[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  abrirDialogo(medico?: Medico) {
    this.dialog.open(MedicoDialogoComponent, {
      width: '250px',
      data: medico
    });
  }

  eliminar(medico: Medico) {
    this.medicoService.eliminar(medico.pkID.tl_clave).pipe(switchMap(() => {
      return this.medicoService.listar();
    }))
      .subscribe(data => {
        this.medicoService.setMensajeCambio("SE ELIMINO");
        this.medicoService.setMedicoCambio(data);
      });
  }



}
