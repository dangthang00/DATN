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
    public class CTHDController : Controller
    {
        private DATNContext db = new DATNContext();

        [Route("search")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                var result = from c in db.Chitietdonhangs
                             join d in db.Donhangs on c.MaDonHang equals d.MaDonHang
                             join k in db.Khachhangs on d.MaKhachHang equals k.MaKhachHang
                             join s in db.Sanphams on c.MaSp equals s.MaSp
                             select new { s.MaSp, s.TenSp, d.MaDonHang, k.TenKhachHang, d.NgayDat, d.TrangThaiDonHang };
                var kq = result.OrderBy(x => x.NgayDat).Skip(pageSize * (page - 1)).Take(pageSize).ToList();
                return Ok(
                         new ResponseListMessage
                         {
                             page = page,
                             totalItem = kq.Count,
                             pageSize = pageSize,
                             data = kq
                         });

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


[Route("getAll")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var kq = from c in db.Chitietdonhangs
                         join d in db.Donhangs on c.MaDonHang equals d.MaDonHang
                         join k in db.Khachhangs on d.MaKhachHang equals k.MaKhachHang
                         join s in db.Sanphams on c.MaSp equals s.MaSp
                         select new { s.MaSp,s.GiaBan,k.SoDienThoai, s.TenSp,c.MaChiTietDonHang, d.MaDonHang, c.SoLuong, k.TenKhachHang, k.DiaChi, d.NgayDat };
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
                var kq = from c in db.Chitietdonhangs
                         join d in db.Donhangs on c.MaDonHang equals d.MaDonHang
                         join k in db.Khachhangs on d.MaKhachHang equals k.MaKhachHang
                         join s in db.Sanphams on c.MaSp equals s.MaSp
                         select new { s.MaSp, s.GiaBan, s.TenSp, k.SoDienThoai, c.MaChiTietDonHang, c.SoLuong, k.TenKhachHang, k.DiaChi, d.NgayDat };
                var result = kq.Where(s => s.MaChiTietDonHang == id).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok("Err");
            }
        }
        

        [Route("create-ctdonhang")]
        [HttpPost]
        public IActionResult CreateChitietdonhang([FromBody] Chitietdonhang model)
        {
            db.Chitietdonhangs.Add(model);
            db.SaveChanges();


            return Ok(new { data = "OK" });
        }


        [Route("update-ctdonhang")]
        [HttpPost]
        public IActionResult UpdateChitietdonhang([FromBody] Chitietdonhang model)
        {
            var chitietdonhang = db.Chitietdonhangs.SingleOrDefault(x => x.MaChiTietDonHang == model.MaChiTietDonHang);

            chitietdonhang.MaDonHang = model.MaDonHang;
            chitietdonhang.MaChiTietDonHang = model.MaChiTietDonHang;
            chitietdonhang.MaSp = model.MaSp;
            chitietdonhang.SoLuong = model.SoLuong;
       
            db.SaveChanges();


            return Ok(new { data = "OK" });
        }

        [Route("delete-ctdonhang/{MaChiTietDonHang}")]
        [HttpDelete]
        public IActionResult DeleteChitietdonhang(int? MaChiTietDonHang)
        {
            var obj = db.Chitietdonhangs.FirstOrDefault(s => s.MaChiTietDonHang == MaChiTietDonHang);
            db.Chitietdonhangs.Remove(obj);
            db.SaveChanges();

            return Ok(new { data = "OK" });
        }
    }
}

