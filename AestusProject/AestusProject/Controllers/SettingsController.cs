using AestusProject.Data;
using AestusProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class SettingsController : ControllerBase
{
    private readonly AestusDbContext _context;
    private readonly ILogger<SettingsController> _logger;

    public SettingsController(AestusDbContext context, ILogger<SettingsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // GET: Dohvati trenutno važeću postavku ili postavku za određeni trenutak u vremenu
    [HttpGet("{name?}")]
    public async Task<ActionResult<Setting>> GetCurrentSetting(string name = "Porez na dobit", DateTime? effectiveDate = null)
    {
        effectiveDate ??= DateTime.UtcNow;

        var setting = await _context.Settings
            .Where(s => s.Name == name && s.EffectiveDate <= effectiveDate)
            .OrderByDescending(s => s.EffectiveDate)
            .FirstOrDefaultAsync();

        if (setting == null)
            return NotFound();

        return setting;
    }

    // GET: Dohvati sve postavke
    [HttpGet]

    public async Task<ActionResult<IEnumerable<Setting>>> GetAllSettings()
    {
        var settings = await _context.Settings.ToListAsync();
        return Ok(settings);
    }

    // POST: Dodaj novu vrijednost postavke s datumom od kojeg postaje važeća
    [HttpPost]
    public async Task<ActionResult<Setting>> AddSetting(Setting setting)
    {
        _context.Settings.Add(setting);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCurrentSetting), new { name = setting.Name }, setting);
    }

    // PUT: Ažuriraj vrijednost postavke za neki postojeći unos
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSetting(int id, Setting setting)
    {
        if (id != setting.SettingId)
            return BadRequest();

        _context.Entry(setting).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!SettingExists(id))
                return NotFound();
            else
                throw;
        }

        return NoContent();
    }

    // DELETE: Obriši kombinaciju vrijednosti i vremena za postavku, osim najvećeg datuma
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSetting(int id)
    {
        var setting = await _context.Settings.FindAsync(id);
        if (setting == null)
            return NotFound();

        var latestSetting = await _context.Settings
            .Where(s => s.Name == setting.Name)
            .OrderByDescending(s => s.EffectiveDate)
            .FirstOrDefaultAsync();

        if (latestSetting != null && latestSetting.SettingId == setting.SettingId)
        {
            return BadRequest("Ne možete obrisati postavku s najvećim datumom efektivnosti.");
        }

        _context.Settings.Remove(setting);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool SettingExists(int id)
    {
        return _context.Settings.Any(e => e.SettingId == id);
    }
}
