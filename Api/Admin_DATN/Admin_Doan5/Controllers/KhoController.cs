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
    public class KhoController : Controller
    {
        private DATNContext db = new DATNContext();

        [Route("getAll")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var kq = from c in db.Khos
                       
                         select new {  c.MaKho, c.DiaChi,c.TenKho };
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
                var kq = from r in db.Khos
                         join d in db.Chitetkhos on r.MaKho equals d.MaKho
                         select new { r.DiaChi, r.TenKho, d.MaChiTietKho, d.MaSp, r.MaKho, d.SoLuong };
                var result = kq.Where(s => s.MaKho == id).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok("Err");
            }
        }

        [Route("create-kho")]
        [HttpPost]
        public IActionResult CreateKho([FromBody] Kho model)
        {
            db.Khos.Add(model);
            db.SaveChanges();


            return Ok(new { data = "OK" });
        }


        [Route("update-kho")]
        [HttpPost]
        public IActionResult Updatekho([FromBody] Kho model)
        {
            var Kho = db.Khos.SingleOrDefault(x => x.MaKho == model.MaKho);
            Kho.TenKho = model.TenKho;
            Kho.DiaChi = model.DiaChi;
            db.SaveChanges();
            return Ok(new { data = "OK" });
        }

        [Route("delete-kho/{MaKho}")]
        [HttpDelete]
        public IActionResult DeleteKho(int? MaKho)
        {
            var obj = db.Khos.SingleOrDefault(s => s.MaKho == MaKho);
            db.Khos.Remove(obj);
            db.SaveChanges();
            return Ok(new { data = "OK" });
        }
    }
}

