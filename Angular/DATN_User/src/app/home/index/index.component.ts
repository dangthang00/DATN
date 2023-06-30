import { AfterViewInit, Component, OnInit, Renderer2,Injector } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { BaseComponent } from 'src/app/core/common/base-component';
import { CartService } from 'src/app/core/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends BaseComponent implements OnInit {
  public item:any;
  constructor(private renderer: Renderer2 ,private _cart: CartService, private Home: HomeService, injector: Injector) {
super(injector);
}
title= 'pagination'

page:number = 1;
count:number = 0;
public tablesize:number = 12;
table_numberSize:any = [12,24,36];

 Dssp: any=[];
 Dslsp: any=[];
 spmoi: any=[];
 giaban: any=[];
 soluong: any=[];
 Dstintuc: any=[];
 Dstintuc1: any=[];
 Dstintuc2: any=[];
 product: any;

 host = environment.BASE_API;


 public _addToCart(item: any) {
  this._cart.addToCart(item);

  alert('Đã thêm vào giở hàng thành công');

}

ngOnInit(): void {
  this.Home.getAllSP().subscribe(res => {
    this.Dssp = res;
})

  this.Home.getloaisp().subscribe(res => {
    this.Dslsp = res;
})
this.Home.getSpmoi().subscribe(res => {
  this.spmoi = res;
})
this.Home.getGiaban().subscribe(res => {
  this.giaban = res;
})
this.Home.getSoLuong().subscribe(res => {
  this.soluong = res;
})

this._route.params.subscribe(params => {
  let id = params['id'];
  this._api.get('/api/tintuc/get-by-id/'+1).subscribe(res => {
  this.Dstintuc = res;
});


})
this._api.get('/api/tintuc/get-by-id/'+2).subscribe(res => {
  this.Dstintuc1 = res;
});
this._api.get('/api/tintuc/get-by-id/'+3).subscribe(res => {
  this.Dstintuc2 = res;
});

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
  this._api.get('http://localhost:10282/api/sanpham/timkiem_theoten?any='+name).subscribe(data=>{
    this.Dssp = data;
  });
}

ngAfterViewInit() {
  this.loadScripts('../../assets/js/jquery-3.3.1.min.js','../../assets/js/bootstrap.min.js','../../assets/js/jquery.nice-select.min.js',
  '../../assets/js/jquery-ui.min.js','../../assets/js/jquery.slicknav.js','../../assets/js/mixitup.min.js','../../assets/js/owl.carousel.min.js',
  '../../assets/js/main.js',);
 }



}
