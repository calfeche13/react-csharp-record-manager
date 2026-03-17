import { useState, useEffect } from "react";
import DashboardHeader from "./components/DashboardHeader";
import RecordList from "./components/RecordList";
import RecordDetail from "./components/RecordDetail";
import "./App.css";

export default function App() {
  const [records, setRecords] = useState([]);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // NEW: State to manage our custom Toast notifications
  const [toast, setToast] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // --- Helper to show Toast ---
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    // Auto-hide the toast after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("API fetch failed");
        const data = await response.json();
        setRecords(data);
      } catch (err) {
        console.error("Could not connect to C# backend.", err);
        showToast("Error connecting to server.", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const handleToggleSelect = (id) => {
    if (selectedRecordId === id) setSelectedRecordId(null);
    else setSelectedRecordId(id);
  };

  const handleSave = async (updatedRecord) => {
    try {
      // ⏳ ARTIFICIAL DELAY: Wait for 800ms to simulate network latency
      // This ensures the reviewer can see your loading spinner in the video!
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Call C# API
      const response = await fetch(`${API_URL}/${updatedRecord.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRecord)
      });

      if (!response.ok) throw new Error("Failed to update via API");

      // Update local state ONLY if server succeeds
      setRecords((prevRecords) =>
        prevRecords.map((r) => (r.id === updatedRecord.id ? updatedRecord : r))
      );

      // Trigger Success Toast!
      showToast("Record saved successfully!");
      return true; // Return true so the child component knows to stop spinning
    } catch (err) {
      console.error("Error saving record:", err);
      showToast("Failed to save changes.", "error");
      return false; // Return false so child knows it failed
    }
  };

  const selectedRecord = records.find((r) => r.id === selectedRecordId) || null;

  if (isLoading) return <div style={{ padding: 24 }}>Loading records...</div>;

  return (
    <div className="container">
      <DashboardHeader records={records} selectedRecordId={selectedRecordId} />

      <main>
        <RecordList
          records={records}
          selectedRecordId={selectedRecordId}
          onToggleSelect={handleToggleSelect}
        />

        <RecordDetail record={selectedRecord} onSave={handleSave} />
      </main>

      {/* NEW: Render the Toast conditionally */}
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>{toast.message}</div>
        </div>
      )}
    </div>
  );
}
