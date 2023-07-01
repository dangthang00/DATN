using User_DATN.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace User_DATN.Controllers
{
    [Route("api/home")]
    public class HomeController : Controller
    {
        private DATNContext db = new DATNContext();
        [Route("get-sp-moi")]
        [HttpGet]
        public IActionResult GetBanChay()
        {
            try
            {
                var result = db.Sanphams.Select(x => new { x.MaSP, x.TenSP, x.NgayTao, x.Anh, x.MaLoai, x.GiaBan, x.SoLuong, x.DonViTinh }).OrderByDescending(s => s.NgayTao).Take(3).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok("Err");
            }
        }
        [Route("get-giaban")]
        [HttpGet]
        public IActionResult GetGiaBan()
        {
            try
            {
                var result = db.Sanphams.Select(x => new { x.MaSP, x.TenSP, x.NgayTao, x.Anh, x.MaLoai, x.GiaBan, x.SoLuong, x.DonViTinh }).OrderByDescending(s => s.GiaBan).Take(3).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok("Err");
            }
        }
        [Route("get-soluong")]
        [HttpGet]
        public IActionResult GetSoLuong()
        {
            try
            {
                var result = db.Sanphams.Select(x => new { x.MaSP, x.TenSP, x.NgayTao, x.Anh, x.MaLoai, x.GiaBan, x.SoLuong, x.DonViTinh }).OrderByDescending(s => s.SoLuong).Take(3).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok("Err");
            }
        }
        [Route("get-danhmuc")]
        [HttpGet]
        public IEnumerable<Danhsachloaisp> GetAllMenu()
        {
            return GetData();
        }

        [NonAction]
        private List<Danhsachloaisp> GetData()
        {
            var allItemGroups = db.Danhsachloaisps.Where(x => x.TrangThai == true).Select(x => new Danhsachloaisp { Maloai = x.MaLoai, MaLoaiCha = x.MaLoaiCha, TenLoai = x.TenLoai }).ToList();
            var lstParent = allItemGroups.Where(ds => ds.MaLoaiCha == null).ToList();

            return lstParent;
        }
        [NonAction]
        private List<Danhsachloaisp> GetHiearchyList(List<Danhsachloaisp> lstAll, Danhsachloaisp node)
        {
            var lstChilds = lstAll.Where(ds => ds.MaLoaiCha == node.Maloai).ToList();
            if (lstChilds.Count == 0)
                return null;

            return lstChilds.ToList();
        }
    }
    public partial class Danhsachloaisp
    {
        public int Maloai { get; set; }
        public int? MaLoaiCha { get; set; }
        public string TenLoai { get; set; }
        public int? Stt { get; set; }
        public bool TrangThai { get; set; }
    }
}

