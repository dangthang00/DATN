import { BaseComponent } from 'src/app/core/common/base-component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import MatchValidation from '../../../core/helpers/must-match.validator';
import { AuthenticationService } from './../../../core/authentication/authentication.service';

declare var $: any;
@Component({
  selector: 'app-loaisp',
  templateUrl: './loaisp.component.html',
  styleUrls: ['./loaisp.component.css']
})
export class LoaispComponent extends BaseComponent implements OnInit,AfterViewInit {

  title= 'pagination'

  page:number = 1;
  count:number = 0;
  public tablesize:number = 8;
  table_numberSize:any = [8,16,24];

  list_category: any;
  list_producer: any;
  list_unit: any;
  public frmSearch: FormGroup;
  list_product: any;
  totalProduct: any;
  pageIndex: any = 1;
  pageSize: any = 5;
  public user: any;

  product: any;
  isCreate = false;
  showUpdateModal: any;
  frmProduct: FormGroup;
  doneSetupForm: any;
  file: any;

  imagePreview: any;


  constructor(private authenticationService: AuthenticationService ,injector: Injector) {
    super(injector);
    this.frmSearch = new FormGroup({
      'txt_tenloai': new FormControl(''),
      'txt_maloai': new FormControl(''),
    });
  }

  ngAfterViewInit() {
    this.loadScripts('assets/js/core/app.js', 'assets/js/pages/dashboard.js');
  }
  public LoadData() {
    this._api.post('api/Danhsachlsp/search', { page: 1, pageSize: 10,tenloai: this.frmSearch.value['txt_tenloai']}).subscribe(res => {
      this.list_product = res.data;
      setTimeout(() => {
        this.loadScripts(
          'assets/js/core/app.js',
          'assets/js/pages/datatables_basic.js',
          'assets/js/pages/datatables_basic.js'
        );
      });
    });
  }

  ngOnInit(): void {
    this.loadProduct();
    this.loadCategory();
    this.loadProducer();
    this.loadUnit();
    this.user = this.authenticationService.userValue;
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
  Logout() {
    this.authenticationService.logout();

  }

  public loadUnit(){
    this._api.get('/api/Danhsachlsp/getAll').subscribe(res => {
      this.list_unit = res;
    });
  }

  public loadProducer(){
    this._api.get('/api/Danhsachlsp/getAll').subscribe(res => {
      this.list_producer = res;
    });

  }

  public loadCategory(){
    this._api.get('/api/Danhsachlsp/getAll').subscribe(res => {
      this.list_category = res;
    });

  }

  public loadProduct(){
    this._api.get('/api/Danhsachlsp/getAll'
    ).subscribe(res => {
      this.list_product = res;
 console.log(this.list_product)
    });
  }

  public loadPageIndex(pageIndex: any) {
    this.pageIndex=pageIndex;
    this.loadProduct();
  }

  public loadPageSize(pageSize:any) {
    this.pageIndex=1;
    this.pageSize=pageSize;
    this.loadProduct();
  }



  public createModal() {
    this.showUpdateModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this.doneSetupForm = true;
      this.frmProduct = new FormGroup({

        'txt_maloai': new FormControl('', ),
        'txt_tenloai': new FormControl('', ),


      });
      this.imagePreview="";
    });
  }

  public openUpdateModal(id: any) {
    this.showUpdateModal = true;
    this.doneSetupForm = false;
    this.isCreate = false;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this._api.get('/api/Danhsachlsp/get-by-id/' + id).subscribe(res => {
        this.product = res;
        this.doneSetupForm = true;
        this.frmProduct = new FormGroup({
          'txt_maloai': new FormControl(this.product.maLoai,),
          'txt_tenloai': new FormControl(this.product.tenLoai, ),
        });
        this.imagePreview=this.product.Anh;
      });
    });
  }


  public onRemove(id: any) {
    this._api.delete('/api/Danhsachlsp/delete-danhsachlsp', id).subscribe(res => {
      alert('Xóa dữ liệu thành công');
      this.loadProduct();
    });
  }

  public closeModal() {
    $('#createModal').closest('.modal').modal('hide');
  }

  public upload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this._api.uploadFileSingle('/api/upload/upload', 'product', this.file).subscribe((res: any) => {
        this.imagePreview = res.body.filePath;
      });
    }
  }



  OnSubmit(vl: any) {
    debugger;
    let danhsachloaisp = {
      MaLoai: Number(vl.txt_maloai),
      TenLoai: vl.txt_tenloai,
    }
    console.log(danhsachloaisp)
    if (this.isCreate) {
//       if (this.file) {
// this._api.uploadFileSingle('/api/upload/upload-single', 'product', this.file).subscribe((res: any) => {
//           if (res && res.body && res.body.filePath) {
//             obj.sanpham.nh = res.body.filePath;
//             this._api.post('/api/SanPham/create-sanpham', obj).subscribe(res => {
//               if (res && res.data) {
//                 alert('Thêm dữ liệu thành công');
//                 this.loadProduct();
//                 this.closeModal();
//               } else {
//                 alert('Có lỗi')
//               }
//             });
//           }
//         });
//       } else {
        this._api.post('/api/Danhsachlsp/create-danhsachlsp', danhsachloaisp).subscribe(res => {
          if (res && res.data) {
            alert('Thêm dữ liệu thành công');
            this.loadProduct();
            this.closeModal();
          } else {
            alert('Có lỗi')
          }
        });
      // }
    } else {
      danhsachloaisp.MaLoai = this.product.maLoai;
      // if (this.file) {
      //   this._api.uploadFileSingle('/api/upload/upload-single', 'product', this.file).subscribe((res: any) => {
      //     if (res && res.body && res.body.filePath) {
      //       obj.sanpham.Anh = res.body.filePath;
      //       this._api.post('/api/SanPham/update-sanpham', obj).subscribe(res => {
      //         if (res && res.data) {
      //           alert('Cập nhật dữ liệu thành công');
      //           this.loadProduct();
      //           this.closeModal();
      //         } else {
      //           alert('Có lỗi')
      //         }
      //       });
      //     }
      //   });
      // } else {
        this._api.post('/api/Danhsachlsp/update-danhsachlsp', danhsachloaisp).subscribe(res => {
          if (res && res.data) {
            alert('Cập nhật dữ liệu thành công');
            this.loadProduct();
            this.closeModal();
          } else {
            alert('Có lỗi')
          }
        });
      }
    // }

  }
  addsp(vl:any){
  let files:any = document.getElementById('file');
   let sp:any={
    MaLoai: Number(vl.txt_maloai),
    TenLoai: vl.txt_tenloai,


   }
   this._api.post('/api/Danhsachlsp/create-danhsachlsp',sp).subscribe(res=>{
         alert("ok");
   })

    }
}

