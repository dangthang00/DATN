using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.Authorization;
using Admin_DATN.Models;
using System.Linq;
using Admin_DATN.Entities;

namespace Admin_DATN.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SellController : Controller
    {
        private DATNContext db = new DATNContext();
        [Route("create-hoadonxuat")]
        [HttpPost]
        public IActionResult CreateItem([FromBody] HoaDonXuatModel model)
        {
            db.Khachhangs.Add(model.khachhang);
            db.SaveChanges();

            int MaKhachHang = model.khachhang.MaKhachHang;
            Hoadonxuat dh = new Hoadonxuat();
            dh.MaKhachHang = MaKhachHang;
            dh.MaNguoiDung = model.hoadon.MaNguoiDung;
            dh.NgayXuat = DateTime.Now;
            db.Hoadonxuats.Add(dh);
            db.SaveChanges();
            int MaHoaDonXuat = dh.MaHoaDonXuat;

            if (model.chitiethoadon.Count > 0)
            {
                foreach (var item in model.chitiethoadon)
                {
                    item.MaHoaDonXuat = MaHoaDonXuat;
                    db.Hoadonxuats.Add(item);
                    var obj = db.Sanphams.SingleOrDefault(x => x.MaSp == item.MaKhachHang);
                    obj.SoLuong = obj.SoLuong - item.MaHoaDonXuat;
                }
                db.SaveChanges();
            }

            return Ok(new { data = "OK" });
        }
        [Route("search")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                int? ma_danh_muc = null;
                if (formData.Keys.Contains("ma_danh_muc") && !string.IsNullOrEmpty(Convert.ToString(formData["ma_danh_muc"]))) { ma_danh_muc = int.Parse(formData["ma_danh_muc"].ToString()); }
                var result = from r in db.Sanphams
                             join g in db.Danhsachloaisps on r.MaSp equals g.MaLoai
                             select new { r.MaSp, r.TenSp, r.Anh, r.GiaBan, r.NgayTao };
                var kq = result.Where(s => s.MaSp == ma_danh_muc || ma_danh_muc == null).Select(x => new { x.MaSp, x.TenSp, x.Anh, x.GiaBan, x.NgayTao }).ToList();
                long total = kq.Count();
                return Ok(
                           new ResponseListMessage
                           {
                               page = page,
                               totalItem = total,
                               pageSize = pageSize,
                               data = kq.OrderByDescending(x => x.NgayTao).Skip(pageSize * (page - 1)).Take(pageSize).ToList()
                           });

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
