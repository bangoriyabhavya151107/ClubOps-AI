import ManagementPage from "@/components/clubops/ManagementPage";

export default function MembersPage() {
  return (
    <ManagementPage
      eyebrow="CLUB MANAGEMENT"
      title="Members"
      description="Manage your club members. The list starts empty."
      singular="Member"
      fields={[
        {
          name: "name",
          label: "Full name",
          placeholder: "Enter member name",
          required: true,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "member@example.com",
          required: true,
        },
        {
          name: "role",
          label: "Role",
          placeholder: "Member / Volunteer / Coordinator",
        },
        {
          name: "status",
          label: "Status",
          placeholder: "Active / Inactive",
        },
      ]}
      columns={[
        { key: "name", label: "Member" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
