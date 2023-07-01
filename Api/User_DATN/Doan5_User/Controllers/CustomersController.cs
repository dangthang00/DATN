using User_DATN.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace User_DATN.Controllers
{
    [Route("api/customers")]
    public class CustomersController : Controller
    {
        private DATNContext db = new DATNContext();
        [Route("create-giohang")]
        [HttpPost]
        public IActionResult CreateItem([FromBody] GioHang model)
        {
            db.Khachhangs.Add(model.khach);
            db.SaveChanges();

            int MaKhachHang = model.khach.MaKhachHang;
            Donhang dh = new Donhang();
            dh.MaKhachHang = MaKhachHang;
            dh.NgayDat = System.DateTime.Now;
            dh.TrangThaiDonHang = 1;
            db.Donhangs.Add(dh);
            db.SaveChanges();
            int MaDonHang = dh.MaDonHang;

            if (model.donhang.Count > 0)
            {
                foreach (var item in model.donhang)
                {
                    item.MaDonHang = MaDonHang;
                    db.Chitietdonhangs.Add(item);
                }
                db.SaveChanges();
            }

            return Ok(new { data = "OK" });
        }

    }

    public class GioHang
    {
        public Khachhang khach { get; set; }
        public List<Chitietdonhang> donhang { get; set; }
    }
}
