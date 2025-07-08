import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { auth } from "@/lib/auth"
import { AgentsListHeader } from "@/modules/agents/ui/components/list-header"
import { AgentsView } from "@/modules/agents/ui/views/agents-view"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

const AgentsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/sign-in")
  }

  const queryClient = getQueryClient()

  // trpc prefetching at server side
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())

  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoading />}>
          <ErrorBoundary fallback={<AgentsViewError />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  )
}

const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take few seconds..."
    />
  )
}

const AgentsViewError = () => {
  return (
    <ErrorState
      title="Something went wrong"
      description="Try again later"
    />
  )
}

export default AgentsPage
