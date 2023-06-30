import { AfterViewInit, Component, OnInit, Renderer2,Injector } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { BaseComponent } from 'src/app/core/common/base-component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent extends BaseComponent implements OnInit {
  public item:any;
  constructor(private renderer: Renderer2 ,private Home: HomeService, injector: Injector) {
super(injector);
}
Dstintuc: any=[];
Dstintuc1: any=[];
Dstintuc2: any=[];
Dstintuc3: any=[];
Dstintuc4: any=[];
Dstintuc5: any=[];
Dstintuc6: any=[];

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('/api/tintuc/get-by-id/'+1).subscribe(res => {
      this.Dstintuc = res;
    });
    this._api.get('/api/tintuc/get-by-id/'+2).subscribe(res => {
      this.Dstintuc1 = res;
    });
    this._api.get('/api/tintuc/get-by-id/'+3).subscribe(res => {
      this.Dstintuc2 = res;
    });
    this._api.get('/api/tintuc/get-by-id/'+4).subscribe(res => {
      this.Dstintuc3 = res;
    });
    this._api.get('/api/tintuc/get-by-id/'+5).subscribe(res => {
      this.Dstintuc4 = res;
    });
    this._api.get('/api/tintuc/get-by-id/'+6).subscribe(res => {
      this.Dstintuc5 = res;
    });
    this._api.get('/api/tintuc/get-by-id/'+id).subscribe(res => {
      this.Dstintuc6 = res;
    });
  })
}
ngAfterViewInit() {
  this.loadScripts('../../assets/js/jquery-3.3.1.min.js','../../assets/js/bootstrap.min.js','../../assets/js/jquery.nice-select.min.js',
  '../../assets/js/jquery-ui.min.js','../../assets/js/jquery.slicknav.js','../../assets/js/mixitup.min.js','../../assets/js/owl.carousel.min.js',
  '../../assets/js/main.js',);
  }

}
