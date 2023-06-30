import { BaseComponent } from 'src/app/core/common/base-component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';



declare var $: any;

@Component({
  selector: 'app-chitiethoadon',
  templateUrl: './chitiethoadon.component.html',
  styleUrls: ['./chitiethoadon.component.css']
})
export class ChitiethoadonComponent extends BaseComponent implements OnInit,AfterViewInit {

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
      'txt_tenSp': new FormControl(''),
      'txt_khachhang': new FormControl(''),

    });

  }

  ngAfterViewInit() {
    this.loadScripts('assets/js/core/app.js', 'assets/js/pages/dashboard.js');
  }
  public LoadData() {
    this._api.post('api/Sanpham/search', { page: 1, pageSize: 10,tenSp: this.frmSearch.value['txt_tensp']}).subscribe(res => {
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
      this._api.get('/api/Hoadon/get-by-id/'+id).subscribe(res => {
      this.list_product = res;
      console.log(this.list_product)
    })


  });

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
  public printHtml() {
    let html_order = '';
    this.list_product.forEach((x: any) => {
      html_order += `
      <tr>
      <td>${x.tenKhachHang}</td>
      <td>${x.diaChi}</td>
      <td>${x.soDienThoai}</td>
      <td>${x.tenSp}</td>
      <td>${x.giaBan}</td>
      <td>${x.soLuong}</td>
      <td>${x.giaBan * x.soLuong}</td>
      </tr>
      `;
    });
    let data = `
    <section style="text-align: center;">
        <h1>HÓA ĐƠN </h1>
        <div class="ban">(Hoá đơn bán)</div>
        <div class="ngay">
            <p id="date"></p>
            <script>
                n = new Date();
                y = n.getFullYear();
                m = n.getMonth() + 1;
                d = n.getDate();
                document.getElementById("date").innerHTML = "Ngày " + d + " tháng " + m + " năm " + y;
            </script>
        </div>
    </section>

    <div class="le dam">Cửa hàng: Shop Bán Đồ Trang Trí Châu Phong</div>
    <div class="le">Địa chỉ: Liêu Xá - Yên Mĩ - Hưng Yên </div>
    <div class="le doi">Điện thoại: 0353866145</div>
    <div class="le doi">Số tài khoản: 2001122099999</div>

    <table>
        <tr>
        <th>TenKH</th>
        <th>daichi</th>
        <th>sdt</th>
            <th>Tên sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
        </tr>
        ${html_order}
    </table>
    <div class="doi dam ky">Người mua hàng</div>
    <div class="doi dam ky">Người bán hàng</div>
    <div class="doi ky1">(Ký, ghi rõ họ tên)</div>
    <div class="doi ky1">(Ký, ghi rõ họ tên)</div>
    `;

    let popupWin: any = window.open(
      '',
      '_top',
      'top=0,left=0,height=100%,width=auto'
    );
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          .print table {
              margin-top: 15px;
              width: 100%;
          }
          print tr {
              line-height: 27px;
          }

          .print table,
          th,
          td {
              border: 1px solid black;
              border-collapse: collapse;
              text-align: center;
          }

          .print .ngay {
              font-style: italic;
              font-size: 15px;
              margin-bottom: 5px;
          }

          .print .ban {
              font-style: italic;
              font-size: 15px;
              margin: 3px 0px;
          }

          .print .dam {
              font-weight: bold;
          }

          .print .le {
              margin-bottom: 4px;
              font-size: 15px;
          }

          .print .doi {
              width: 50%;
              float: left;
          }

          .print .ky {
              text-align: center;
              margin-top: 20px;
          }

          .print .ky1 {
              font-style: italic;
              text-align: center;
              margin-top: 5px;
          }
      </style>
        </head>
      <body class='print' onload="window.print();window.close()">${data}</body>
      </html>`);
    popupWin.document.close();
  }

  public loadUnit(){
    this._api.get('/api/CTHD/get').subscribe(res => {
      this.list_unit = res;
    });
  }

  public loadProducer(){
    this._api.get('/api/CTHD/getAll').subscribe(res => {
      this.list_producer = res;
    });

  }

  public loadCategory(){
    this._api.get('/api/CTHD/getAll').subscribe(res => {
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
        'txt_machitietdonhang': new FormControl('', ),
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
      this._api.get('/api/CTHD/get-by-id/' + id).subscribe(res => {
        this.product = res;
        this.doneSetupForm = true;
        this.frmProduct = new FormGroup({
          'txt_masp': new FormControl(this.product.maSp,),
          'txt_tensp': new FormControl(this.product.tenSp, ),
          'txt_madonhang': new FormControl(this.product.maDonHang,),
          'txt_machitietdonhang': new FormControl(this.product.maChiTietDonHang,),
          'txt_diachi': new FormControl(this.product.diaChi,),
          'txt_tenkhachhang': new FormControl(this.product.tenKhachHang,),
          'txt_ngaydat': new FormControl(this.product.ngayDat,),
        });
        this.imagePreview="";
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
    let chitietdonhang = {
      MaSp: Number(vl.txt_masp),
      TenSp: vl.txt_tensp,
      TenKhachHang: vl.txt_tenkhachhang,
      MaDonHang: Number(vl.txt_madonhang),
      MaChiTietDonHang: Number(vl.txt_madonhang),
      NgayDat: vl.txt_ngaydat,
      DiaChi: vl.txt_diachi,

    }
    console.log(chitietdonhang)
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
        this._api.post('/api/CTHD/create-ctdonhang', chitietdonhang).subscribe(res => {
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
      chitietdonhang.MaChiTietDonHang = this.product.maChiTietDonHang;
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
        this._api.post('/api/CTDH/update-ctdonhang', chitietdonhang).subscribe(res => {
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
