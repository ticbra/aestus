namespace AestusProject.Models
{
    public class Setting
    {
        public int SettingId { get; set; }

        // Postavite podrazumevanu vrednost za Name
        public string Name { get; set; } 

        public decimal Value { get; set; }
        public DateTime EffectiveDate { get; set; }

        // Postavite CreatedAt na trenutni datum i vreme po UTC vremenu
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
