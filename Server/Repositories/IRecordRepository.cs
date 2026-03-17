using Server.Models;

namespace Server.Repositories
{
    public interface IRecordRepository
    {
        IEnumerable<RecordItem> GetAll();
        RecordItem? Update(int id, RecordItem updatedRecord);
    }
}

