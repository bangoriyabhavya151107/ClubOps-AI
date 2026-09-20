import ManagementPage from "@/components/clubops/ManagementPage";

export default function DocumentsPage() {
  return (
    <ManagementPage
      eyebrow="WORKSPACE"
      title="Documents"
      description="Keep track of club documents. The list starts empty."
      singular="Document"
      fields={[
        {
          name: "name",
          label: "Document name",
          placeholder: "Enter document name",
          required: true,
        },
        {
          name: "type",
          label: "Type",
          placeholder: "Policy / Minutes / Report",
        },
        {
          name: "owner",
          label: "Owner",
          placeholder: "Enter owner",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          placeholder: "Describe the document",
          fullWidth: true,
        },
      ]}
      columns={[
        { key: "name", label: "Document" },
        { key: "type", label: "Type" },
        { key: "owner", label: "Owner" },
      ]}
    />
  );
}
