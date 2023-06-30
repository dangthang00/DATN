import { AdminComponent } from './admin.component';
import { Routes } from '@angular/router';


export const adminRoutes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', component: AdminComponent },
      { path: 'index',component:AdminComponent},

      //{ path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)},
    ]
  }
];
