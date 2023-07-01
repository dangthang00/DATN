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
using System.Text.RegularExpressions;

namespace Admin_DATN.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class NhaCungCapController : Controller
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
                var tenncc = formData.Keys.Contains("tenncc") ? formData["tenncc"].ToString().Trim() : "";
                var result = from t in db.Nhacungcaps

                             select new { t.MaNhaCungCap, t.TenNhaCungCap, t.DiaChi, };
                var kq = result.Where(x => x.TenNhaCungCap.Contains(tenncc)).OrderByDescending(x => x.TenNhaCungCap).Skip(pageSize * (page - 1)).Take(pageSize).ToList();
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
                var kq = from r in db.Nhacungcaps
                         select new { r };
                var result = kq.Select(x => new { x.r.TenNhaCungCap, x.r.MaNhaCungCap, x.r.DiaChi, x.r.SoDienThoai, x.r.Email }).ToList();
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
                var kq = from r in db.Nhacungcaps

                         select new { r.MaNhaCungCap, r.TenNhaCungCap, r.DiaChi, r.SoDienThoai, r.Email };
                var result = kq.Where(s => s.MaNhaCungCap == id).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok("Err");
            }
        }

        [Route("create-nhacc")]
        [HttpPost]
        public IActionResult CreateNhacungcap([FromBody] NhacungcapModel model)
        {
            db.Nhacungcaps.Add(model.nhacungcap); ;
            db.SaveChanges();


            return Ok(new { data = "OK" });
        }


        [Route("update-nhacc")]
        [HttpPost]
        public IActionResult UpdateNhacungcap([FromBody] NhacungcapModel model)
        {
            var nhacungcap = db.Nhacungcaps.SingleOrDefault(x => x.MaNhaCungCap == model.nhacungcap.MaNhaCungCap);
            
            nhacungcap.TenNhaCungCap = model.nhacungcap.TenNhaCungCap;
            nhacungcap.DiaChi = model.nhacungcap.DiaChi;
            nhacungcap.SoDienThoai = model.nhacungcap.SoDienThoai;
            nhacungcap.Email = model.nhacungcap.Email;
            db.SaveChanges();


            return Ok(new { data = "OK" });
        }

        [Route("delete-nhacc/{Mancc}")]
        [HttpDelete]
        public IActionResult DeleteNhacungcap(int? Mancc)
        {
            var obj = db.Nhacungcaps.SingleOrDefault(s => s.MaNhaCungCap == Mancc);
            db.Nhacungcaps.Remove(obj);
            db.SaveChanges();

            return Ok(new { data = "OK" });
        }
    }
}

