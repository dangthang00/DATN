using System;
using System.Collections.Generic;

#nullable disable

namespace Admin_DATN.Models
{
    public partial class Khachhang
    {
        public Khachhang()
        {
            Donhangs = new HashSet<Donhang>();
            Hoadonxuats = new HashSet<Hoadonxuat>();
        }

        public int MaKhachHang { get; set; }
        public string TenKhachHang { get; set; }
        public string DiaChi { get; set; }
        public string SoDienThoai { get; set; }
        public string Email { get; set; }

        public virtual ICollection<Donhang> Donhangs { get; set; }
        public virtual ICollection<Hoadonxuat> Hoadonxuats { get; set; }
    }
}
