using Microsoft.EntityFrameworkCore;

namespace Estudiantes.Backend
{
    public class EstudiantesDbContext : DbContext
    {
        public EstudiantesDbContext(DbContextOptions<EstudiantesDbContext> op) : base(op)
        {

        }
        public DbSet<Estudiantes> estudiantes { get; set; }
    }
}
