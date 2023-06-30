import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/common/base-component';
import MatchValidation from '../../../core/helpers/must-match.validator';
declare var $: any;
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent extends BaseComponent implements OnInit, AfterViewInit {
  public list_users: any;
  public isCreate = false;
  public user: any;
  public frmUser: FormGroup;
  public frmSearch: FormGroup;
  public loaiQuyen: string = 'Admin';
  public file: any;
  public showUpdateModal: any;
  public doneSetupForm: any;
  constructor(injector: Injector) {
    super(injector);
    this.frmSearch = new FormGroup({
      'txt_hoten': new FormControl('', []),
      'txt_taikhoan': new FormControl('', []),
      'txt_loaiquyen': new FormControl('', []),
    });
  }

  ngOnInit(): void {
    this.LoadData();
  }
  public LoadData() {
    this._api.post('/api/user/search', { page: 1, pageSize: 10,hoten: this.frmSearch.value['txt_hoten']}).subscribe(res => {
      this.list_users = res.data;
      setTimeout(() => {
        this.loadScripts(
          'assets/js/core/app.js',
          'assets/js/pages/datatables_basic.js',
          'assets/js/pages/datatables_basic.js'
        );
      });
    });
  }

  get hoten() {
    return this.frmUser.get('txt_hoten')!;
  }
  get taikhoan() {
    return this.frmUser.get('txt_taikhoan')!;
  }

  get email() {
    return this.frmUser.get('txt_email')!;
  }
  get dienthoai() {
    return this.frmUser.get('txt_dienthoai')!;
  }
  get ngaysinh() {
    return this.frmUser.get('txt_ngaysinh')!;
  }

  get matkhau() {
    return this.frmUser.get('txt_matkhau')!;
  }

  get nhaplaimatkhau() {
    return this.frmUser.get('txt_nhaplai_matkhau')!;
  }

  public createModal() {
    this.showUpdateModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.doneSetupForm = true;
      this.frmUser = new FormGroup({
        'txt_hoten': new FormControl('', ),
        'txt_ngaysinh': new FormControl('', ),
        'txt_gioitinh': new FormControl('Nam', ),
        'txt_diachi': new FormControl('',),
        'txt_email': new FormControl('',),
        'txt_dienthoai': new FormControl('', ),
        'txt_taikhoan': new FormControl('', ),
        'txt_matkhau': new FormControl('', ),
        'txt_nhaplai_matkhau': new FormControl('', ),
        'txt_loaiquyen': new FormControl('', []),
        'txt_anh': new FormControl('', []),
        'txt_thongtinkhac': new FormControl('', []),
      }, {
        validators: [MatchValidation.match('txt_matkhau', 'txt_nhaplai_matkhau')]
      });
    });
  }


  public openUpdateModal(maNguoiDung: any) {
    this.showUpdateModal = true;
    this.doneSetupForm = false;
    this.isCreate = false;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this._api.get('/api/user/get-by-id/' + maNguoiDung).subscribe(res => {
        this.user = res.user;
        this.doneSetupForm = true;
        this.frmUser = new FormGroup({
          'txt_hoten': new FormControl(this.user.hoTen,),
          'txt_ngaysinh': new FormControl('',),
          'txt_gioitinh': new FormControl(this.user.gioiTinh, ),
          'txt_diachi': new FormControl(this.user.diaChi,),
          'txt_email': new FormControl(this.user.email, ),
          'txt_dienthoai': new FormControl(this.user.dienThoai, ),
          'txt_taikhoan': new FormControl(this.user.taiKhoan, ),
          'txt_matkhau': new FormControl(this.user.matKhau, ),
          'txt_nhaplai_matkhau': new FormControl(this.user.matKhau, ),
          'txt_loaiquyen': new FormControl('',),

          'txt_thongtinkhac': new FormControl('', ),
        }, {
          validators: [MatchValidation.match('txt_matkhau', 'txt_nhaplai_matkhau')]
        });
        this.loaiQuyen = this.user.loaiQuyen;
        this.frmUser.get('txt_ngaysinh')?.patchValue(this.formatDate(new Date(this.user.ngaySinh)));
      });
    });
  }

  public onRemove(MaNguoiDung: any) {
    this._api.delete('/api/user/delete-user', MaNguoiDung).subscribe(res => {
      alert('Xóa dữ liệu thành công');
      this.LoadData();
    });
  }
  public closeModal() {
    $('#createUserModal').closest('.modal').modal('hide');
  }
  public pwdCheckValidator(control: any) {
    var filteredStrings = { search: control.value, select: '@#!$%&*' }
    var result = (filteredStrings.select.match(new RegExp('[' + filteredStrings.search + ']', 'g')) || []).join('');
    if (control.value.length < 6 || !result) {
      return { matkhau: true };
    } else {
      return null;
    }
  }

  ngAfterViewInit() {
    this.loadScripts('assets/js/core/app.js', 'assets/js/pages/form_layouts.js');
  }

  public upload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
  public findInvalidControls() {
    const invalid = [];
    const controls = this.frmUser.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }


  OnSubmit(vl: any) {
    console.log(this.findInvalidControls())
    if (this.frmUser.invalid) {
      return;
    }
    let obj: any = {};
    obj.nguoidung = {
      HoTen: vl.txt_hoten,
      NgaySinh: vl.txt_ngaysinh,
      GioiTinh: vl.txt_gioitinh,
      DiaChi: vl.txt_diachi,
      Email: vl.txt_email,
      DienThoai: vl.txt_dienthoai,
      TrangThai: true
    }
    obj.taikhoan = {
      TaiKhoan1: vl.txt_taikhoan,
      MatKhau: vl.txt_matkhau,
      Email: vl.txt_email,
      DienThoai: vl.txt_dienthoai,
      LoaiQuyet: this.loaiQuyen,
      TrangThai: true
    }
    if (this.isCreate) {
      if (this.file) {
        this._api.uploadFileSingle('/api/upload/upload-single', 'user', this.file).subscribe((res: any) => {
          if (res && res.body && res.body.filePath) {
            obj.nguoidung.AnhDaiDien = res.body.filePath;
            this._api.post('/api/user/create-user', obj).subscribe(res => {
              if (res && res.data) {
                alert('Thêm dữ liệu thành công');
                this.LoadData();
                this.closeModal();
              } else {
                alert('Có lỗi')
              }
            });
          }
        });
      } else {
        this._api.post('/api/user/create-user', obj).subscribe(res => {
          if (res && res.data) {
            alert('Thêm dữ liệu thành công');
            this.LoadData();
            this.closeModal();
          } else {
            alert('Có lỗi')
          }
        });
      }
    } else {
      obj.nguoidung.MaNguoiDung = this.user.maNguoiDung;
      obj.taikhoan.MaNguoiDung = this.user.maNguoiDung;
      if (this.file) {
        this._api.uploadFileSingle('/api/upload/upload-single', 'user', this.file).subscribe((res: any) => {
          if (res && res.body && res.body.filePath) {
            obj.nguoidung.AnhDaiDien = res.body.filePath;
            this._api.post('/api/user/update-user', obj).subscribe(res => {
              if (res && res.data) {
                alert('Cập nhật dữ liệu thành công');
                this.LoadData();
                this.closeModal();
              } else {
                alert('Có lỗi')
              }
            });
          }
        });
      } else {
        this._api.post('/api/user/update-user', obj).subscribe(res => {
          if (res && res.data) {
            alert('Cập nhật dữ liệu thành công');
            this.LoadData();
            this.closeModal();
          } else {
            alert('Có lỗi')
          }
        });
      }
    }

  }
}
