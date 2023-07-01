using User_DATN.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace User_DATN.Controllers
{
    [Route("api/sanpham")]
    public class SanPhamController : Controller
    {
        private DATNContext db = new DATNContext();
        [Route("getAll")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var kq = from r in db.Sanphams
                   
                         join d in db.Danhsachloaisps on r.MaLoai equals d.MaLoai
                   
                         select new { r.MaSP, r.TenSP, r.Anh, r.Mota, r.NgayTao, r.MaLoai, r.SoLuong, r.MaNhaCungCap, r.DonViTinh, r.GiaBan, d.TenLoai };
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
                var kq = from r in db.Sanphams

                         select new { r.GiaBan, r.MaLoai, r.MaSP, r.Anh, r.MaNhaCungCap, r.Mota, r.DonViTinh, r.TenSP, r.SoLuong };
                var result = kq.Where(s => s.MaSP == id).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok("Err");
            }
        }

        [Route("timkiem_theoten")]
        [HttpGet]
        public IActionResult timkiem(string any)
        {
            try
            {
                if (string.IsNullOrEmpty(any))
                {
                    var pd = db.Sanphams.Select(r => new
                    {
                        r.GiaBan,
                        r.MaLoai,
                        r.MaSP,
                        r.Anh,
                        r.MaNhaCungCap,
                        r.Mota,
                        r.DonViTinh,
                        r.TenSP,
                        r.SoLuong

                    }).ToList();
                    return Json(pd);
                }
                else
                {
                    var pd = db.Sanphams.Select(r => new
                    {
                        r.GiaBan,
                        r.MaLoai,
                        r.MaSP,
                        r.Anh,
                        r.MaNhaCungCap,
                        r.Mota,
                        r.DonViTinh,
                        r.TenSP,
                        r.SoLuong
                    }).Where(x => x.TenSP.Contains(any)).ToList();
                    return Json(pd);
                }
            }
            catch (Exception e)
            {

                throw e;
            }

        }


    }
}
