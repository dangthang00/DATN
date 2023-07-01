using Admin_DATN.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Admin_DATN.Services;
using Admin_DATN.Entities;

namespace Admin_DATN.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private IUserService _userService;

        private DATNContext db = new DATNContext();
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateModel model)
        {
            var user = _userService.Authenticate(model.Username, model.Password);

            if (user == null)
                return BadRequest(new { message = "Tài khoản hoặc mật khẩu sai!" });

            return Ok(user);
        }

        [Route("search")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                var hoten = formData.Keys.Contains("hoten") ? formData["hoten"].ToString().Trim() : "";
                var result = from t in db.Taikhoans
                             join n in db.Nguoidungs on t.MaNguoiDung equals n.MaNguoiDung
                             select new { n.HoTen, n.NgaySinh, n.GioiTinh, n.DiaChi, n.Email, n.DienThoai, TaiKhoan = t.TaiKhoan1, t.MatKhau, LoaiQuyen = t.LoaiQuyet, n.Anh, n.MaNguoiDung };
                var kq = result.Where(x => x.HoTen.Contains(hoten)).OrderByDescending(x => x.MaNguoiDung).Skip(pageSize * (page - 1)).Take(pageSize).ToList();
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




        [Route("get-by-id/{id}")]
        [HttpGet]
        public IActionResult GetById(int? id)
        {
            var result = from t in db.Taikhoans
                         join n in db.Nguoidungs on t.MaNguoiDung equals n.MaNguoiDung
                         select new { n.HoTen, n.NgaySinh, n.GioiTinh, n.DiaChi, n.Email, n.DienThoai, TaiKhoan = t.TaiKhoan1, t.MatKhau, LoaiQuyen = t.LoaiQuyet, n.Anh, n.MaNguoiDung };
            var user = result.SingleOrDefault(x => x.MaNguoiDung == id);
            return Ok(new { user });
        }

        [Route("create-user")]
        [HttpPost]
        public IActionResult CreateUser([FromBody] UserModel model)
        {
            db.Nguoidungs.Add(model.nguoidung);
            db.SaveChanges();

            int MaNguoiDung = model.nguoidung.MaNguoiDung;
            model.taikhoan.MaNguoiDung = MaNguoiDung;
            db.Taikhoans.Add(model.taikhoan);
            db.SaveChanges();
            return Ok(new { data = "OK" });
        }


        [Route("update-user")]
        [HttpPost]
        public IActionResult UpdateUser([FromBody] UserModel model)
        {
            var obj_nguoidung = db.Nguoidungs.SingleOrDefault(x => x.MaNguoiDung == model.nguoidung.MaNguoiDung);
            obj_nguoidung.HoTen = model.nguoidung.HoTen;
            obj_nguoidung.DiaChi = model.nguoidung.DiaChi;
            obj_nguoidung.NgaySinh = model.nguoidung.NgaySinh;
            //....
            db.SaveChanges();

            var obj_taikhoan = db.Taikhoans.SingleOrDefault(x => x.MaNguoiDung == model.taikhoan.MaNguoiDung);
            obj_taikhoan.TaiKhoan1 = model.taikhoan.TaiKhoan1;
            obj_taikhoan.MatKhau = model.taikhoan.MatKhau;
            //....
            db.SaveChanges();
            return Ok(new { data = "OK" });
        }

        [Route("delete-user/{MaNguoiDung}")]
        [HttpDelete]
        public IActionResult DeleteUser(int? MaNguoiDung)
        {
            var obj1 = db.Taikhoans.SingleOrDefault(s => s.MaNguoiDung == MaNguoiDung);
            db.Taikhoans.Remove(obj1);
            db.SaveChanges();
            var obj2 = db.Nguoidungs.SingleOrDefault(s => s.MaNguoiDung == MaNguoiDung);
            db.Nguoidungs.Remove(obj2);
            db.SaveChanges();
            return Ok(new { data = "OK" });
        }
    }
}
