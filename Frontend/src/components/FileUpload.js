import React, { useState } from "react";

import { uploadFile } from "../api";

function FileUpload({ onFileUpload, disabled }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError("");

    try {
      const result = await uploadFile(selectedFile);
      onFileUpload(result.filename, result.original_name || selectedFile.name);
      setSelectedFile(null);
      document.getElementById("file-input").value = "";
    } catch (error) {
      console.error("Upload error:", error);
      const message =
        error.response?.data?.detail || error.message || "Upload failed";
      setError(message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "15px",
        border: "2px dashed #ccc",
        borderRadius: "5px",
      }}
    >
      <h3>Upload Dataset</h3>
      <input
        id="file-input"
        type="file"
        accept=".csv,.xlsx,.xls,.json"
        onChange={handleFileChange}
        disabled={disabled || uploading}
        style={{ marginBottom: "10px" }}
      />
      <br />
      <button
        onClick={handleUpload}
        disabled={!selectedFile || disabled || uploading}
        style={{
          padding: "8px 16px",
          backgroundColor:
            !selectedFile || disabled || uploading ? "#ccc" : "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor:
            !selectedFile || disabled || uploading ? "not-allowed" : "pointer",
        }}
      >
        {uploading ? "Uploading..." : "Upload Dataset"}
      </button>
      {selectedFile && (
        <p style={{ marginTop: "10px", fontSize: "0.9em", color: "#555" }}>
          Selected: {selectedFile.name}
        </p>
      )}
      {error && (
        <p style={{ marginTop: "10px", fontSize: "0.9em", color: "#b00020" }}>
          Upload error: {error}
        </p>
      )}
    </div>
  );
}

export default FileUpload;
