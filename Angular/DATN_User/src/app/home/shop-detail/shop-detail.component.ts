import { AfterViewInit, Component, OnInit, Renderer2,Injector } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { BaseComponent } from 'src/app/core/common/base-component';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent extends BaseComponent implements OnInit {
  public item:any;
  constructor(private renderer: Renderer2 ,private _cart: CartService, private Home: HomeService, injector: Injector) {
    super(injector);
  }

  sp: any;
  listbycategory: any=[];
  public list: any;
  public tTong =0;

  public _addToCart(item: any) {
    this._cart.addToCart(item);

    alert('Đã thêm vào giở hàng thành công');
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('/api/sanpham/get-by-id/'+id).subscribe(res => {
      this.sp = res;
      console.log(this.sp)

      this._api.get('/api/maloai/get-by-id/'+res[0].maLoai).subscribe(res => {
      this.listbycategory = res;
      console.log(res.maLoai);
      console.log(this.listbycategory)

      })

    });
    });


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


}
