import { useState, useEffect } from "react";

export default function RecordDetail({ record, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (record) {
      setFormData({ ...record });
      setIsEditing(false);
      setSaveError(null);
    } else {
      setFormData(null);
    }
  }, [record]);

  if (!record || !formData) {
    return (
      <section className="panel">
        <div className="panel-header">Record Details</div>
        <div className="placeholder-view">Select a record to view details.</div>
      </section>
    );
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCancel = () => {
    setFormData({ ...record });
    setIsEditing(false);
    setSaveError(null); // Clear errors on cancel
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);

    const success = await onSave(formData);

    setIsSaving(false);

    if (success) {
      setIsEditing(false);
    } else {
      setSaveError(
        "Failed to save. Please check your connection and try again."
      );
    }
  };

  const hasChanges =
    record.name !== formData.name ||
    record.category !== formData.category ||
    record.status !== formData.status ||
    record.description !== formData.description;

  return (
    <section className="panel">
      <div className="panel-header">Record Details</div>

      <div className={`record-details ${!isEditing ? "read-only-mode" : ""}`}>
        {isSaving && (
          <div className="loading-overlay">
            <span className="spinner large"></span>
            <div>Saving changes...</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              readOnly={!isEditing}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                value={formData.category}
                onChange={handleChange}
                readOnly={!isEditing}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={formData.status}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="form-actions">
            {!isEditing ? (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            ) : (
              <>
                {saveError && <div className="text-error">{saveError}</div>}

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                {hasChanges && (
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSaving}
                  >
                    Save Changes
                  </button>
                )}
              </>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
