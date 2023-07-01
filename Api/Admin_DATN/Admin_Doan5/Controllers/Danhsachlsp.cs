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
    public class DanhsachlspController : Controller
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
                var tenloai = formData.Keys.Contains("tenloai") ? formData["tenloai"].ToString().Trim() : "";
                var result = from t in db.Danhsachloaisps

                             select new { t.TenLoai, t.MaLoai, t.MaLoaiCha };
                var kq = result.Where(x => x.TenLoai.Contains(tenloai)).OrderByDescending(x => x.MaLoai).Skip(pageSize * (page - 1)).Take(pageSize).ToList();
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
                var kq = from r in db.Danhsachloaisps
                         select new { r };
                var result = kq.Select(x => new { x.r.Stt, x.r.TrangThai, x.r.MaLoai, x.r.MaLoaiCha, x.r.TenLoai }).ToList();
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
                var kq = from r in db.Danhsachloaisps

                         select new { r.TenLoai, r.MaLoai, r.MaLoaiCha, r.Stt, r.TrangThai };
                var result = kq.Where(s => s.MaLoai == id).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok("Err");
            }
        }

        [Route("create-danhsachlsp")]
        [HttpPost]
        public IActionResult CreateDanhsachlsp([FromBody] Danhsachloaisp model)
        {
            db.Danhsachloaisps.Add(model);
            db.SaveChanges();


            return Ok(new { data = "OK" });
        }


        [Route("update-danhsachlsp")]
        [HttpPost]
        public IActionResult UpdateDanhsachlsp([FromBody] Danhsachloaisp model)
        {
            var danhsachlsp = db.Danhsachloaisps.SingleOrDefault(x => x.MaLoai == model.MaLoai);
            danhsachlsp.MaLoai = model.MaLoai;
            danhsachlsp.TenLoai = model.TenLoai;
            danhsachlsp.Stt = model.Stt;
            db.SaveChanges();


            return Ok(new { data = "OK" });
        }

        [Route("delete-danhsachlsp/{MaLoai}")]
        [HttpDelete]
        public IActionResult DeleteDanhsachlsp(int? MaLoai)
        {
            var obj = db.Danhsachloaisps.SingleOrDefault(s => s.MaLoai == MaLoai);
            db.Danhsachloaisps.Remove(obj);
            db.SaveChanges();

            return Ok(new { data = "OK" });
        }
    }
}

