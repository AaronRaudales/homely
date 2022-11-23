import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedAnfitrionComponent } from './feed-anfitrion/feed-anfitrion.component';
import { FeedClienteComponent } from './feed-cliente/feed-cliente.component';
import { FeedDetallePropiedadComponent } from './feed-detalle-propiedad/feed-detalle-propiedad.component';


const routes: Routes = [
  {
    path: 'feed-cliente',
    component: FeedClienteComponent
  },
  {
    path: 'feed-anfitrion/:tipo',
    component: FeedAnfitrionComponent
  },
  {
    path: 'feed-detalle-propiedad',
    component: FeedDetallePropiedadComponent
  }
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }