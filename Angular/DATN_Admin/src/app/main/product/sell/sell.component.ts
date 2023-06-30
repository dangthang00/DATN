import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/authentication/authentication.service';
import { BaseComponent } from '../../../core/common/base-component';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent extends BaseComponent implements OnInit {
  public list_item: any;
  public list_order: any = [];
  public tong: number;
  public frmHoaDon: FormGroup;
  constructor(injector: Injector, private authenticationService: AuthenticationService) {
    super(injector);
    this.frmHoaDon = new FormGroup({
      'txt_hoten': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
      'txt_dienthoai': new FormControl('', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'txt_tinkhac': new FormControl('', []),
    });
  }

  get dienthoai() {
    return this.frmHoaDon.get('txt_dienthoai')!;
  }
  get hoten() {
    return this.frmHoaDon.get('txt_hoten')!;
  }

  ngOnInit(): void {
    this._api.post('/api/sell/search', { page: 1, pageSize: 10 }).subscribe(res => {
      this.list_item = res.data;
      setTimeout(() => {
        this.loadScripts('assets/js/core/app.js');
      });
    });

  }

  public ThanhToan(vl:any) {
    if (this.frmHoaDon.invalid) {
      return;
    }
    let user = this.authenticationService.userValue;
    let obj:any = {};
    obj.khachhang = {
      TenKhachHang: vl.txt_hoten,
      SoDienThoai: vl.txt_dienthoai
    }
    obj.hoadon = {
      MaNguoiDung: user.maNguoiDung
    }
    obj.chitiethoadon = [];
    this.list_order.forEach((x: any) => {
      obj.chitiethoadon.push({
        MaSanPham: x.maSanPham,
        SoLuong: x.soLuong,
        GiaBan: x.gia
      });
    });
    this._api.post('/api/sell/create-hoadonxuat', obj).subscribe(res => {
      if (res && res.data) {
        alert('Thêm dữ liệu thành công')
      } else {
        alert('Có lỗi')
      }
    });
  }
  public delete(maSanPham: any) {
    this.list_order = this.list_order.filter((x: any) => x.maSanPham != maSanPham);
    this.tong = this.list_order.reduce((sum: any, x: any) => sum + x.gia * x.soLuong, 0);
  }



  public Add(item: any) {
    if (this.list_order.length == 0) {
      item.soLuong = 1;
      this.list_order = [item];
    } else {
      let ok = true;
      for (let x of this.list_order) {
        if (x.maSanPham == item.maSanPham) {
          x.soLuong += 1;
          ok = false;
          break;
        }
      }
      if (ok) {
        item.soLuong = 1;
        this.list_order.push(item);
      }
    }
    this.tong = this.list_order.reduce((sum: any, x: any) => sum + x.gia * x.soLuong, 0);
  }
  public TinhToan() {
    this.tong = this.list_order.reduce((sum: any, x: any) => sum + x.gia * x.soLuong, 0);
  }
}
