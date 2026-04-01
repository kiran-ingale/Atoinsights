import { useState } from "react";

import { analyzeQuery } from "../api";
import AgentSteps from "./AgentSteps";
import Charts from "./Charts";
import FileUpload from "./FileUpload";

function ChatBox() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (filename, originalName = filename) => {
    setUploadedFile(filename);
    setChatHistory((prev) => [
      ...prev,
      {
        type: "system",
        content: `Dataset "${originalName}" uploaded successfully! You can now ask questions about this data.`,
      },
    ]);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");

    setChatHistory((prev) => [
      ...prev,
      {
        type: "user",
        content: userMessage,
      },
    ]);

    setLoading(true);

    try {
      const res = await analyzeQuery(userMessage, uploadedFile);

      setChatHistory((prev) => [
        ...prev,
        {
          type: "ai",
          content: res.text,
          charts: res.charts || [],
          steps: res.steps || [],
        },
      ]);

    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        {
          type: "error",
          content: "Error connecting to backend. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h2>AutoInsights AI Data Analyst</h2>

      <FileUpload onFileUpload={handleFileUpload} disabled={loading} />

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          maxHeight: "400px",
          overflowY: "auto",
          backgroundColor: "#fafafa",
        }}
      >
        {chatHistory.length === 0 && (
          <div
            style={{ textAlign: "center", color: "#999", fontStyle: "italic" }}
          >
            Upload a dataset and start asking questions about your data!
          </div>
        )}

        {chatHistory.map((message, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              display: "flex",
              justifyContent:
                message.type === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "12px 16px",
                borderRadius: "18px",
                backgroundColor:
                  message.type === "user"
                    ? "#007bff"
                    : message.type === "ai"
                      ? "#e3f2fd"
                      : message.type === "system"
                        ? "#fff3cd"
                        : "#f8d7da",
                color:
                  message.type === "user"
                    ? "white"
                    : message.type === "error"
                      ? "#721c24"
                      : "#333",
                border:
                  message.type === "system" ? "1px solid #ffeaa7" : "none",
              }}
            >
              {message.type === "ai" &&
                message.charts &&
                message.charts.length > 0 && (
                  <div style={{ marginBottom: "10px" }}>
                    <Charts charts={message.charts} />
                  </div>
                )}

              <div style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
                {message.content}
              </div>

              {message.type === "ai" &&
                message.steps &&
                message.steps.length > 0 && (
                  <div style={{ marginTop: "10px" }}>
                    <AgentSteps steps={message.steps} />
                  </div>
                )}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <div style={{ fontSize: "16px", color: "#007bff" }}>
              AI Agents are analyzing your query...
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask questions about your data..."
          disabled={loading}
          style={{
            flex: 1,
            padding: "12px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "20px",
            resize: "none",
            minHeight: "20px",
            maxHeight: "100px",
            outline: "none",
          }}
          rows={1}
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: loading || !input.trim() ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "20px",
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {loading ? "Analyzing..." : "Send"}
        </button>
      </div>

      {uploadedFile && (
        <div style={{ marginTop: "10px", fontSize: "0.9em", color: "#666" }}>
          Current dataset: {uploadedFile}
        </div>
      )}
    </div>
  );
}

export default ChatBox;
