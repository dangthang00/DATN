using User_DATN.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace User_DATN.Controllers
{
    [Route("api/tintuc")]
    public class TintucController : Controller
    {
        private DATNContext db = new DATNContext();
        [Route("getAll")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var kq = from r in db.Tintucs
                         select new { r.AnhTt, r.Tieude, r.Noidung, r.MaTt };
                var result = kq.Select(x => new { x.MaTt, x.Tieude, x.AnhTt, x.Noidung }).ToList();
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
                var kq = from r in db.Tintucs

                         select new { r.MaTt, r.Tieude, r.AnhTt, r.Noidung };
                var result = kq.Where(s => s.MaTt == id).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok("Err");
            }
        }

    }
}
