using Microsoft.EntityFrameworkCore;
using organic_classification.Model.Image;

namespace organic_classification.Model.Context
{
    public class DbContextModel : DbContext
    {
        //main
        public DbSet<Images> images { get; set; }

        //end main

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlServer(@"data source=localhost;initial catalog=AI;persist security info=True; Trusted_Connection=SSPI;Encrypt=false;TrustServerCertificate=True; user id=sa;password=1qaz2wsx1@");
    }
}
