import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { MeetingsView } from "@/modules/meetings/ui/views/meetings-view"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

const MeetingsPage = async () => {
  const queryClient = getQueryClient()

  // prefetching with trpc
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingsViewLoading />}>
        <ErrorBoundary fallback={<MeetingsViewError />}>
          <MeetingsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="This may take few seconds..."
    />
  )
}

const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Something went wrong"
      description="Try again later"
    />
  )
}

export default MeetingsPage
