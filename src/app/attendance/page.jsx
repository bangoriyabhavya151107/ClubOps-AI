import ManagementPage from "@/components/clubops/ManagementPage";

export default function AttendancePage() {
  return (
    <ManagementPage
      eyebrow="CLUB MANAGEMENT"
      title="Attendance"
      description="Record attendance for members and events. The list starts empty."
      singular="Attendance Record"
      fields={[
        {
          name: "member",
          label: "Member",
          placeholder: "Enter member name",
          required: true,
        },
        {
          name: "event",
          label: "Event",
          placeholder: "Enter event name",
          required: true,
        },
        {
          name: "date",
          label: "Date",
          type: "date",
          required: true,
        },
        {
          name: "status",
          label: "Status",
          placeholder: "Present / Absent",
          required: true,
        },
      ]}
      columns={[
        { key: "member", label: "Member" },
        { key: "event", label: "Event" },
        { key: "date", label: "Date" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
