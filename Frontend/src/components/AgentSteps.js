import React from "react";

function AgentSteps({ steps }) {
  const agentNames = [
    "Interface Agent",
    "Data Acquisition Agent",
    "Inspector Agent",
    "Clean Agent",
    "EDA Agent",
    "Feature Agent",
    "Stat Agent",
    "Insight Agent",
    "Reporting Agent"
  ];

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Agent Workflow Progress:</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {agentNames.map((agent, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: steps.length > index ? "#e8f5e8" : "#f5f5f5",
              opacity: steps.length > index ? 1 : 0.5
            }}
          >
            <strong>{agent}</strong>
            {steps.length > index && (
              <div style={{ marginTop: "5px", fontSize: "0.9em", color: "#555" }}>
                {steps[index]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgentSteps;
