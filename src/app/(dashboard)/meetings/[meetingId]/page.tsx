import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { auth } from "@/lib/auth"
import { MeetingIdView } from "@/modules/meetings/ui/views/meeting-id-view"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

interface Props {
  params: Promise<{
    meetingId: string
  }>
}

const MeetingIdPage = async ({ params }: Props) => {
  const { meetingId } = await params

  const queryClient = getQueryClient()
  // prefetching with trpc
  // TODO: preftech meetings Transcript
  void queryClient.prefetchQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }))

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/sign-in")
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingIdViewLoading />}>
        <ErrorBoundary fallback={<MeetingIdViewError />}>
          <MeetingIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="This may take few seconds..."
    />
  )
}

const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Something went wrong"
      description="Try again later"
    />
  )
}

export default MeetingIdPage
