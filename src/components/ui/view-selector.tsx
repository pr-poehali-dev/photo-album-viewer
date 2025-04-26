import * as React from "react"
import { LayoutGrid, Rows, Columns } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export type ViewMode = "grid" | "compact" | "large"

interface ViewSelectorProps {
  viewMode: ViewMode
  onChange: (value: ViewMode) => void
}

export function ViewSelector({ viewMode, onChange }: ViewSelectorProps) {
  return (
    <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && onChange(value as ViewMode)}>
      <ToggleGroupItem value="compact" aria-label="Компактный вид">
        <Rows className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label="Стандартный вид">
        <LayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="large" aria-label="Крупный вид">
        <Columns className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
