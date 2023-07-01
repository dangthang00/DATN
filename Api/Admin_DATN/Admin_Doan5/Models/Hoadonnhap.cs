using System;
using System.Collections.Generic;

#nullable disable

namespace Admin_DATN.Models
{
    public partial class Hoadonnhap
    {
        public int MaHoaDonNhap { get; set; }
        public string SoHoaDon { get; set; }
        public DateTime NgayNhap { get; set; }
        public int MaNguoiDung { get; set; }
        public int MaNhaCungCap { get; set; }

        public virtual Nhacungcap MaNhaCungCapNavigation { get; set; }
    }
}
