import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagoComponent } from './pago/pago.component';
import { PropiedadesFavoritasComponent } from './propiedades-favoritas/propiedades-favoritas.component';


const routes: Routes = [
  {
    path: 'pago',
    component: PagoComponent
  },
  {
    path: 'propiedades-favoritas',
    component: PropiedadesFavoritasComponent
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
export class ReservacionRoutingModule { }
