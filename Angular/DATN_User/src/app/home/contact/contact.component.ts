import { AfterViewInit, Component, OnInit, Renderer2,Injector } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import {  FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/core/common/base-component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends BaseComponent implements OnInit {
  public item:any;
  constructor(private renderer: Renderer2 ,private Home: HomeService, injector: Injector) {
super(injector);
}


Dssp: any=[];
public frmMail: FormGroup ;



page:number = 1;
count:number = 0;
public tablesize:number = 5;
table_numberSize:any = [5,10,15];

  ngOnInit(): void {
    this.Home.getmail().subscribe(res => {
      this.Dssp = res;
      this.frmMail = new FormGroup({
        'txt_to': new FormControl('', [Validators.email]),
        'txt_subject': new FormControl('', [Validators.required]),
        'txt_body': new FormControl('',[Validators.required])
    });
  });
}
get noidung() {
  return this.frmMail.get('txt_body')!;
}
get tieude() {
  return this.frmMail.get('txt_subject')!;
}
get email() {
  return this.frmMail.get('txt_to')!;
}
public onSubmit(val: any) {
  if (this.frmMail.invalid) {
    return;
  }
  debugger;
  let obj: any = {};
  obj.mail = {
    To: val.txt_to,
    Subject: val.txt_subject,
    Body: val.txt_body,
  };
  obj.mail = [];
  this.Dssp.forEach((x: any) => {
    obj.mail.push({
      To: x.to,
      Subject: x.subject,
      Body: x.body
    });
  });
  console.log(obj);
  debugger;
  this._api.post('/api/mail/sendemail', obj).subscribe(res => {
    if (res && res.data) {
      alert('gui thanh cong')
    } else {
      alert('Có lỗi')
    }
    localStorage.clear();
  });




}
  ngAfterViewInit() {
    this.loadScripts('../../assets/js/jquery-3.3.1.min.js','../../assets/js/bootstrap.min.js','../../assets/js/jquery.nice-select.min.js',
    '../../assets/js/jquery-ui.min.js','../../assets/js/jquery.slicknav.js','../../assets/js/mixitup.min.js','../../assets/js/owl.carousel.min.js',
    '../../assets/js/main.js',);
   }
}







