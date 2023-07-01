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
    public class NhanVienController : Controller
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
                var tennv = formData.Keys.Contains("tennv") ? formData["tennv"].ToString().Trim() : "";
                var result = from t in db.Nhanviens

                             select new { t.Manv, t.Tennv };
                var kq = result.Where(x => x.Tennv.Contains(tennv)).OrderByDescending(x => x.Tennv).Skip(pageSize * (page - 1)).Take(pageSize).ToList();
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
                var kq = from r in db.Nhanviens
                         select new { r };
                var result = kq.Select(x => new { x.r.Tennv, x.r.Manv, x.r.Diachi, x.r.Sodienthoai }).ToList();
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
                var kq = from r in db.Nhanviens

                         select new { r.Manv, r.Diachi, r.Tennv, r.Sodienthoai, };
                var result = kq.Where(s => s.Manv == id).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok("Err");
            }
        }

        [Route("create-nhanvien")]
        [HttpPost]
        public IActionResult CreateNhanVien([FromBody] Nhanvien model)
        {
            db.Nhanviens.Add(model);
            db.SaveChanges();


            return Ok(new { data = "OK" });
        }


        [Route("update-nhanvien")]
        [HttpPost]
        public IActionResult UpdateNhanVien([FromBody] Nhanvien model)
        {
            var nhanvien = db.Nhanviens.SingleOrDefault(x => x.Manv == model.Manv);
           
            nhanvien.Tennv = model.Tennv;
            nhanvien.Diachi = model.Diachi;
            nhanvien.Sodienthoai = model.Sodienthoai;
            db.SaveChanges();

            return Ok(new { data = "OK" });
        }

        [Route("delete-nhanvien/{Manv}")]
        [HttpDelete]
        public IActionResult DeleteKhachHang(int? Manv)
        {
            var obj = db.Nhanviens.FirstOrDefault(s => s.Manv == Manv);
            db.Nhanviens.Remove(obj);
            db.SaveChanges();

            return Ok(new { data = "OK" });
        }
    }
}

