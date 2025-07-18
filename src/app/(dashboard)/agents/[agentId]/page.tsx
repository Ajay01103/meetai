import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { AgentIdView } from "@/modules/agents/ui/views/agent-id-view"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

interface Props {
  params: Promise<{ agentId: string }>
}

const AgentIdPage = async ({ params }: Props) => {
  const { agentId } = await params

  const queryClient = getQueryClient()
  // prefetching with trpc
  void queryClient.prefetchQuery(trpc.agents.getOne.queryOptions({ id: agentId }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsIdViewLoading />}>
        <ErrorBoundary fallback={<AgentsIdViewError />}>
          <AgentIdView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

const AgentsIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agent"
      description="This may take few seconds..."
    />
  )
}

const AgentsIdViewError = () => {
  return (
    <ErrorState
      title="Something went wrong"
      description="Try again later"
    />
  )
}

export default AgentIdPage
