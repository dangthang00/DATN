using System;
using System.Collections.Generic;

#nullable disable

namespace User_DATN.Models
{
    public partial class Sanpham
    {
        public Sanpham()
        {
            Quatangs = new HashSet<Quatang>();
        }

        public int MaSP { get; set; }
        public string TenSP { get; set; }
        public DateTime? NgayTao { get; set; }
        public string Anh { get; set; }
        public decimal GiaBan { get; set; }
        public int MaLoai { get; set; }
        public string Mota { get; set; }
        public int MaNhaCungCap { get; set; }
        public int? SoLuong { get; set; }
        public string DonViTinh { get; set; }

        public virtual Danhsachloaisp MaLoaiNavigation { get; set; }
        public virtual ICollection<Quatang> Quatangs { get; set; }
    }
}
