using Admin_DATN.Models;
using System.Collections.Generic;

namespace Admin_DATN.Entities
{
    public class HoaDonXuatModel
    {
        public Khachhang khachhang { get; set; }
        public Hoadonxuat hoadon { get; set; }
        public List<Hoadonxuat> chitiethoadon { get; set; }
    }
}
