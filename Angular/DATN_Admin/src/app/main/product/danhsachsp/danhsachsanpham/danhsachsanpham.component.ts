import { AuthenticationService } from './../../../../core/authentication/authentication.service';
import { BaseComponent } from 'src/app/core/common/base-component';
import { FormControl, FormGroup } from '@angular/forms';
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-danhsachsanpham',
  templateUrl: './danhsachsanpham.component.html',
  styleUrls: ['./danhsachsanpham.component.css']
})


export class DanhsachsanphamComponent extends BaseComponent implements OnInit,AfterViewInit {


  title= 'pagination'
  public user: any;
  page:number = 1;
  count:number = 0;
  public tablesize:number = 8;
  table_numberSize:any = [8,16,24];
  //list
  list_category: any;
  list_producer: any;
  list_unit: any;

  list_product: any;
  totalProduct: any;
  pageIndex: any = 1;
  pageSize: any = 5;
  frmSearch: FormGroup

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
      'txt_tensp': new FormControl(''),
      'txt_maloai': new FormControl(''),
    });
  }

  ngAfterViewInit() {
    this.loadScripts('assets/js/core/app.js', 'assets/js/pages/dashboard.js');
  }
  public LoadData() {
    this._api.post('api/SanPham/search', { page: 1, pageSize: 10,tenSp: this.frmSearch.value['txt_tensp']}).subscribe(res => {
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
  Logout() {
    this.authenticationService.logout();

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


  public loadUnit(){
    this._api.get('/api/Units/get').subscribe(res => {
      this.list_unit = res;
    });
  }

  public loadProducer(){
    this._api.get('/api/NhaCungCap/getAll').subscribe(res => {
      this.list_producer = res;
    });

  }

  public loadCategory(){
    this._api.get('/api/Danhsachlsp/getAll').subscribe(res => {
      this.list_category = res;
    });

  }

  public loadProduct(){
    this._api.get('/api/SanPham/getAll'
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
        'txt_maloai': new FormControl('',),
        'txt_tensp': new FormControl('', ),
        'txt_mota': new FormControl('', ),
        'txt_maNhaCungCap': new FormControl('',),
        'txt_giaBan': new FormControl(''),
        'txt_Anh': new FormControl(''),
        'txt_soluong': new FormControl(''),
        'txt_ngaytao': new FormControl(''),
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
      this._api.get('/api/SanPham/get-by-id/' + id).subscribe(res => {
        this.product = res;
        this.doneSetupForm = true;
        this.frmProduct = new FormGroup({
          'txt_maloai': new FormControl(this.product.maSp,),
          'txt_tensp': new FormControl(this.product.tenSp, ),
          'txt_mota': new FormControl(this.product.mota,),
          'txt_maNhaCungCap': new FormControl(this.product.maNhaCungCap,),
          'txt_giaBan': new FormControl(this.product.giaBan,),
          'txt_Anh': new FormControl(this.product.Anh),
          'txt_soluong': new FormControl(this.product.soLuong),
          'txt_ngaytao': new FormControl(this.product.NgayTao),
        });
        this.imagePreview=this.product.Anh;
      });
    });
  }

  public onRemove(id: any) {
    this._api.delete('/api/SanPham/delete-sanpham', id).subscribe(res => {
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
    let obj: any={};
    obj.sanpham = {
      MaLoai: Number(vl.txt_maloai),
      TenSp: vl.txt_tensp,
      Mota: vl.txt_mota,
      MaNhaCungCap: Number(vl.txt_maNhaCungCap),
      GiaBan: vl.txt_giaBan,
      Anh: vl.txt_Anh,
      SoLuong: vl.txt_soluong,
      NgayTao:vl.txt_ngaytao,
    }
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
        this._api.post('/api/SanPham/create-sanpham', obj).subscribe(res => {
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
      obj.sanpham.maSp = this.product.maSp;
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
        this._api.post('/api/SanPham/update-sanpham', obj).subscribe(res => {
          if (res && res.data) {
            alert('Cập nhật dữ liệu thành công');
            this.loadProduct();
            this.closeModal();
          } else {
            alert('Có lỗi')
          }
        });
      }
    }


  addsp(vl:any){
  let files:any = document.getElementById('file');
   let sp:any={
    MaLoai: Number(vl.txt_maloai),
    TenSp: vl.txt_tensp,
    Mota: vl.txt_mota,
    anh: "abvd",
    MaNhaCungCap: Number(vl.txt_maNhaCungCap),
    GiaBan: vl.txt_giaBan,
    donViTinh: "string"
   }
   this._api.post('/api/SanPham/create-sanpham',sp).subscribe(res=>{
         alert("ok");
   })

    }
}
