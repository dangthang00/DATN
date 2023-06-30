import { AfterViewInit, Component, OnInit, Renderer2,Injector } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { BaseComponent } from 'src/app/core/common/base-component';
import { CartService } from 'src/app/core/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-danhsach',
  templateUrl: './danhsach.component.html',
  styleUrls: ['./danhsach.component.css']
})
export class DanhsachComponent extends BaseComponent implements OnInit {
  public item:any;
  constructor(private renderer: Renderer2 ,private _cart: CartService,private Home: HomeService, injector: Injector) {
super(injector);
}
host = environment.BASE_API;


Dssp: any=[];
Dslsp: any=[];
listbycategory: any=[];



page:number = 1;
count:number = 0;
public tablesize:number = 5;
table_numberSize:any = [5,10,15];

  ngOnInit(): void {
    this.Home.getAllSP().subscribe(res => {
      this.Dssp = res;
})
  this.Home.getloaisp().subscribe(res => {
    this.Dslsp = res;
})
this._route.params.subscribe(params => {
  let id = params['id'];
  this._api.get('/api/maloai/get-by-id/'+id).subscribe(res => {
  this.listbycategory = res;
  console.log(this.listbycategory)
  });
})
}
sizeChange(event:any):void{
  this.tablesize = event.target.value; debugger
  this.page = 1;
  this. get();
}
  get() {
    throw new Error('Method not implemented.');
  }
dataChange(event:any):void{
  this.page = event;
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


