using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Models
{
    public class MGContext : DbContext
    {
        public DbSet<Film> Filmovi { get; set; }

        public MGContext(DbContextOptions options) : base(options)
        {
        }
    }
}