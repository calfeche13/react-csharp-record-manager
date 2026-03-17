using Server.Models;
using Server.Repositories;

namespace Server.Services
{
    public class RecordService : IRecordService
    {
        private readonly IRecordRepository _repository;

        public RecordService(IRecordRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<RecordItem> GetAllRecords()
        {
            return _repository.GetAll();
        }

        public RecordItem? UpdateRecord(int id, RecordItem updatedRecord)
        {
            if (string.IsNullOrWhiteSpace(updatedRecord.Name))
            {
                return null;
            }

            return _repository.Update(id, updatedRecord);
        }
    }
}