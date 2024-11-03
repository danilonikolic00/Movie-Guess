using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Film
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        public required string Naziv { get; set; }

        [Column("Reziser")]
        public required string Reziser { get; set; }

        [Column("Godina")]
        public int Godina { get; set; }   

        [Column("Zanr")]
        public required string Zanr { get; set; }

        [Column("Glumac")]
        public required string Glumac { get; set; }

        [Column("Zemlja")]
        public required string Zemlja { get; set; }

        [Column("Duzina")]
        public int Duzina { get; set; } 
        
        [Column("Oskar")]
        public bool Oskar { get; set; }
    }
}