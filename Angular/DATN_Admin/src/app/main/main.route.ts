import { MainComponent } from './main.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleGuard } from '../core/guards/role.guard';
import { Role } from '../entities/role';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { UnauthorizedComponent } from '../shared/components/unauthorized/unauthorized.component';
export const MainRoutes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
        canActivate: [RoleGuard],
        data: { roles: [Role.Admin] },
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./product/product.module').then((m) => m.ProductModule),

      },
    ]
  }
];
