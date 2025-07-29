import { ResponsiveDialog } from "@/components/responsive-dialog"
import { MeetingsForm } from "./meetings-form"
import { useRouter } from "next/navigation"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const NewMeetingDialog = ({ onOpenChange, open }: Props) => {
  const router = useRouter()

  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a new meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingsForm
        onSuccess={(id) => {
          onOpenChange(false)
          router.push(`/meetings/${id}`)
        }}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  )
}
