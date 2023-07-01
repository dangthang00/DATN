using System;
using System.Collections.Generic;

#nullable disable

namespace Admin_DATN.Models
{
    public partial class Taikhoan
    {
        public int MaTaiKhoan { get; set; }
        public int? MaNguoiDung { get; set; }
        public string TaiKhoan1 { get; set; }
        public string MatKhau { get; set; }
        public DateTime? NgayBatDau { get; set; }
        public DateTime? NgayKetThuc { get; set; }
        public bool? TrangThai { get; set; }
        public string LoaiQuyet { get; set; }
    }
}
