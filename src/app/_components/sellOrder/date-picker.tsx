"use client"
 
import React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { ptBR } from 'date-fns/locale';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
interface DatePickerProps{
  date: Date | undefined,
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  description: string
}
export function DatePicker({date, description,setDate}: DatePickerProps) {
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", {locale: ptBR}) : <span>{description}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <Select
          onValueChange={(value) => {
            const date = addDays(new Date(), parseInt(value))
            date.setHours(0,0,0,0)
            setDate(date)
          }
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Hoje</SelectItem>
            <SelectItem value="1">Amanha</SelectItem>

          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} locale={ptBR} />
        </div>
      </PopoverContent>
    </Popover>
  )
}