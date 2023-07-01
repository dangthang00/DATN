using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Linq;
using Admin_DATN.Models;
using Admin_DATN.Entities;


namespace Admin_DATN.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class HoadonController : Controller
    {
        private DATNContext db = new DATNContext();

        //        [Route("search")]
        //        [HttpPost]
        //        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        //        {
        //            try
        //            {
        //                var page = int.Parse(formData["page"].ToString());
        //                var pageSize = int.Parse(formData["pageSize"].ToString());
        //                var result = from c in db.Chitietdonhangs
        //                             join d in db.Donhangs on c.MaDonHang equals d.MaDonHang
        //                             join k in db.Khachhangs on d.MaKhachHang equals k.MaKhachHang
        //                             join s in db.Sanphams on c.MaSp equals s.MaSp
        //                             select new { s.MaSp, s.TenSp, d.MaDonHang, k.TenKhachHang, d.NgayDat, d.TrangThaiDonHang };
        //                var kq = result.OrderBy(x => x.NgayDat).Skip(pageSize * (page - 1)).Take(pageSize).ToList();
        //                return Ok(
        //                         new ResponseListMessage
        //                         {
        //                             page = page,
        //                             totalItem = kq.Count,
        //                             pageSize = pageSize,
        //                             data = kq
        //                         });

        //            }
        //            catch (Exception ex)
        //            {
        //                throw new Exception(ex.Message);
        //            }
        //        }
        //    }
        //}
        [Route("getAll")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var kq = from c in db.Donhangs
                         join d in db.Chitietdonhangs on c.MaDonHang equals d.MaDonHang
                         join k in db.Khachhangs on d.MaSp equals k.MaKhachHang
                         select new {  d.MaDonHang, k.MaKhachHang, d.SoLuong,c.NgayDat,c.TrangThaiDonHang };
                var result = kq.ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok("Err");
            }
        }
        [Route("get-by-id/{id}")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            try
            {
                var kq = from c in db.Donhangs
                         join d in db.Chitietdonhangs on c.MaDonHang equals d.MaDonHang
                         join k in db.Khachhangs on c.MaKhachHang equals k.MaKhachHang
                         join s in db.Sanphams on d.MaSp equals s.MaSp
                         select new { s.MaSp, s.GiaBan, s.TenSp, d.MaDonHang,k.SoDienThoai, d.MaChiTietDonHang, d.SoLuong, k.TenKhachHang, k.DiaChi,  c.NgayDat };
                var result = kq.Where(s => s.MaDonHang == id).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok("Err");
            }
        }

        [Route("create-donhang")]
        [HttpPost]
        public IActionResult Createdonhang([FromBody] Donhang model)
        {
            db.Donhangs.Add(model);
            db.SaveChanges();


            return Ok(new { data = "OK" });
        }


        [Route("update-ctdonhang")]
        [HttpPost]
        public IActionResult UpdateChitietdonhang([FromBody] Donhang model)
        {
            var donhang = db.Donhangs.SingleOrDefault(x => x.MaDonHang == model.MaDonHang);
            donhang.MaDonHang = model.MaDonHang;
            donhang.MaKhachHang = model.MaKhachHang;
            donhang.TrangThaiDonHang = model.TrangThaiDonHang;
            db.SaveChanges();
            return Ok(new { data = "OK" });
        }

        [Route("delete-donhang/{MaDonHang}")]
        [HttpDelete]
        public IActionResult Deletedonhang(int? MaDonHang)
        {
            var obj = db.Donhangs.SingleOrDefault(s => s.MaDonHang == MaDonHang);
            db.Donhangs.Remove(obj);
            db.SaveChanges();
            return Ok(new { data = "OK" });
        }
    }
}

