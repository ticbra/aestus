using Microsoft.EntityFrameworkCore;
using AestusProject.Models; // Prilagodite naziv prema namespace-u vašeg projekta
namespace AestusProject.Data
{
    using Microsoft.EntityFrameworkCore;

    public class AestusDbContext : DbContext
    {
        public AestusDbContext(DbContextOptions<AestusDbContext> options) : base(options) { }

        public DbSet<Setting> Settings { get; set; }
    }
}
