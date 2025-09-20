import { CalendarIcon } from "lucide-react";
import dayjs from "dayjs";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import AppText from "../AppText/AppText";
import { Calendar } from "../ui/calendar";
import type { DateRange as ReactDayPickerDateRange } from "react-day-picker";

interface AppDateRangePickerProps {
  value?: ReactDayPickerDateRange;
  onChange: (selected: ReactDayPickerDateRange | undefined) => void;
  label?: string;
  filterLabel?: string;
}

const AppDateRangePicker = ({
  value,
  onChange,
  label,
  filterLabel,
}: AppDateRangePickerProps) => {
  const handleSelect = (newDate: ReactDayPickerDateRange | undefined) => {
    onChange?.(newDate);
  };

  return (
    <Popover>
      {label && <Label className="mb-[-8px]">{label}</Label>}
      <PopoverTrigger asChild>
        <Button
          className={cn(
            `pl-3 py-0 max-h-[36px] text-left font-normal h-[43px] rounded-[8px] hover:bg-white ${
              !value
                ? "bg-white border text-[#b4b4b4]"
                : "bg-white border text-[#4d4b4b]"
            }`
          )}
        >
          <AppText>
            {!value
              ? filterLabel ?? "Select date"
              : `${filterLabel ? `${filterLabel}: ` : ""}${dayjs(
                  value.from ?? dayjs().startOf("month")
                ).format("MMM DD")} - ${dayjs(value.to ?? dayjs()).format(
                  "MMM DD"
                )}`}
          </AppText>
          <CalendarIcon className="ml-auto h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 !z-[2000]" align="end">
        <Calendar
          mode="range"
          selected={value && value.from ? value : undefined}
          onSelect={handleSelect}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
};

export default AppDateRangePicker;
