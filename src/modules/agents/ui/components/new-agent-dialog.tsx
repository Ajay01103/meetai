import { ResponsiveDialog } from "@/components/responsive-dialog"
import { AgentsForm } from "./agents-form"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const NewAgentDialog = ({ onOpenChange, open }: Props) => {
  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a new agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentsForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  )
}
