export default function RecordList({
  records,
  selectedRecordId,
  onToggleSelect
}) {
  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "status active";
      case "Pending":
        return "status pending";
      case "Completed":
        return "status completed";
      default:
        return "status";
    }
  };

  return (
    <aside className="panel">
      <div className="panel-header">Records List</div>
      <div className="record-list">
        {records.map((record) => {
          const isActive = selectedRecordId === record.id;
          return (
            <div
              key={record.id}
              className={`record-item ${isActive ? "active" : ""}`}
              onClick={() => onToggleSelect(record.id)}
            >
              <div className="record-header">
                <span className="record-name">{record.name}</span>
                <span className={getStatusClass(record.status)}>
                  {record.status}
                </span>
              </div>
              <div className="record-category">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                {record.category}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
