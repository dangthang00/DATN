import { BaseComponent } from 'src/app/core/common/base-component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-chitietkho',
  templateUrl: './chitietkho.component.html',
  styleUrls: ['./chitietkho.component.css']
})
export class ChitietkhoComponent extends BaseComponent implements OnInit,AfterViewInit {

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
      'txt_tenkho': new FormControl(''),
      'txt_makho': new FormControl(''),
    });
  }

  ngAfterViewInit() {
    this.loadScripts('assets/js/core/app.js', 'assets/js/pages/dashboard.js');
  }
  public LoadData() {
    this._api.post('api/Chitietkho/search', { page: 1, pageSize: 10,tennv: this.frmSearch.value['txt_tennv']}).subscribe(res => {
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
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('/api/Chitietkho/get-by-id/'+id).subscribe(res => {
      this.list_product = res;
      console.log(this.list_product)
    })

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

  public loadUnit(){
    this._api.get('/api/Chitietkho/get').subscribe(res => {
      this.list_unit = res;
    });
  }

  public loadProducer(){
    this._api.get('/api/Chitietkho/getAll').subscribe(res => {
      this.list_producer = res;
    });

  }

  public loadCategory(){
    this._api.get('/api/Chitietkho/getAll').subscribe(res => {
      this.list_category = res;
    });

  }

  public loadProduct(){
    this._api.get('/api/Chitietkho/getAll'
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
        'txt_machitietkho': new FormControl('', ),
        'txt_makho': new FormControl('', ),
        'txt_masp': new FormControl('', ),
        'txt_soluong': new FormControl(''),
        'txt_tenkho': new FormControl(''),
        'txt_diachi': new FormControl('', ),

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
      this._api.get('/api/Chitietkho/get-by-id/' + id).subscribe(res => {
        this.product = res;
        console.log(this.product)
        this.doneSetupForm = true;
        this.frmProduct = new FormGroup({
          'txt_machitietkho': new FormControl(this.product.maChiTietKho, ),
          'txt_makho': new FormControl(this.product.maKho, ),
          'txt_masp': new FormControl(this.product.maSp, ),
          'txt_soluong': new FormControl(this.product.tenKho, ),
          'txt_tenkho': new FormControl(this.product.tenKho,),
          'txt_diachi': new FormControl(this.product.diaChi,),
        });
      });
    });
  }

  public onRemove(id: any) {
    this._api.delete('/api/Chitietkho/delete-kho', id).subscribe(res => {
      alert('Xóa dữ liệu thành công');
      this.loadProduct();
    });
  }

  public closeModal() {
    $('#createModal').closest('.modal').modal('hide');
  }

  // public upload(event: any) {
  //   if (event.target.files && event.target.files.length > 0) {
  //     this.file = event.target.files[0];
  //     this._api.uploadFileSingle('/api/upload/upload', 'product', this.file).subscribe((res: any) => {
  //       this.imagePreview = res.body.filePath;
  //     });
  //   }
  // }
  OnSubmit(vl: any) {
    debugger;
    let chitetkho = {
      MaChiTietKho: Number(vl.txt_machitietkho),
      MaKho: Number(vl.txt_makho),
      MaSp: Number(vl.txt_masp),
      SoLuong: vl.txt_soluong,
      TenKho: vl.txt_tenkho,
      DiaChi: vl.txt_diachi,
    }
    console.log(chitetkho)
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
        this._api.post('/api/Chitietkho/create-chitietkho', chitetkho).subscribe(res => {
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
      chitetkho.MaKho = this.product.maKho;
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
        this._api.post('/api/Chitietkho/update-chitietkho', chitetkho).subscribe(res => {
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
    Manv: Number(vl.txt_manv),
    Tennv: vl.txt_tennv,
    Sodienthoai: Number(vl.txt_sodienthoai),
    Diachi: vl.txt_diachi,
   }
   this._api.post('/api/Chitietkho/create-chitietkho',sp).subscribe(res=>{
         alert("ok");
   })

    }
}
