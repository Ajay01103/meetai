import { ResponsiveDialog } from "@/components/responsive-dialog"
import { AgentsForm } from "./agents-form"
import { AgentGetOne } from "../../types"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialValues: AgentGetOne
}

export const UpdateAgentDialog = ({ onOpenChange, open, initialValues }: Props) => {
  return (
    <ResponsiveDialog
      title="Update Agent"
      description="Edit existing agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentsForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  )
}
