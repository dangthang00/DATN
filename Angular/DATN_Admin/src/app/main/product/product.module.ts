import { DanhsachsanphamComponent } from './danhsachsp/danhsachsanpham/danhsachsanpham.component';
import { LoaispComponent } from './loaisp/loaisp.component';
import { KhachhangComponent } from './khachhang/khachhang.component';
import { ChitiethoadonComponent } from './chitiethoadon/chitiethoadon.component';
import { NhacungcapComponent } from './nhacungcap/nhacungcap.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderComponent } from './order/order.component';
import { SellComponent } from './sell/sell.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DoanhthuComponent } from './doanhthu/doanhthu.component';
import { HoadonComponent } from './hoadon/hoadon.component';
import { NhanvienComponent } from './nhanvien/nhanvien.component';
import { XemcthoadonComponent } from './xemcthoadon/xemcthoadon.component';
import { QuatangComponent } from './quatang/quatang.component';
import { KhoComponent } from './kho/kho.component';
import { ChitietkhoComponent } from './chitietkho/chitietkho.component';



@NgModule({
  declarations: [OrderComponent, SellComponent, DoanhthuComponent,  XemcthoadonComponent, ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'order',
        component: OrderComponent,
      },
      {
        path: 'sell',
        component: SellComponent,
      },
      {
        path: 'danhsachsp',
        component: DanhsachsanphamComponent,
      },
      {
        path: 'loaisp',
        component: LoaispComponent,
      },
      {
        path: 'khachhang',
        component: KhachhangComponent,
      },
      {
        path: 'chitiethoadon',
        component: ChitiethoadonComponent,
      },
      {
        path: 'nhacungcap',
        component: NhacungcapComponent,
      },
      {
        path: 'doanhthu',
        component: DoanhthuComponent,
      },
      {
        path: 'hoadon',
        component: HoadonComponent,
      },
      {
        path: 'nhanvien',
        component: NhanvienComponent,
      },
      {
        path: 'xemcthoadon/:id',
        component: XemcthoadonComponent,
      },
      {
        path: 'chitietkho',
        component: ChitietkhoComponent,
      },
      {
        path: 'quatang',
        component: QuatangComponent,
      },
      {
        path: 'kho',
        component: KhoComponent,
      },
  ]),
  ]
})
export class ProductModule { }
