import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MedicoComponent } from './pages/medico/medico.component';
import { MedicoTipoComponent } from './pages/medico/medicotipo.component';


const routes: Routes = [
  
  { path: 'medico',children:[
     {path: '', component: MedicoComponent } ,
     {path: 'detalles/:id', component: MedicoTipoComponent } 
    
    ] },
  {path: 'detalle/:id', component: MedicoTipoComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
