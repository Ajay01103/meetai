import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTRPC } from "@/trpc/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod/v4"
import { meetingsInsertSchema } from "../../schemas"
import { MeetingGetOne } from "../../types"
import { useState } from "react"
import { CommandSelect } from "@/components/command-select"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog"

interface Props {
  onSuccess?: (id?: string) => void
  onCancel?: () => void
  initialValues?: MeetingGetOne
}

export const MeetingsForm = ({ initialValues, onCancel, onSuccess }: Props) => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const [agentsSearch, setAgentsSearch] = useState("")
  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false)

  const { data: agents } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentsSearch,
    })
  )

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))

        //TODO: invalidate free tier usage
        onSuccess?.(data.id)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  )

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))

        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          )
        }
        onSuccess?.()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  )

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  })

  const isEdit = !!initialValues?.id
  const isPending = createMeeting.isPending || updateMeeting.isPending

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialValues.id })
    } else {
      createMeeting.mutate(values)
    }
  }

  return (
    <>
      <NewAgentDialog
        open={openNewAgentDialog}
        onOpenChange={setOpenNewAgentDialog}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="fact checking"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="agentId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent</FormLabel>
                <FormControl>
                  <CommandSelect
                    options={(agents?.items ?? []).map((agent) => ({
                      id: agent.id,
                      value: agent.id,
                      children: (
                        <div className="flex items-center gap-x-2">
                          <GeneratedAvatar
                            seed={agent.name}
                            variant="bottsNeutral"
                            className="border size-6"
                          />
                          <span>{agent.name}</span>
                        </div>
                      ),
                    }))}
                    onSelect={field.onChange}
                    onSearch={setAgentsSearch}
                    value={field.value}
                    placeholder="Select an agent"
                  />
                </FormControl>

                <FormDescription>
                  Not found what you&apos;re lokking for{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => setOpenNewAgentDialog(true)}
                  >
                    create new agent
                  </button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between gap-x-2">
            {onCancel && (
              <Button
                variant="ghost"
                disabled={isPending}
                type="button"
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
            )}

            <Button
              disabled={isPending}
              type="submit"
            >
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
