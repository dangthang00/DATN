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
    public class ChitietkhoController : Controller
    {
        private DATNContext db = new DATNContext();

        [Route("getAll")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var kq = from r in db.Chitetkhos
                         join d in db.Khos on r.MaKho equals d.MaKho
                         select new { d.DiaChi, d.TenKho, r.MaChiTietKho, r.MaSp, r.MaKho, r.SoLuong };
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
                var kq = from r in db.Chitetkhos
                         join d in db.Khos on r.MaKho equals d.MaKho
                         select new {d.DiaChi,d.TenKho, r.MaChiTietKho,r.MaSp,r.MaKho,r.SoLuong};
                var result = kq.Where(s => s.MaKho == id).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok("Err");
            }
        }

        [Route("create-chitietkho")]
        [HttpPost]
        public IActionResult Createchitietkho([FromBody] Chitetkho model)
        {
            model.MaKhoNavigation = null;
            db.Chitetkhos.Add(model);
            db.SaveChanges();


            return Ok(new { data = "OK" });
        }


        [Route("update-chitietkho")]
        [HttpPost]
        public IActionResult Updatechitietkho([FromBody] Chitetkho model)
        {
            var chitetkho = db.Chitetkhos.SingleOrDefault(x => x.MaChiTietKho == model.MaChiTietKho);
            chitetkho.MaKho = model.MaKho;
            chitetkho.MaSp = model.MaSp;
            chitetkho.SoLuong = model.SoLuong;
            db.SaveChanges();
            return Ok(new { data = "OK" });
        }

        [Route("delete-kho/{MaChiTietKho}")]
        [HttpDelete]
        public IActionResult Deletechitietkho(int? MaChiTietKho)
        {
            var obj = db.Chitetkhos.SingleOrDefault(s => s.MaChiTietKho == MaChiTietKho);
            db.Chitetkhos.Remove(obj);
            db.SaveChanges();
            return Ok(new { data = "OK" });
        }
    }
}

