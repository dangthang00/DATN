using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Admin_DATN.Models
{
    public partial class DATNContext : DbContext
    {
        public DATNContext()
        {
        }

        public DATNContext(DbContextOptions<DATNContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Chitetkho> Chitetkhos { get; set; }
        public virtual DbSet<Chitietanhsanpham> Chitietanhsanphams { get; set; }
        public virtual DbSet<Chitietdonhang> Chitietdonhangs { get; set; }
        public virtual DbSet<Danhsachloaisp> Danhsachloaisps { get; set; }
        public virtual DbSet<Donhang> Donhangs { get; set; }
        public virtual DbSet<Hoadonnhap> Hoadonnhaps { get; set; }
        public virtual DbSet<Hoadonxuat> Hoadonxuats { get; set; }
        public virtual DbSet<Khachhang> Khachhangs { get; set; }
        public virtual DbSet<Kho> Khos { get; set; }
        public virtual DbSet<Nguoidung> Nguoidungs { get; set; }
        public virtual DbSet<Nhacungcap> Nhacungcaps { get; set; }
        public virtual DbSet<Nhanvien> Nhanviens { get; set; }
        public virtual DbSet<Quatang> Quatangs { get; set; }
        public virtual DbSet<Sanpham> Sanphams { get; set; }
        public virtual DbSet<Taikhoan> Taikhoans { get; set; }
        public virtual DbSet<Tintuc> Tintucs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DangThawngs;Database=DATN;Trusted_Connection=True;Encrypt=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Chitetkho>(entity =>
            {
                entity.HasKey(e => e.MaChiTietKho);

                entity.ToTable("chitetkho");

                entity.Property(e => e.MaChiTietKho).ValueGeneratedNever();

                entity.Property(e => e.MaSp).HasColumnName("MaSP");

                entity.HasOne(d => d.MaKhoNavigation)
                    .WithMany(p => p.Chitetkhos)
                    .HasForeignKey(d => d.MaKho)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_chitetkho_kho");
            });

            modelBuilder.Entity<Chitietanhsanpham>(entity =>
            {
                entity.HasKey(e => e.MaAnhChitiet);

                entity.ToTable("chitietanhsanpham");

                entity.Property(e => e.Anh).HasMaxLength(250);

                entity.Property(e => e.MaSp).HasColumnName("MaSP");
            });

            modelBuilder.Entity<Chitietdonhang>(entity =>
            {
                entity.HasKey(e => e.MaChiTietDonHang);

                entity.ToTable("chitietdonhang");

                entity.Property(e => e.MaSp).HasColumnName("MaSP");

                entity.HasOne(d => d.MaDonHangNavigation)
                    .WithMany(p => p.Chitietdonhangs)
                    .HasForeignKey(d => d.MaDonHang)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_chitietdonhang_donhang");
            });

            modelBuilder.Entity<Danhsachloaisp>(entity =>
            {
                entity.HasKey(e => e.MaLoai);

                entity.ToTable("danhsachloaisp");

                entity.Property(e => e.MaLoai).ValueGeneratedNever();

                entity.Property(e => e.Stt).HasColumnName("STT");

                entity.Property(e => e.TenLoai)
                    .IsRequired()
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<Donhang>(entity =>
            {
                entity.HasKey(e => e.MaDonHang);

                entity.ToTable("donhang");

                entity.Property(e => e.NgayDat).HasColumnType("datetime");

                entity.HasOne(d => d.MaKhachHangNavigation)
                    .WithMany(p => p.Donhangs)
                    .HasForeignKey(d => d.MaKhachHang)
                    .HasConstraintName("FK_donhang_khachhang");
            });

            modelBuilder.Entity<Hoadonnhap>(entity =>
            {
                entity.HasKey(e => e.MaHoaDonNhap);

                entity.ToTable("hoadonnhap");

                entity.Property(e => e.NgayNhap).HasColumnType("datetime");

                entity.Property(e => e.SoHoaDon)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsFixedLength(true);

                entity.HasOne(d => d.MaNhaCungCapNavigation)
                    .WithMany(p => p.Hoadonnhaps)
                    .HasForeignKey(d => d.MaNhaCungCap)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_hoadonnhap_nhacungcap");
            });

            modelBuilder.Entity<Hoadonxuat>(entity =>
            {
                entity.HasKey(e => e.MaHoaDonXuat);

                entity.ToTable("hoadonxuat");

                entity.Property(e => e.NgayXuat).HasColumnType("datetime");

                entity.Property(e => e.SoHoaDon)
                    .HasMaxLength(50)
                    .IsFixedLength(true);

                entity.HasOne(d => d.MaKhachHangNavigation)
                    .WithMany(p => p.Hoadonxuats)
                    .HasForeignKey(d => d.MaKhachHang)
                    .HasConstraintName("FK_hoadonxuat_khachhang");
            });

            modelBuilder.Entity<Khachhang>(entity =>
            {
                entity.HasKey(e => e.MaKhachHang);

                entity.ToTable("khachhang");

                entity.Property(e => e.DiaChi).HasMaxLength(450);

                entity.Property(e => e.Email).HasMaxLength(250);

                entity.Property(e => e.SoDienThoai)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.TenKhachHang)
                    .IsRequired()
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<Kho>(entity =>
            {
                entity.HasKey(e => e.MaKho);

                entity.ToTable("kho");

                entity.Property(e => e.MaKho).ValueGeneratedNever();

                entity.Property(e => e.DiaChi)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.TenKho)
                    .IsRequired()
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<Nguoidung>(entity =>
            {
                entity.HasKey(e => e.MaNguoiDung);

                entity.ToTable("nguoidung");

                entity.Property(e => e.Anh)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.DiaChi).HasMaxLength(500);

                entity.Property(e => e.DienThoai)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.GioiTinh).HasMaxLength(20);

                entity.Property(e => e.HoTen).HasMaxLength(250);

                entity.Property(e => e.NgaySinh).HasColumnType("datetime");
            });

            modelBuilder.Entity<Nhacungcap>(entity =>
            {
                entity.HasKey(e => e.MaNhaCungCap);

                entity.ToTable("nhacungcap");

                entity.Property(e => e.DiaChi).HasMaxLength(500);

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.SoDienThoai)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.TenNhaCungCap).HasMaxLength(250);
            });

            modelBuilder.Entity<Nhanvien>(entity =>
            {
                entity.HasKey(e => e.Manv);

                entity.ToTable("nhanvien");

                entity.Property(e => e.Manv).ValueGeneratedNever();

                entity.Property(e => e.Diachi)
                    .HasMaxLength(500)
                    .HasColumnName("diachi");

                entity.Property(e => e.Sodienthoai)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("sodienthoai")
                    .IsFixedLength(true);

                entity.Property(e => e.Tennv)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<Quatang>(entity =>
            {
                entity.HasKey(e => e.MaQt);

                entity.ToTable("quatang");

                entity.Property(e => e.MaQt)
                    .ValueGeneratedNever()
                    .HasColumnName("MaQT");

                entity.Property(e => e.MaSp).HasColumnName("MaSP");

                entity.Property(e => e.Mota)
                    .HasMaxLength(10)
                    .IsFixedLength(true);

                entity.Property(e => e.TenQt)
                    .HasMaxLength(150)
                    .HasColumnName("TenQT");

                entity.HasOne(d => d.MaSpNavigation)
                    .WithMany(p => p.Quatangs)
                    .HasForeignKey(d => d.MaSp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_quatang_sanpham");
            });

            modelBuilder.Entity<Sanpham>(entity =>
            {
                entity.HasKey(e => e.MaSp);

                entity.ToTable("sanpham");

                entity.Property(e => e.MaSp).HasColumnName("MaSP");

                entity.Property(e => e.Anh)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.DonViTinh).HasMaxLength(50);

                entity.Property(e => e.GiaBan).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.Mota)
                    .IsRequired()
                    .HasColumnType("ntext");

                entity.Property(e => e.NgayTao).HasColumnType("date");

                entity.Property(e => e.TenSp)
                    .IsRequired()
                    .HasMaxLength(250)
                    .HasColumnName("TenSP");

                entity.HasOne(d => d.MaLoaiNavigation)
                    .WithMany(p => p.Sanphams)
                    .HasForeignKey(d => d.MaLoai)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_sanpham_danhsachloaisp");
            });

            modelBuilder.Entity<Taikhoan>(entity =>
            {
                entity.HasKey(e => e.MaTaiKhoan);

                entity.ToTable("taikhoan");

                entity.Property(e => e.LoaiQuyet)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.MatKhau)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.NgayBatDau).HasColumnType("datetime");

                entity.Property(e => e.NgayKetThuc).HasColumnType("datetime");

                entity.Property(e => e.TaiKhoan1)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("TaiKhoan");
            });

            modelBuilder.Entity<Tintuc>(entity =>
            {
                entity.HasKey(e => e.MaTt);

                entity.ToTable("tintuc");

                entity.Property(e => e.MaTt).HasColumnName("MaTT");

                entity.Property(e => e.AnhTt)
                    .HasMaxLength(250)
                    .HasColumnName("AnhTT");

                entity.Property(e => e.Noidung).HasMaxLength(350);

                entity.Property(e => e.Tieude).HasMaxLength(250);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
