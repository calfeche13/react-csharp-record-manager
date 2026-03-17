export default function DashboardHeader({ records, selectedRecordId }) {
  const totalRecords = records.length;
  const selectedCount = selectedRecordId ? 1 : 0;

  const statusSummary = records.reduce((acc, record) => {
    acc[record.status] = (acc[record.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <header>
      <h1>Record Manager</h1>
      <div className="stats-container">
        <div className="stat-badge">
          Total Records: <strong>{totalRecords}</strong>
        </div>
        <div className="stat-badge">
          Selected: <strong>{selectedCount}</strong>
        </div>
        <div className="stat-badge">
          Active: <strong>{statusSummary["Active"] || 0}</strong> &nbsp;|&nbsp;
          Pending: <strong>{statusSummary["Pending"] || 0}</strong>{" "}
          &nbsp;|&nbsp; Completed:{" "}
          <strong>{statusSummary["Completed"] || 0}</strong>
        </div>
      </div>
    </header>
  );
}
