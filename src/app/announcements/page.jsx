import ManagementPage from "@/components/clubops/ManagementPage";

export default function AnnouncementsPage() {
  return (
    <ManagementPage
      eyebrow="COMMUNICATION"
      title="Announcements"
      description="Create club announcements. The list starts empty."
      singular="Announcement"
      fields={[
        {
          name: "title",
          label: "Title",
          placeholder: "Enter announcement title",
          required: true,
        },
        {
          name: "audience",
          label: "Audience",
          placeholder: "All members / Volunteers",
        },
        {
          name: "date",
          label: "Date",
          type: "date",
        },
        {
          name: "message",
          label: "Message",
          type: "textarea",
          placeholder: "Write your announcement",
          fullWidth: true,
        },
      ]}
      columns={[
        { key: "title", label: "Title" },
        { key: "audience", label: "Audience" },
        { key: "date", label: "Date" },
      ]}
    />
  );
}
