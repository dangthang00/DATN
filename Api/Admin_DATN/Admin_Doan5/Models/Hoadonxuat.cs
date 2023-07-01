using System;
using System.Collections.Generic;

#nullable disable

namespace Admin_DATN.Models
{
    public partial class Hoadonxuat
    {
        public int MaHoaDonXuat { get; set; }
        public string SoHoaDon { get; set; }
        public DateTime? NgayXuat { get; set; }
        public int? MaKhachHang { get; set; }
        public int? MaNguoiDung { get; set; }

        public virtual Khachhang MaKhachHangNavigation { get; set; }
    }
}
