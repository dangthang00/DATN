import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { DanhsachsanphamComponent } from './main/product/danhsachsp/danhsachsanpham/danhsachsanpham.component';
import { LoaispComponent } from './main/product/loaisp/loaisp.component';
import { KhachhangComponent } from './main/product/khachhang/khachhang.component';
import { NhacungcapComponent } from './main/product/nhacungcap/nhacungcap.component';
import { ChitiethoadonComponent } from './main/product/chitiethoadon/chitiethoadon.component';
import { HoadonComponent } from './main/product/hoadon/hoadon.component';
import { NhanvienComponent } from './main/product/nhanvien/nhanvien.component';
import { QuatangComponent } from './main/product/quatang/quatang.component';
import { KhoComponent } from './main/product/kho/kho.component';
import { ChitietkhoComponent } from './main/product/chitietkho/chitietkho.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DanhsachsanphamComponent,
    LoaispComponent,
    KhachhangComponent,
    NhacungcapComponent,
    ChitiethoadonComponent,
    HoadonComponent,
    NhanvienComponent,
    NhacungcapComponent,
    QuatangComponent,
    KhoComponent,
    ChitietkhoComponent,


  ],
  imports: [
    BrowserModule,ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
