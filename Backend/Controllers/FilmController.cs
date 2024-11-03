using Backend.Models;
using BackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class FilmController : ControllerBase
{
    public MGContext Context { get; set; }
    private readonly Random _random;

    private IConfiguration _config;
    public FilmController(MGContext context, IConfiguration config)
    {
        Context = context;
        _config = config;
        _random = new Random();
    }

    [Route("DodajFilm/{naziv}/{reziser}/{godina}/{zanr}/{glumac}/{zemlja}/{duzina}/{oskar}")]
    [HttpPost]
    public async Task<ActionResult<Film>> DodajFilm(string naziv, string reziser, int godina, string zanr, string glumac, string zemlja, int duzina, bool oskar)
    {
        var film = Context.Filmovi.Where(f => f.Naziv == naziv).FirstOrDefault();
        if (film != null)
            return BadRequest("Film vec postoji!");
        try
        {
            Film f = new Film
            {
                Naziv = naziv,
                Reziser = reziser,
                Godina = godina,
                Zanr = zanr,
                Glumac = glumac,
                Zemlja = zemlja,
                Duzina = duzina,
                Oskar = oskar
            };
            Context.Filmovi.Add(f);
            await Context.SaveChangesAsync();
            return Ok("Uspesno dodat film!");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("VratiFilm")]
    [HttpGet]
    public async Task<ActionResult<Film>> VratiFilm()
    {
        var maxId = await Context.Filmovi.MaxAsync(m => m.ID);
        var randomId = _random.Next(1, maxId + 1);

        var randomFilm = Context.Filmovi.Where(f => f.ID == randomId).FirstOrDefault();

        if (randomFilm == null)
            return BadRequest("Nije pronadjen film!");
        return randomFilm;
    }

    [Route("PostojiFilm/{naziv}")]
    [HttpGet]
    public async Task<ActionResult<bool>> PostojiFilm(string naziv)
    {
        var film = await Context.Filmovi.Where(f => f.Naziv == naziv).FirstOrDefaultAsync();
        if (film != null)
            return true;
        return false;
    }

    [Route("VratiPostojeciFilm/{naziv}")]
    [HttpGet]
    public async Task<ActionResult<Object>> VratiPostojeciFilm(string naziv)
    {
        var film = await Context.Filmovi.Where(f => f.Naziv == naziv).Select(f => new
        {
            f.Naziv,
            f.Zemlja,
            f.Reziser,
            f.Glumac,
            f.Godina,
            f.Zanr
        }).FirstOrDefaultAsync();
        if (film != null)
            return film;
        return BadRequest("Ne postoji film sa ovim nazivom!");
    }

    [Route("UporediFilmove/{film1}/{film2}")]
    [HttpGet]
    public async Task<ActionResult<List<bool>>> VratiFilm(string film1, string film2)
    {
        var rezultati = new List<bool>();

        var f1 = await Context.Filmovi.FirstOrDefaultAsync(f => f.Naziv == film1);
        var f2 = await Context.Filmovi.FirstOrDefaultAsync(f => f.Naziv == film2);

        if (f1 == null || f2 == null)
        {
            return BadRequest("Ne postoji film sa tim nazivom!");
        }

        rezultati.Add(f1.Naziv == f2.Naziv);
        rezultati.Add(f1.Zemlja == f2.Zemlja);
        rezultati.Add(f1.Reziser == f2.Reziser);
        rezultati.Add(f1.Glumac == f2.Glumac);
        rezultati.Add(f1.Godina == f2.Godina);
        rezultati.Add(f1.Zanr == f2.Zanr);
        return rezultati;
    }

    [HttpGet("VratiFilmove/{pojam}")]
    public IActionResult VratiFilmove(string pojam)
    {
        try
        {
            var films = Context.Filmovi.Where(f => f.Naziv.StartsWith(pojam)).Select(f => f.Naziv).ToList();
            films.Sort();
            return Ok(films);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}