using System;
using System.Collections.Generic;

#nullable disable

namespace Admin_DATN.Models
{
    public partial class Donhang
    {
        public Donhang()
        {
            Chitietdonhangs = new HashSet<Chitietdonhang>();
        }

        public int MaDonHang { get; set; }
        public int? MaKhachHang { get; set; }
        public DateTime? NgayDat { get; set; }
        public int? TrangThaiDonHang { get; set; }

        public virtual Khachhang MaKhachHangNavigation { get; set; }
        public virtual ICollection<Chitietdonhang> Chitietdonhangs { get; set; }
    }
}
