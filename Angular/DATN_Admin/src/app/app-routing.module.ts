import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DanhsachsanphamComponent } from './main/product/danhsachsp/danhsachsanpham/danhsachsanpham.component';
import { LoaispComponent } from './main/product/loaisp/loaisp.component';
import { KhachhangComponent } from './main/product/khachhang/khachhang.component';
import { NhacungcapComponent } from './main/product/nhacungcap/nhacungcap.component';
import { ChitiethoadonComponent } from './main/product/chitiethoadon/chitiethoadon.component';
import { XemcthoadonComponent } from './main/product/xemcthoadon/xemcthoadon.component';
import { QuatangComponent } from './main/product/quatang/quatang.component';
import { KhoComponent } from './main/product/kho/kho.component';
import { ChitietkhoComponent } from './main/product/chitietkho/chitietkho.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule), canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'danhsachsanpham', component: DanhsachsanphamComponent },
  { path: 'loaisp', component: LoaispComponent },
  { path: 'khachhang', component: KhachhangComponent },
  { path: 'quatang', component: QuatangComponent },
  { path: 'kho', component: KhoComponent },
  { path: 'nhacungcap', component: NhacungcapComponent },
  { path: 'chitiethoadon/:id', component: ChitiethoadonComponent },
  { path: 'xemcthoadon/:id', component: XemcthoadonComponent },
  { path: 'chitietkho/:id', component: ChitietkhoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
