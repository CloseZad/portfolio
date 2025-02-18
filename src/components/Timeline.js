import React, { useState } from "react";

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState("Select an event");

  const events = [
    {
      id: 1,
      label: "Mollymawk Software",
      logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFWtQFiXwugIg/company-logo_200_200/company-logo_200_200/0/1651645378073/soaringtasks_logo?e=1747872000&v=beta&t=bvGzgXUrIqqliHoPLEjgqzjFcQ5Muc8ejOTg0xrLLio",
      description:
        "My first co-op, was as a Fullstack developer at a startup called Mollymawk Software. \nJan 2022 — Apr 2022",
    },
    {
      id: 2,
      label: "BlackBerry",
      logo: "https://media.licdn.com/dms/image/v2/C560BAQEHnvbvfKCsDg/company-logo_200_200/company-logo_200_200/0/1630575741184/blackberry_logo?e=1747872000&v=beta&t=qoPuE_LyC8sI8cDgE-i_Y_iKQI-ftXlSm0_menvH06Q",
      description:
        "I then worked at BlackBerry, first 8 months as an SDET Sep 2022 - Apr 2023,\n and then back again as a Fullstack Dev. Sep 2023 - Dec 2023",
    },
    {
      id: 3,
      label: "Clearpath Robotics",
      logo: "https://media.licdn.com/dms/image/v2/C4E0BAQEn4XnXJnWkwA/company-logo_200_200/company-logo_200_200/0/1631307909174?e=1747872000&v=beta&t=E9Qq7rsIhRF65S6cxkLP01zrY_DDu1sxvVi7W8b3i_8",
      description:
        "Next, I worked at Clearpath Robotics for their Otto Motors division, as a Software Test Engineer\nMay 2024 - Aug 2024",
    },
    {
      id: 4,
      label: "Shhhh",
      logo: "https://media.licdn.com/dms/image/v2/C4E0BAQEHs1C2gRRukA/company-logo_200_200/company-logo_200_200/0/1630652289773/stealth_startup_tlv_logo?e=2147483647&v=beta&t=goldEnKkZ03QaU2vOzyBTkydCgtBFnzW6NYBI2fp11I",
      description:
        "Currently, building something from the ground up, can't say much but its a game changer in medtech\nJan 2025 - Apr 2025",
    },
  ];

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ marginBottom: "20px" }}>My career.....so far</h1>

      {/* Timeline Line */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px 0",
        }}
      >
        {/* Horizontal line */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "4px",
            backgroundColor: "#ddd",
            transform: "translateY(-50%)",
            zIndex: 0,
          }}
        ></div>

        {/* Timeline logos */}
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => setSelectedEvent(event.description)}
            style={{
              cursor: "pointer",
              zIndex: 1,
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "50%",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={event.logo}
              alt={event.label}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </div>
        ))}
      </div>

      {/* Selected event display */}
      <div style={{ marginTop: "20px" }}>
        <h2>{selectedEvent}</h2>
      </div>
    </div>
  );
}
