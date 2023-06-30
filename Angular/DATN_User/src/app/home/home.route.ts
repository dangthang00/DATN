import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CartComponent } from './cart/cart.component';
import { ShopComponent } from './shop/shop.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about/about.component';
import { DanhsachComponent } from './danhsach/danhsach.component';
import { LoginComponent } from './login/login.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TimkiemspComponent } from './timkiemsp/timkiemsp.component';

export const homeRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'index',component:IndexComponent},
      { path: 'shop-detail/:id',component:ShopDetailComponent},
      { path: 'blog',component:BlogComponent},
      { path: 'shop',component:ShopComponent},
      { path: 'cart',component:CartComponent},
      { path: 'blog-detail/:id',component:BlogDetailComponent},
      { path: 'contact',component:ContactComponent},
      { path: 'about',component:AboutComponent},
      { path: 'login',component:LoginComponent},
      { path: 'timkiemsp',component:TimkiemspComponent},
      { path: 'checkout',component:CheckoutComponent},
      { path: 'danhsach/:id',component:DanhsachComponent},
      //{ path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)},
    ]
  }
];
