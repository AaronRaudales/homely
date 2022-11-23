import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropiedadComponent } from './propiedad/propiedad.component';


const routes: Routes = [
  {
    path: 'propiedad',
    component: PropiedadComponent
  }
  /*{
    path: 'tipo-proceso',
    component: TipoProcesoComponent
  },
  {
    path: 'tipo-tecnologia',
    component: TipoTecnologiaComponent
  },
  {
    path: 'estado-envio',
    component: EstadoEnvioComponent
  },
  {
    path: 'tipo-tarjeta',
    component: TipoTarjetaComponent
  },
  {
    path: 'agencia',
    component: AgenciaComponent
  },
  {
    path: 'logo',
    component: LogoComponent
  }*/
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientosRoutingModule { }
