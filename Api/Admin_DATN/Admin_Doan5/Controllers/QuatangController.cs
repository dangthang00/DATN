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
    public class QuatangController : Controller
    {
        private DATNContext db = new DATNContext();

        [Route("getAll")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var kq = from c in db.Quatangs
                         join d in db.Sanphams on c.MaSp equals d.MaSp      
                         select new {  d.MaSp, c.MaQt, d.TenSp,c.Mota,c.TrangThai,c.TenQt };
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
                var kq = from r in db.Quatangs

                         select new { r.MaQt,r.MaSp,r.Mota,r.TenQt,r.TrangThai};
                var result = kq.Where(s => s.MaQt == id).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok("Err");
            }
        }

        [Route("create-quatang")]
        [HttpPost]
        public IActionResult CreateQuatang([FromBody] Quatang model)
        {
            model.MaSpNavigation = null;
            db.Quatangs.Add(model);
            db.SaveChanges();
            return Ok(new { data = "OK" });
        }


        [Route("update-quatang")]
        [HttpPost]
        public IActionResult UpdateQuatang([FromBody] Quatang model)
        {
            var quatang = db.Quatangs.SingleOrDefault(x => x.MaQt == model.MaQt);
            quatang.MaSp = model.MaSp;
            quatang.TenQt = model.TenQt;
            quatang.Mota = model.Mota;
            quatang.TrangThai = model.TrangThai;
            db.SaveChanges();
            return Ok(new { data = "OK" });
        }

        [Route("delete-quatang/{MaQt}")]
        [HttpDelete]
        public IActionResult DeleteQuatang(int? MaQt)
        {
            var obj = db.Quatangs.SingleOrDefault(s => s.MaQt == MaQt);
            db.Quatangs.Remove(obj);
            db.SaveChanges();
            return Ok(new { data = "OK" });
        }
    }
}

