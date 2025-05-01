import * as React from "react"
import { Grid, Rows, Columns, Layout } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export type ViewMode = "grid" | "compact" | "large" | "masonry"

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
        <Grid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="large" aria-label="Крупный вид">
        <Columns className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="masonry" aria-label="Плиточный вид">
        <Layout className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

interface GapSelectorProps {
  gapSize: "small" | "medium" | "large"
  onChange: (value: "small" | "medium" | "large") => void
}

export function GapSelector({ gapSize, onChange }: GapSelectorProps) {
  return (
    <ToggleGroup type="single" value={gapSize} onValueChange={(value) => value && onChange(value as "small" | "medium" | "large")}>
      <ToggleGroupItem value="small" aria-label="Малые отступы">
        <span className="text-xs">S</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="medium" aria-label="Средние отступы">
        <span className="text-xs">M</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="large" aria-label="Большие отступы">
        <span className="text-xs">L</span>
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

interface GridSizeSelector {
  columns: number;
  onChange: (columns: number) => void;
}

export function GridSizeSelector({ columns, onChange }: GridSizeSelector) {
  return (
    <ToggleGroup type="single" value={columns.toString()} onValueChange={(value) => value && onChange(parseInt(value))}>
      <ToggleGroupItem value="4" aria-label="4 колонки">
        4
      </ToggleGroupItem>
      <ToggleGroupItem value="5" aria-label="5 колонок">
        5
      </ToggleGroupItem>
      <ToggleGroupItem value="6" aria-label="6 колонок">
        6
      </ToggleGroupItem>
      <ToggleGroupItem value="8" aria-label="8 колонок">
        8
      </ToggleGroupItem>
      <ToggleGroupItem value="10" aria-label="10 колонок">
        10
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
