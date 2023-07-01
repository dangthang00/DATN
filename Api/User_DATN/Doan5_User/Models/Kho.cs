using System;
using System.Collections.Generic;

#nullable disable

namespace User_DATN.Models
{
    public partial class Kho
    {
        public Kho()
        {
            Chitetkhos = new HashSet<Chitetkho>();
        }

        public int MaKho { get; set; }
        public string TenKho { get; set; }
        public string DiaChi { get; set; }

        public virtual ICollection<Chitetkho> Chitetkhos { get; set; }
    }
}
