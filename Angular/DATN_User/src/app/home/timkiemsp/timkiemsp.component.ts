import { AfterViewInit, Component, OnInit, Renderer2,Injector } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { BaseComponent } from 'src/app/core/common/base-component';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-timkiemsp',
  templateUrl: './timkiemsp.component.html',
  styleUrls: ['./timkiemsp.component.css']
})
export class TimkiemspComponent extends BaseComponent implements OnInit {
  public item:any;
  constructor(private renderer: Renderer2 ,private Home: HomeService, injector: Injector) {
super(injector);
}
Dssp: any=[];
Dslsp: any=[];
listbycategory: any=[];
danhmuc:any;
product: any;
product_id: any;
nsx_id: any;

host = environment.BASE_API;
page:number = 1;
count:number = 0;
 public tablesize:number = 5;
table_numberSize:any = [5,10,15];
size:any = 5;
formSP!:FormGroup
active=true;
image:any;
add_succes = true;
delete_succes = true;
Mode = '0'
modal = false;


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


get():void{
  this._api.get(this.host+'/get_all').subscribe(data=>{
    this.product = data;
  });
}
search(){
  let name = (<HTMLInputElement>document.getElementById('searchs')).value;
  console.log(name);
  this._api.get(this.host+'/timkiem_theoten?any='+name).subscribe(data=>{
    this.product = data;
  });
}

  ngAfterViewInit() {
    this.loadScripts('../../assets/js/jquery-3.3.1.min.js','../../assets/js/bootstrap.min.js','../../assets/js/jquery.nice-select.min.js',
    '../../assets/js/jquery-ui.min.js','../../assets/js/jquery.slicknav.js','../../assets/js/mixitup.min.js','../../assets/js/owl.carousel.min.js',
    '../../assets/js/main.js',);
   }



}

