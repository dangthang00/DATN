using System;
using System.Collections.Generic;

#nullable disable

namespace User_DATN.Models
{
    public partial class Chitetkho
    {
        public int MaChiTietKho { get; set; }
        public int MaKho { get; set; }
        public int? MaSp { get; set; }
        public int? SoLuong { get; set; }

        public virtual Kho MaKhoNavigation { get; set; }
    }
}
