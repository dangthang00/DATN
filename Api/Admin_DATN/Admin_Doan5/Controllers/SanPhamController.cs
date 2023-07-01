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
    public class SanPhamController : Controller
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
                var tensp = formData.Keys.Contains("tensp") ? formData["tensp"].ToString().Trim() : "";
                var result = from t in db.Sanphams

                             select new { t.TenSp, t.MaSp, t.MaLoai, };
                var kq = result.Where(x => x.TenSp.Contains(tensp)).OrderByDescending(x => x.MaSp).Skip(pageSize * (page - 1)).Take(pageSize).ToList();
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
                var kq = from r in db.Sanphams
                         join d in db.Danhsachloaisps on r.MaLoai equals d.MaLoai
                         join k in db.Nhacungcaps on r.MaNhaCungCap equals k.MaNhaCungCap
                         select new { r.MaSp, r.TenSp, r.Anh, r.Mota, r.NgayTao, r.MaLoai, r.SoLuong, r.MaNhaCungCap, r.DonViTinh, r.GiaBan, d.TenLoai, k.TenNhaCungCap };
                var result = kq.ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Err");
            }
        }

        [Route("get-by-id/{id}")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            try
            {
                var kq = from r in db.Sanphams

                         select new { r.GiaBan, r.MaLoai, r.MaSp, r.Anh, r.MaNhaCungCap, r.Mota, r.DonViTinh, r.TenSp, r.SoLuong };
                var result = kq.SingleOrDefault(s => s.MaSp == id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Err");
            }
        }

        [Route("create-sanpham")]
        [HttpPost]
        public IActionResult CreateSanpham(SanphamModel model)
        {
            db.Sanphams.Add(model.sanpham);
            db.SaveChanges();


            return Ok(new { data = "OK" });
        }


        [Route("update-sanpham")]
        [HttpPost]
        public IActionResult UpdateSanpham([FromBody] SanphamModel model)
        {
            var sanpham = db.Sanphams.SingleOrDefault(x => x.MaSp == model.sanpham.MaSp);
            sanpham.MaSp = model.sanpham.MaSp;
            sanpham.TenSp = model.sanpham.TenSp;
            sanpham.MaNhaCungCap = model.sanpham.MaNhaCungCap;
            sanpham.SoLuong = model.sanpham.SoLuong;
            sanpham.Anh = model.sanpham.Anh;
            sanpham.GiaBan = model.sanpham.GiaBan;
            sanpham.NgayTao = model.sanpham.NgayTao;
            sanpham.MaLoai = model.sanpham.MaLoai;
            sanpham.DonViTinh = model.sanpham.DonViTinh;
            sanpham.Mota = model.sanpham.Mota;




            db.SaveChanges();


            return Ok(new { data = "OK" });
        }

        [Route("delete-sanpham/{MaSp}")]
        [HttpDelete]
        public IActionResult DeleteSanpham(int? MaSp)
        {
            var obj = db.Sanphams.SingleOrDefault(s => s.MaSp == MaSp);
            db.Sanphams.Remove(obj);
            db.SaveChanges();

            return Ok(new { data = "OK" });
        }
    }
}

