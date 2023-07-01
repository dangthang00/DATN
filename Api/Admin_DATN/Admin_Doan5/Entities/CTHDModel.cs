using Admin_DATN.Models;
using System;
using System.Collections.Generic;

namespace Admin_DATN.Entities
{
    public class CTHDModel
    {
        public Chitietdonhang chitietdonhang { get; set; }
        public List<Sanpham> sanpham { get; set; }
        public Khachhang khachhang { get; set; }
        public Donhang donhang { get; set; }

    }
}