using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Korisnik
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Tip")]
        public required string Tip { get; set; }


        [Column("KorisnickoIme")]
        public required string KorisnickoIme { get; set; }

        [Column("Lozinka")]
        public required string Lozinka { get; set; }

        [Column("BrojOdigranih")]
        public int BrojOdigranih { get; set; }

        [Column("BrojPogodjenih")]
        public int BrojPogodjenih { get; set; }

        [Column("Uspesnost")]
        public double Uspesnost { get; set; }

        [Column("UkupanSkor")]
        public int UkupanSkor { get; set; } 
    }
}