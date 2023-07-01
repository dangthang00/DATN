using System;
using System.Collections.Generic;

#nullable disable

namespace User_DATN.Models
{
    public partial class Danhsachloaisp
    {
        public Danhsachloaisp()
        {
            Sanphams = new HashSet<Sanpham>();
        }

        public int MaLoai { get; set; }
        public int? MaLoaiCha { get; set; }
        public string TenLoai { get; set; }
        public int? Stt { get; set; }
        public bool TrangThai { get; set; }

        public virtual ICollection<Sanpham> Sanphams { get; set; }
    }
}
