import ManagementPage from "@/components/clubops/ManagementPage";

export default function TasksPage() {
  return (
    <ManagementPage
      eyebrow="WORKSPACE"
      title="Tasks"
      description="Create, search and remove club tasks. The list starts empty."
      singular="Task"
      fields={[
        {
          name: "title",
          label: "Task",
          placeholder: "Enter task",
          required: true,
        },
        {
          name: "assignee",
          label: "Assignee",
          placeholder: "Enter member name",
        },
        {
          name: "priority",
          label: "Priority",
          placeholder: "Low / Medium / High",
        },
        {
          name: "dueDate",
          label: "Due date",
          type: "date",
        },
        {
          name: "notes",
          label: "Notes",
          type: "textarea",
          placeholder: "Add task details",
          fullWidth: true,
        },
      ]}
      columns={[
        { key: "title", label: "Task" },
        { key: "assignee", label: "Assignee" },
        { key: "priority", label: "Priority" },
        { key: "dueDate", label: "Due date" },
      ]}
    />
  );
}
