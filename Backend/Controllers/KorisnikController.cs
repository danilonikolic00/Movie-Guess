using BackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class KorisnikController : ControllerBase
{
    public MGContext Context { get; set; }
    private IConfiguration _config;
    public KorisnikController(MGContext context, IConfiguration config)
    {
        Context = context;
        _config = config;
    }

    [Route("Register/{korisnicko_ime}/{lozinka}")]
    [HttpPost]
    public async Task<ActionResult> Register(string korisnicko_ime, string lozinka)
    {
        if (await Context.Korisnici.Where(p => p.KorisnickoIme == korisnicko_ime).FirstOrDefaultAsync() != null)
            return Ok("Postoji korisnicko ime");
        try
        {
            Korisnik k = new Korisnik
            {
                KorisnickoIme = korisnicko_ime,
                Tip = "Korisnik",
                Lozinka = lozinka,
                BrojOdigranih = 0,
                BrojPogodjenih = 0,
                Uspesnost = 0,
                UkupanSkor = 0
            };
            Context.Korisnici.Add(k);
            await Context.SaveChangesAsync();
            return Ok("Uspesna registracija!");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("Login/{korisnicko_ime}/{lozinka}")]
    [HttpGet]
    public async Task<ActionResult<int>> Login(string korisnicko_ime, string lozinka)
    {
        try
        {
            var korisnik = Context.Korisnici.Where(k => k.KorisnickoIme == korisnicko_ime && k.Lozinka == lozinka).FirstOrDefault();
            await Context.SaveChangesAsync();
            if (korisnik != null)
                return korisnik.ID;
            else
                return 0;
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("AzurirajKorisnika/{id}/{pogodjen}/{pokusaj}")]
    [HttpPut]
    public async Task<ActionResult<string>> AzurirajKorisnika(int id, bool pogodjen, int pokusaj)
    {
        var korisnik = await Context.Korisnici.FindAsync(id);
        if (korisnik == null)
            return BadRequest("Korisnik ne postoji!");
        try
        {
            korisnik.BrojOdigranih++;
            if (pogodjen)
            {
                korisnik.BrojPogodjenih++;
                korisnik.UkupanSkor += 120 - ((pokusaj - 1) * 10);
                korisnik.Uspesnost = (double)korisnik.BrojPogodjenih / (double)korisnik.BrojOdigranih * 100;
            }
            else
                korisnik.Uspesnost = (double)korisnik.BrojPogodjenih / (double)korisnik.BrojOdigranih * 100;
            await Context.SaveChangesAsync();
            return Ok("Igra zavrsena,podaci azurirani!");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("VratiRangListu")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> VratiRangListu()
    {
        var korisnici = await Context.Korisnici
                                    .Select(k => new
                                    {
                                        k.KorisnickoIme,
                                        k.BrojOdigranih,
                                        k.BrojPogodjenih,
                                        k.Uspesnost,
                                        k.UkupanSkor
                                    })
                                    .OrderByDescending(k => k.UkupanSkor)
                                    .ToListAsync();

        return Ok(korisnici);
    }

}