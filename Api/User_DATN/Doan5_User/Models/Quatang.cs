using System;
using System.Collections.Generic;

#nullable disable

namespace User_DATN.Models
{
    public partial class Quatang
    {
        public int MaQt { get; set; }
        public int MaSP { get; set; }
        public string TenQt { get; set; }
        public string Mota { get; set; }
        public int? TrangThai { get; set; }

        public virtual Sanpham MaSpNavigation { get; set; }
    }
}
