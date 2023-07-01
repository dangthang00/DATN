using System;
using System.Collections.Generic;

#nullable disable

namespace User_DATN.Models
{
    public partial class Chitietdonhang
    {
        public int MaChiTietDonHang { get; set; }
        public int MaDonHang { get; set; }
        public int MaSp { get; set; }
        public int SoLuong { get; set; }
        public double? GiaMua { get; set; }

        public virtual Donhang MaDonHangNavigation { get; set; }
    }
}
