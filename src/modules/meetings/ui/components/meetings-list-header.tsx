"use client"

import { Button } from "@/components/ui/button"
import { Plus, XCircle } from "lucide-react"
import { useState } from "react"
import { NewMeetingDialog } from "./new-meeting-dialog"
import { MeetingsSearchFilter } from "./meetings-search-filter"
import { StatusFilter } from "./status-filters"
import { AgentIdFilter } from "./agent-id-filter"
import { useMeetingsFilters } from "../../hooks/use-meetings-filter"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { DEFAULT_PAGE } from "@/constants"

export const MeetingsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filters, setFilters] = useMeetingsFilters()

  const isAnyFilterModified = !!filters.status || !!filters.search || !!filters.agentId

  const onClearFilters = () => {
    setFilters({
      status: null,
      agentId: "",
      search: "",
      page: DEFAULT_PAGE,
    })
  }

  return (
    <>
      <NewMeetingDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus />
            New Meeting
          </Button>
        </div>

        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <MeetingsSearchFilter />
            <StatusFilter />
            <AgentIdFilter />
            {isAnyFilterModified && (
              <Button
                variant="outline"
                onClick={onClearFilters}
              >
                <XCircle className="size-4" />
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  )
}
