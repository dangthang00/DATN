import { AfterViewInit, Component, OnInit, Renderer2,Injector } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { BaseComponent } from 'src/app/core/common/base-component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent extends BaseComponent implements OnInit {
  public item:any;
  constructor(private api:HttpClient, private renderer: Renderer2 ,private _cart: CartService,private Home: HomeService, injector: Injector) {
super(injector);
}
public _addToCart(item: any) {
  this._cart.addToCart(item);

  alert('Đã thêm vào giở hàng thành công');
}



  size:any = 5;
  active=true;
  Mode = '0'
  modal = false;

title= 'pagination'

page:number = 1;
count:number = 0;
public tablesize:number = 5;
table_numberSize:any = [5,10,15];



Dssp: any=[];
spmoi: any=[];
Dslsp: any=[];
product: any;

host = environment.BASE_API;


  ngOnInit(): void {
    this.Home.getAllSP().subscribe(res => {
      this.Dssp = res;
  })
  this.Home.getSpmoi().subscribe(res => {
    this.spmoi = res;
  })
  this.Home.getloaisp().subscribe(res => {
    this.Dslsp = res;
})
}
sizeChange(event:any):void{
  this.tablesize = event.target.value; debugger
  this.page = 1;
  this. get();
}
dataChange(event:any):void{
  this.page = event;
}

get():void{
  this._api.get(this.host+'/sanpham/getAll/').subscribe(data=>{
    this.product = data;

  });
}



search(){
  let name = (<HTMLInputElement>document.getElementById('searchs')).value;
  console.log(name);
  this.api.get('http://localhost:10282/api/sanpham/timkiem_theoten?any='+name).subscribe(data=>{
    this.Dssp = data;
  });
}




ngAfterViewInit() {
  this.loadScripts('../../assets/js/jquery-3.3.1.min.js','../../assets/js/bootstrap.min.js','../../assets/js/jquery.nice-select.min.js',
  '../../assets/js/jquery-ui.min.js','../../assets/js/jquery.slicknav.js','../../assets/js/mixitup.min.js','../../assets/js/owl.carousel.min.js',
  '../../assets/js/main.js',);
  }

}
