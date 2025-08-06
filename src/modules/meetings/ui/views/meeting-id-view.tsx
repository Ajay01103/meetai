"use client"

import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { MeetingIdViewHeader } from "../components/meeting-id-view-header"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useConfirm } from "@/hooks/use-confirm"
import { EditMeetingDialog } from "../components/edit-meeting-dialog"
import { useState } from "react"
import { UpcomingState } from "../components/upcoming-state"
import { ActiveState } from "../components/active-state"
import { CancelledState } from "../components/cancelled-state"
import { ProcessingState } from "../components/processing-state"

interface Props {
  meetingId: string
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false)

  const router = useRouter()
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const { data } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }))

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure ?",
    "The following action is irreversible"
  )

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        // TODO: invalidate free tier usage
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
        router.push("/meetings")
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  )

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove()

    if (!ok) return

    await removeMeeting.mutateAsync({ id: meetingId })
  }

  const isActive = data.status === "active"
  const isUpcoming = data.status === "upcoming"
  const isCancelled = data.status === "cancelled"
  const isCompleted = data.status === "completed"
  const isProcessing = data.status === "processing"

  return (
    <>
      <RemoveConfirmation />
      <EditMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        {isCancelled && <CancelledState />}

        {isProcessing && <ProcessingState />}

        {isCompleted && <div>Completed</div>}

        {isActive && <ActiveState meetingId={meetingId} />}

        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancelling={false}
          />
        )}
      </div>
    </>
  )
}
