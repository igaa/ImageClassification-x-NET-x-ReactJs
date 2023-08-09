using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace organic_classification.Model.Image
{
    public class Images
    {
        static DateTime _date = DateTime.Now;
        public int id { get; set; }

        [Column(TypeName = "varchar(255)")]
        public string name { get; set; }

        [Column(TypeName = "varchar(255)")]
        public string label { get; set; }

        [Column(TypeName = "varchar(255)")]
        public string o_score { get; set; }

        [Column(TypeName = "varchar(255)")]
        public string n_score { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? created_date { get; set; }

        [Column(TypeName = "bit")]
        public bool trained { get; set; }

    }

    public class DataTraining
    {
        public int id { get; set; }
        public int id_image { get; set; }

        [Column(TypeName = "varchar(255)")]
        public string name { get; set; }

        [Column(TypeName = "varchar(255)")]
        public string category { get; set; }

        [Column(TypeName = "varchar(1024)")]
        public string path { get; set; }


    }



    public class ImagesResult
    {
        public int id { get; set; }
        public string name { get; set; }
        public string label { get; set; }
        public string o_score { get; set; }
        public string n_score { get; set; }
        public bool trained { get; set; }
        public DateTime? created_date { get; set; }
        public string filepath { get; set; }

    }

    public class ImageCategory
    {
        public int id { get; set; }
        public string name { get; set; }
        public string value { get; set; }
    }
}
