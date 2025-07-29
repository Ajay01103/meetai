import {
  Command,
  CommandResponsiveDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  options: Array<{
    id: string
    value: string
    children: React.ReactNode
  }>
  onSelect: (value: string) => void
  onSearch?: (value: string) => void
  value: string
  placeholder?: string
  isSearchable?: boolean
  className?: string
}

export const CommandSelect = ({
  onSelect,
  options,
  value,
  className,
  isSearchable,
  onSearch,
  placeholder,
}: Props) => {
  const [open, setOpen] = useState(false)
  const selectedOption = options.find((option) => option.value === value)

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        variant="outline"
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOption && "text-muted-foreground",
          className
        )}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronDown />
      </Button>

      <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput
          placeholder="Search..."
          onValueChange={onSearch}
        />
        <CommandList>
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">No options</span>
          </CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value)
                setOpen(false)
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  )
}
