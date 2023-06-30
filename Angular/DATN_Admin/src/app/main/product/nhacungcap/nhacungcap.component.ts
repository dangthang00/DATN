import { BaseComponent } from 'src/app/core/common/base-component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';


declare var $: any;
@Component({
  selector: 'app-nhacungcap',
  templateUrl: './nhacungcap.component.html',
  styleUrls: ['./nhacungcap.component.css']
})
export class NhacungcapComponent extends BaseComponent implements OnInit,AfterViewInit {
  title= 'pagination'

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


  constructor(injector: Injector) {
    super(injector);
    this.frmSearch = new FormGroup({
      'txt_tenncc': new FormControl(''),
      'txt_mancc': new FormControl(''),
    });
  }

  ngAfterViewInit() {
    this.loadScripts('assets/js/core/app.js', 'assets/js/pages/dashboard.js');
  }
  public LoadData() {
    this._api.post('api/NhaCungCap/search', { page: 1, pageSize: 10,tenSp: this.frmSearch.value['txt_tensp']}).subscribe(res => {
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
    this._api.get('/api/NhaCungCap/get').subscribe(res => {
      this.list_unit = res;
    });
  }

  public loadProducer(){
    this._api.get('/api/NhaCungCap/getAll').subscribe(res => {
      this.list_producer = res;
    });

  }

  public loadCategory(){
    this._api.get('/api/NhaCungCap/getAll').subscribe(res => {
      this.list_category = res;
    });

  }

  public loadProduct(){
    this._api.get('/api/NhaCungCap/getAll'
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

        'txt_tenncc': new FormControl('', ),
        'txt_diachi': new FormControl('', ),
        'txt_sodienthoai': new FormControl('',),
        'txt_email': new FormControl(''),


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
      this._api.get('/api/NhaCungCap/get-by-id/' + id).subscribe(res => {
        this.product = res;
        console.log(this.product)
        this.doneSetupForm = true;
        this.frmProduct = new FormGroup({
          'txt_tenncc': new FormControl(this.product.tenNhaCungCap, ),
          'txt_diachi': new FormControl(this.product.diaChi,),
          'txt_sodienthoai': new FormControl(this.product.soDienThoai,),
          'txt_email': new FormControl(this.product.email,),


        });
        this.imagePreview=this.product.anh;
      });
    });
  }

  public onRemove(id: any) {
    this._api.delete('/api/NhaCungCap/delete-nhacc', id).subscribe(res => {
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
    obj.nhacungcap = {

      TenNhaCungCap: vl.txt_tenncc,
      DiaChi: vl.txt_diachi,
      Email: vl.txt_email,
      SoDienThoai: vl.txt_sodienthoai,

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
        this._api.post('/api/NhaCungCap/create-nhacc', obj).subscribe(res => {
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
      obj.nhacungcap.maNhaCungCap = this.product.maNhaCungCap;
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
        this._api.post('/api/NhaCungCap/update-nhacc', obj).subscribe(res => {
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
    TenSp: vl.txt_tenSp,
    Mota: vl.txt_mota,
    anh: "abvd",
    MaNhaCungCap: Number(vl.txt_maNhaCungCap),
    GiaBan: vl.txt_giaBan,
    donViTinh: "string"
   }
   this._api.post('/api/NhaCungCap/create-nhacc',sp).subscribe(res=>{
         alert("ok");
   })

    }
}
