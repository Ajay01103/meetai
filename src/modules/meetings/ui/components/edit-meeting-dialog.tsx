import { ResponsiveDialog } from "@/components/responsive-dialog"
import { MeetingGetOne } from "../../types"
import { MeetingsForm } from "./meetings-form"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialValues: MeetingGetOne
}

export const EditMeetingDialog = ({ onOpenChange, open, initialValues }: Props) => {
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Edit an existing meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingsForm
        initialValues={initialValues}
        onSuccess={(id) => {
          onOpenChange(false)
        }}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  )
}
