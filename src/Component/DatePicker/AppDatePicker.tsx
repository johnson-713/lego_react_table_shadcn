import { CalendarIcon } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Component/ui/form";
import { Calendar } from "@/Component/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Component/ui/popover";
import type { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { Input } from "../ui/input";

interface AppDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  formUtils: UseFormReturn<T>;
  className?: string;
  labelClassName?: string;
}

function formatDate(date?: Date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function parseDate(value: string) {
  const date = new Date(value);
  return isNaN(date.getTime()) ? undefined : date;
}

const AppDatePicker = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  formUtils,
  className,
  labelClassName,
}: AppDatePickerProps<T>) => {
  return (
    <FormField
      control={formUtils.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className={`mb-[8px] ${labelClassName}`}>
              {label}
            </FormLabel>
          )}
          <FormControl>
            <div className="relative flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative w-full">
                    <Input
                      id={name}
                      placeholder={placeholder}
                      className="bg-background pr-10"
                      value={field.value ? formatDate(field.value) : ""}
                      onChange={(e) => {
                        const date = parseDate(e.target.value);
                        field.onChange(date);
                      }}
                      onBlur={field.onBlur}
                      autoComplete="off"
                    />
                    <CalendarIcon className="absolute top-1/2 right-2 text-gray-300 -translate-y-1/2 size-4 pointer-events-none" />
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="end"
                  alignOffset={-8}
                  sideOffset={10}
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AppDatePicker;
