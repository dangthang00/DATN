using System;
using System.Collections.Generic;

#nullable disable

namespace User_DATN.Models
{
    public partial class Nhacungcap
    {
        public Nhacungcap()
        {
            Hoadonnhaps = new HashSet<Hoadonnhap>();
        }

        public int MaNhaCungCap { get; set; }
        public string TenNhaCungCap { get; set; }
        public string DiaChi { get; set; }
        public string SoDienThoai { get; set; }
        public string Email { get; set; }

        public virtual ICollection<Hoadonnhap> Hoadonnhaps { get; set; }
    }
}
