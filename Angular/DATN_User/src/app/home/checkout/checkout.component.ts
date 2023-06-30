import { Component, Injector, OnInit } from '@angular/core';
import {  FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/core/common/base-component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent extends BaseComponent implements OnInit {
  public frmKhach: FormGroup ;
  public list_items: any;
  public list: any;
  public tTong =0;
  constructor(injector: Injector) {
    super(injector);
  }


  ngOnInit(): void {
    this.list_items = JSON.parse(localStorage.getItem('cart') || '[]');
    this.tTong = this.list_items.reduce((sum: any, x: any) => sum + x.giaBan * x.quantity, 0);
    this.frmKhach = new FormGroup({
      'txt_hoten': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      'txt_sdt': new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'txt_email': new FormControl('', [Validators.email]),
      'txt_diachi': new FormControl('', [Validators.required]),
      'txt_ghichu': new FormControl('')
    });
  }
    get hoten() {
      return this.frmKhach.get('txt_hoten')!;
    }
    get sodienthoai() {
      return this.frmKhach.get('txt_sdt')!;
    }
    get email() {
      return this.frmKhach.get('txt_email')!;
    }
    get diachi() {
      return this.frmKhach.get('txt_diachi')!;
    }
    public onSubmit(val: any) {
      if (this.frmKhach.invalid) {
        return;
      }
      debugger;
      let obj: any = {};
      obj.khach = {
        TenKhachHang: val.txt_hoten,
        DiaChi: val.txt_diachi,
        SoDienThoai: val.txt_sdt,
        Email: val.txt_email
      };
      obj.donhang = [];
      this.list_items.forEach((x: any) => {
        obj.donhang.push({
          MaSP: x.maSP,
          SoLuong: x.quantity,
          GiaMua: x.giaBan
        });
      });
      console.log(obj);
      debugger;
      this._api.post('/api/customers/create-giohang', obj).subscribe(res => {
        if (res && res.data) {
          alert('Đặt hàng thành công')
        } else {
          alert('Có lỗi')
        }
        localStorage.clear();
      });

  }
}
