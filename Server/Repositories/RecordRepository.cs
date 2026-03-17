using Server.Models;

namespace Server.Repositories;

public interface IRecordRepository
{
    IEnumerable<RecordItem> GetAll();
    RecordItem? Update(int id, RecordItem updatedRecord);
}

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
            new RecordItem { Id = 5, Name = "Project Epsilon", Category = "HR", Status = "Pending", Description = "New employee onboarding portal." }
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