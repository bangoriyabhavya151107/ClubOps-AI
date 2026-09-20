import ManagementPage from "@/components/clubops/ManagementPage";

export default function MeetingsPage() {
  return (
    <ManagementPage
      eyebrow="WORKSPACE"
      title="Meetings"
      description="Schedule and manage club meetings. The list starts empty."
      singular="Meeting"
      fields={[
        {
          name: "title",
          label: "Meeting title",
          placeholder: "Enter meeting title",
          required: true,
        },
        {
          name: "date",
          label: "Date",
          type: "date",
          required: true,
        },
        {
          name: "time",
          label: "Time",
          type: "time",
        },
        {
          name: "location",
          label: "Location",
          placeholder: "Enter location",
        },
        {
          name: "agenda",
          label: "Agenda",
          type: "textarea",
          placeholder: "Enter meeting agenda",
          fullWidth: true,
        },
      ]}
      columns={[
        { key: "title", label: "Meeting" },
        { key: "date", label: "Date" },
        { key: "time", label: "Time" },
        { key: "location", label: "Location" },
      ]}
    />
  );
}
