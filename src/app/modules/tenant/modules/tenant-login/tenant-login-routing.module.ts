import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantLoginComponent } from 'src/app/modules/tenant/modules/tenant-login/components/tenant-login/tenant-login.component';
import { TenantGuestGuard } from 'src/app/guards/tenant-guest.guard';

const routes: Routes = [
  {
    path: '',
    component: TenantLoginComponent,
    canActivate: [ TenantGuestGuard ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TenantLoginRoutingModule {
}
