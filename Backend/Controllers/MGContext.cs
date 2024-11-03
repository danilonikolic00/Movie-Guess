using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Models;

namespace BackEnd.Models
{
    public class MGContext : DbContext
    {
        public DbSet<Korisnik> Korisnici { get; set; }
        public DbSet<Film> Filmovi { get; set; }

        public MGContext(DbContextOptions options) : base(options)
        {
        }
    }
}