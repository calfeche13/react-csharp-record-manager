using Server.Models;

namespace Server.Services
{
    public interface IRecordService
    {
        IEnumerable<RecordItem> GetAllRecords();
        RecordItem? UpdateRecord(int id, RecordItem updatedRecord);
    }
}