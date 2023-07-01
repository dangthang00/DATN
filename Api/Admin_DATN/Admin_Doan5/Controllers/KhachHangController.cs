using Admin_DATN.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Linq;
//using WebApi.Services;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Admin_DATN.Entities;

namespace Admin_DATN.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class KhachHangController : Controller
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
                var tenkh = formData.Keys.Contains("tenkh") ? formData["tenkh"].ToString().Trim() : "";
                var result = from t in db.Khachhangs

                             select new { t.TenKhachHang, t.MaKhachHang, t.DiaChi, };
                var kq = result.Where(x => x.TenKhachHang.Contains(tenkh)).OrderByDescending(x => x.TenKhachHang).Skip(pageSize * (page - 1)).Take(pageSize).ToList();
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
                var kq = from r in db.Khachhangs
                         select new { r };
                var result = kq.Select(x => new { x.r.TenKhachHang, x.r.MaKhachHang, x.r.DiaChi, x.r.Email, x.r.SoDienThoai }).ToList();
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
                var kq = from r in db.Khachhangs

                         select new { r.MaKhachHang, r.DiaChi, r.TenKhachHang, r.SoDienThoai, r.Email };
                var result = kq.Where(s => s.MaKhachHang == id).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok("Err");
            }
        }

        [Route("create-khachhang")]
        [HttpPost]
        public IActionResult CreateKhachHang([FromBody] Khachhang model)
        {
            db.Khachhangs.Add(model);
            db.SaveChanges();


            return Ok(new { data = "OK" });
        }


        [Route("update-khachhang")]
        [HttpPost]
        public IActionResult UpdateKhachHang([FromBody] Khachhang model)
        {
            var khachhang = db.Khachhangs.SingleOrDefault(x => x.MaKhachHang == model.MaKhachHang);
            khachhang.MaKhachHang = model.MaKhachHang;
            khachhang.TenKhachHang = model.TenKhachHang;
            khachhang.DiaChi = model.DiaChi;
            khachhang.Email = model.Email;
            khachhang.SoDienThoai = model.SoDienThoai;
            db.SaveChanges();

            return Ok(new { data = "OK" });
        }

        [Route("delete-khachhang/{MaKhachHang}")]
        [HttpDelete]
        public IActionResult DeleteKhachHang(int? MaKhachHang)
        {
            var obj = db.Khachhangs.SingleOrDefault(s => s.MaKhachHang == MaKhachHang);
            db.Khachhangs.Remove(obj);
            db.SaveChanges();

            return Ok(new { data = "OK" });
        }
    }
}

