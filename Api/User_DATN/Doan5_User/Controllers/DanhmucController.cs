using User_DATN.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace User_DATN.Controllers
{
    [Route("api/maloai")]
    public class DanhmucController : Controller
    {
        private DATNContext db = new DATNContext();

        [Route("search")]
        [HttpGet]
        public IActionResult Search()
        {
            try
            {
                var kq = from r in db.Danhsachloaisps
                         select new { r.MaLoaiCha, r.MaLoai, r.TrangThai, r.TenLoai, r.Stt };
                var result = kq.ToList();
                return Ok(result);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("get-by-id/{id}")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            try
            {
                var kq = from r in db.Sanphams
                         join e in db.Danhsachloaisps on r.MaLoai equals e.MaLoai
                         select new { r.MaSP, r.TenSP, r.Anh, r.Mota, r.NgayTao, r.MaLoai, r.SoLuong, r.MaNhaCungCap, r.DonViTinh, r.GiaBan };

                var result = kq.Where(s => s.MaLoai == id).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok("Err");
            }
        }
    }
}
