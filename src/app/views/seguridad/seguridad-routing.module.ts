import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';

import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'mi-perfil',
    component: MiPerfilComponent
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
