using Server.Models;

namespace Server.Repositories
{
    public class RecordRepository : IRecordRepository
    {
        private readonly List<RecordItem> _records;

        public RecordRepository()
        {
            _records = new List<RecordItem>
            {
                new RecordItem { Id = 1, Name = "Project Alpha", Category = "Software", Status = "Active", Description = "Core system overhaul." },
                new RecordItem { Id = 2, Name = "Project Beta", Category = "Marketing", Status = "Pending", Description = "Q3 Ad campaign." },
                new RecordItem { Id = 3, Name = "Project Gamma", Category = "Software", Status = "Completed", Description = "Legacy API deprecation." },
                new RecordItem { Id = 4, Name = "Project Delta", Category = "Operations", Status = "Active", Description = "Office hardware upgrade." },
                new RecordItem { Id = 5, Name = "Project Epsilon", Category = "HR", Status = "Pending", Description = "New employee onboarding portal." },
                new RecordItem { Id = 6, Name = "Project Zeta", Category = "Software", Status = "Active", Description = "Mobile app redesign." },
                new RecordItem { Id = 7, Name = "Project Eta", Category = "Legal", Status = "Completed", Description = "Annual compliance audit." },
                new RecordItem { Id = 8, Name = "Project Theta", Category = "Marketing", Status = "Active", Description = "Social media expansion." },
                new RecordItem { Id = 9, Name = "Project Iota", Category = "Software", Status = "Pending", Description = "Database migration to cloud." },
                new RecordItem { Id = 10, Name = "Project Kappa", Category = "Finance", Status = "Active", Description = "Fiscal year budget planning." },
                new RecordItem { Id = 11, Name = "Project Lambda", Category = "Operations", Status = "Completed", Description = "Warehouse logistics optimization." },
                new RecordItem { Id = 12, Name = "Project Mu", Category = "HR", Status = "Active", Description = "Diversity and inclusion workshop." },
                new RecordItem { Id = 13, Name = "Project Nu", Category = "Software", Status = "Pending", Description = "Integration with third-party payment gateway." },
                new RecordItem { Id = 14, Name = "Project Xi", Category = "Marketing", Status = "Completed", Description = "Winter holiday promotional strategy." },
                new RecordItem { Id = 15, Name = "Project Omicron", Category = "Finance", Status = "Pending", Description = "Internal payroll system patch." }
            };
        }

        public IEnumerable<RecordItem> GetAll() => _records;

        public RecordItem? Update(int id, RecordItem updatedRecord)
        {
            var record = _records.FirstOrDefault(r => r.Id == id);
            if (record == null) return null;

            record.Name = updatedRecord.Name;
            record.Category = updatedRecord.Category;
            record.Status = updatedRecord.Status;
            record.Description = updatedRecord.Description;

            return record;
        }
    }
}