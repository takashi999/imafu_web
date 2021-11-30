import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'operation',
    loadChildren: () => import('./modules/operation/operation.module').then(m => m.OperationModule),
  },
  {
    path: 'tenant',
    loadChildren: () => import('./modules/tenant/tenant.module').then(m => m.TenantModule),
  },
  {
    path: 'tenant-cast',
    loadChildren: () => import('./modules/cast/cast.module').then(m => m.CastModule),
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
}) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}
