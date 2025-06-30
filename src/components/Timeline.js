import React, { useState } from "react";

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      label: "Mollymawk Software",
      logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFWtQFiXwugIg/company-logo_200_200/company-logo_200_200/0/1651645378073/soaringtasks_logo?e=1747872000&v=beta&t=bvGzgXUrIqqliHoPLEjgqzjFcQ5Muc8ejOTg0xrLLio",
      title: "Fullstack Developer",
      period: "Jan 2022 — Apr 2022",
      description:
        "My first co-op experience as a Fullstack developer at a startup called Mollymawk Software. Worked on web applications using modern technologies and gained valuable experience in startup environments.",
    },
    {
      id: 2,
      label: "BlackBerry",
      logo: "https://media.licdn.com/dms/image/v2/C560BAQEHnvbvfKCsDg/company-logo_200_200/company-logo_200_200/0/1630575741184/blackberry_logo?e=1747872000&v=beta&t=qoPuE_LyC8sI8cDgE-i_Y_iKQI-ftXlSm0_menvH06Q",
      title: "SDET & Fullstack Developer",
      period: "Sep 2022 - Apr 2023, Sep 2023 - Dec 2023",
      description:
        "Worked at BlackBerry in two different roles: first 8 months as a Software Development Engineer in Test (SDET), then returned as a Fullstack Developer. Gained experience in both testing methodologies and full-stack development.",
    },
    {
      id: 3,
      label: "Clearpath Robotics",
      logo: "https://media.licdn.com/dms/image/v2/C4E0BAQEn4XnXJnWkwA/company-logo_200_200/company-logo_200_200/0/1631307909174?e=1747872000&v=beta&t=E9Qq7rsIhRF65S6cxkLP01zrY_DDu1sxvVi7W8b3i_8",
      title: "Software Test Engineer",
      period: "May 2024 - Aug 2024",
      description:
        "Worked at Clearpath Robotics for their Otto Motors division as a Software Test Engineer. Focused on testing autonomous mobile robots and warehouse automation systems.",
    },
    {
      id: 4,
      label: "Stealth Startup",
      logo: "https://media.licdn.com/dms/image/v2/C4E0BAQEHs1C2gRRukA/company-logo_200_200/company-logo_200_200/0/1630652289773/stealth_startup_tlv_logo?e=2147483647&v=beta&t=goldEnKkZ03QaU2vOzyBTkydCgtBFnzW6NYBI2fp11I",
      title: "Software Developer",
      period: "Jan 2025 - Apr 2025",
      description:
        "Currently building something innovative from the ground up in the medtech space. Working on cutting-edge technology that has the potential to be a game changer in medical technology.",
    },
  ];

  const timelineStyles = {
    container: {
      padding: "20px",
      textAlign: "center",
      width: "100%",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    title: {
      marginBottom: "40px",
      fontSize: "2.5rem",
      fontWeight: "700",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    timelineWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: "30px",
      marginBottom: "40px",
    },
    timelineDesktop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px 0",
    },
    timelineLine: {
      position: "absolute",
      top: "50%",
      left: 0,
      right: 0,
      height: "4px",
      background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
      transform: "translateY(-50%)",
      zIndex: 0,
      borderRadius: "2px",
    },
    timelineItem: {
      cursor: "pointer",
      zIndex: 1,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      padding: "15px",
      borderRadius: "50%",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
      transition: "all 0.3s ease",
      backdropFilter: "blur(10px)",
      border: "2px solid rgba(255, 255, 255, 0.2)",
    },
    timelineItemHover: {
      transform: "scale(1.1)",
      boxShadow: "0 12px 35px rgba(0, 0, 0, 0.4)",
    },
    logo: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    mobileItem: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      padding: "20px",
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "15px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textAlign: "left",
    },
    mobileItemHover: {
      background: "rgba(255, 255, 255, 0.2)",
      transform: "translateY(-2px)",
    },
    mobileItemContent: {
      flex: 1,
    },
    mobileItemTitle: {
      fontSize: "1.2rem",
      fontWeight: "600",
      marginBottom: "5px",
      color: "white",
    },
    mobileItemPeriod: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.8)",
      marginBottom: "8px",
    },
    mobileItemCompany: {
      fontSize: "1rem",
      color: "rgba(255, 255, 255, 0.9)",
    },
    selectedEventCard: {
      marginTop: "30px",
      padding: "30px",
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "20px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
    },
    selectedEventTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      marginBottom: "10px",
      color: "white",
    },
    selectedEventPeriod: {
      fontSize: "1rem",
      color: "rgba(255, 255, 255, 0.8)",
      marginBottom: "15px",
    },
    selectedEventDescription: {
      fontSize: "1.1rem",
      lineHeight: "1.6",
      color: "rgba(255, 255, 255, 0.9)",
      whiteSpace: "pre-line",
    },
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div style={timelineStyles.container}>
      <h1 style={timelineStyles.title}>My Career Journey</h1>

      {isMobile ? (
        // Mobile Timeline - Vertical List
        <div style={timelineStyles.timelineWrapper}>
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
              style={{
                ...timelineStyles.mobileItem,
                ...(selectedEvent?.id === event.id ? timelineStyles.mobileItemHover : {}),
              }}
            >
              <img
                src={event.logo}
                alt={event.label}
                style={timelineStyles.logo}
              />
              <div style={timelineStyles.mobileItemContent}>
                <div style={timelineStyles.mobileItemTitle}>{event.title}</div>
                <div style={timelineStyles.mobileItemPeriod}>{event.period}</div>
                <div style={timelineStyles.mobileItemCompany}>{event.label}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Desktop Timeline - Horizontal
        <div style={timelineStyles.timelineDesktop}>
          <div style={timelineStyles.timelineLine}></div>
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
              style={{
                ...timelineStyles.timelineItem,
                ...(selectedEvent?.id === event.id ? timelineStyles.timelineItemHover : {}),
              }}
            >
              <img
                src={event.logo}
                alt={event.label}
                style={timelineStyles.logo}
              />
            </div>
          ))}
        </div>
      )}

      {/* Selected event details */}
      {selectedEvent && (
        <div style={timelineStyles.selectedEventCard}>
          <div style={timelineStyles.selectedEventTitle}>
            {selectedEvent.title} at {selectedEvent.label}
          </div>
          <div style={timelineStyles.selectedEventPeriod}>
            {selectedEvent.period}
          </div>
          <div style={timelineStyles.selectedEventDescription}>
            {selectedEvent.description}
          </div>
        </div>
      )}

      {!selectedEvent && (
        <div style={{
          padding: "20px",
          color: "rgba(255, 255, 255, 0.7)",
          fontSize: "1.1rem",
        }}>
          {isMobile ? "Tap" : "Click"} on any position to learn more about my experience!
        </div>
      )}
    </div>
  );
}