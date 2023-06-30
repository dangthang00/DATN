import { BaseComponent } from 'src/app/core/common/base-component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-doanhthu',
  templateUrl: './doanhthu.component.html',
  styleUrls: ['./doanhthu.component.css']
})
export class DoanhthuComponent extends BaseComponent implements OnInit,AfterViewInit {

 //list
 list_category: any;
 list_producer: any;
 list_unit: any;

 list_product: any[]=[];
 selectedDate: string = '';
 selectedMonth: number = 6;
 selectedYear: number = 2023;
 selectedYear1: number = 2023;

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
     'txt_tenSp': new FormControl(''),
     'txt_maloai': new FormControl(''),

   });

 }

 ngAfterViewInit() {
   this.loadScripts('assets/js/core/app.js', 'assets/js/pages/dashboard.js');
 }

 ngOnInit(): void {
   this.loadProduct();
   this.loadCategory();
   this.loadProducer();
   this.loadUnit();
 }

 calculateTotal(): number {
   const filteredInvoices = this.list_product.filter(invoice => {
     const invoiceDate = new Date(invoice.ngayDat);
     const selectedDate = new Date(this.selectedDate);
     // So sánh ngày bằng cách so sánh năm, tháng và ngày
     return (
       invoiceDate.getFullYear() === selectedDate.getFullYear() &&
       invoiceDate.getMonth() === selectedDate.getMonth() &&
       invoiceDate.getDate() === selectedDate.getDate()
     );
   });
   return filteredInvoices.reduce((total, invoice) => total + invoice.giaBan, 0);
 }
calculateTotal1(): number {
   const filteredInvoices = this.list_product.filter(invoice => {
     const invoiceDate = new Date(invoice.ngayDat);
     return invoiceDate.getMonth() + 1 === this.selectedMonth && invoiceDate.getFullYear() === this.selectedYear;
   });
   return filteredInvoices.reduce((total, invoice) => total + invoice.giaBan, 0);
 }
 calculateTotalByYear(): number {
  const filteredInvoices = this.list_product.filter((invoice:any) => {
    const invoiceDate = new Date(invoice.ngayDat);
    return invoiceDate.getFullYear() === this.selectedYear1;
  });
  return filteredInvoices.reduce((total:number, invoice:any) => total + (invoice.giaBan * invoice.soLuong), 0);
  console.log(filteredInvoices)

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
   this._api.get('/api/KhahHang/getAll').subscribe(res => {
     this.list_category = res;
   });

 }

 public loadProduct(){
   this._api.get('/api/CTHD/getAll'
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
       'txt_masp': new FormControl('',),
       'txt_tensp': new FormControl('', ),
       'txt_madonhang': new FormControl('', ),
       'txt_tenkhachhang': new FormControl('',),
       'txt_ngaydat': new FormControl(''),

       'txt_diachi': new FormControl(''),

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
     this._api.get('/api/CTDH/get-by-id/' + id).subscribe(res => {
       this.product = res;
       this.doneSetupForm = true;
       this.frmProduct = new FormGroup({
         'txt_masp': new FormControl(this.product.maSp,),
         'txt_tensp': new FormControl(this.product.tenSp, ),
         'txt_madonhang': new FormControl(this.product.maDonHang,),
         'txt_diachi': new FormControl(this.product.diaChi,),
         'txt_tenkhachhang': new FormControl(this.product.tenKhachHang,),
         'txt_ngaydat': new FormControl(this.product.ngayDat,),


       });

     });
   });
 }

 public onRemove(id: any) {
   this._api.delete('/api/CTHD/delete-ctdonhang', id).subscribe(res => {
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
   obj.donhang = {
     MaSp: Number(vl.txt_masp),
     TenSp: vl.txt_tensp,
     TenKhachHang: vl.txt_tenkhachhang,
     MaDonHang: Number(vl.txt_madonhang),

     NgayDat: vl.txt_ngaydat,
     DiaChi: vl.txt_diachi,

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
       this._api.post('/api/CTHD/create-ctdonhang', obj).subscribe(res => {
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
     obj.chitietdonhang.maDonHang = this.product.maDonHang;
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
       this._api.post('/api/CTDH/update-ctdonhang', obj).subscribe(res => {
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
   anh: files[0].name,
   MaNhaCungCap: Number(vl.txt_maNhaCungCap),
   GiaBan: vl.txt_giaBan,
   donViTinh: "string"
  }
  this._api.post('/api/SanPham/create-sanpham',sp).subscribe(res=>{
        alert("ok");
  })

   }
}
