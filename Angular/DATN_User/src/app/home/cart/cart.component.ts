import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/common/base-component';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent extends BaseComponent implements OnInit, AfterViewInit {
  public list: any;
  public tTong =0;
  constructor(injector: Injector,private _cart: CartService, private _router: Router,) {
    super(injector);
  }

  public Checkout () {
    this._router.navigate(['/checkout']);
  }

  ngOnInit(): void {
    this.list = JSON.parse(localStorage.getItem('cart') || '[]');
   this.list.map((x:any)=>{ this.tTong+=x.giaBan*x.quantity});
  }

  ngAfterViewInit() {
    this.loadScripts('../../assets/js/jquery-3.3.1.min.js','../../assets/js/bootstrap.min.js','../../assets/js/jquery.nice-select.min.js',
    '../../assets/js/jquery-ui.min.js','../../assets/js/jquery.slicknav.js','../../assets/js/mixitup.min.js','../../assets/js/owl.carousel.min.js',
    '../../assets/js/main.js',);
   }

  public Giam(maSP: any) {
    var index = this.list.findIndex((x: any) => x.maSP == maSP);
    if (index >= 0 && this.list[index].quantity >= 1) {
      this.list[index].quantity -= 1;
      this.tTong = this.list.reduce((sum:any, x:any) => sum + x.giaBan  * x.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(this.list));
    }
  }
  public Tang(maSP: any) {
    var index = this.list.findIndex((x: any) => x.maSP == maSP);
    if (index >= 0) {
      this.list[index].quantity += 1;
      this.tTong = this.list.reduce((sum:any, x:any) => sum + x.giaBan  * x.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(this.list));
    }
  }
  public XoaCart() {
    if (confirm("Bạn muốn xóa tất cả sản phẩm khỏi giỏ hàng!")) {
        localStorage.setItem('cart','');
        this.list = null;
        this.tTong = 0;
        localStorage.setItem('cart', JSON.stringify(this.list));
    }
  }
  public updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.list));
    alert("Đã cập nhật thông tin giỏ hàng thành công!");
  }
  public Xoa(maSP: any) {
    if (confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng!")) {
      var index = this.list.findIndex((x: any) => x.maSP == maSP);
      if (index >= 0) {
        this.list.splice(index, 1);
        this.tTong = this.list.reduce((sum:any, x:any) => sum + x.giaBan  * x.quantity, 0);
      }
    }
  }
}
