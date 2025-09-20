import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/Component/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/Component/ui/select";
import type { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { Input } from "@/Component/ui/input"; // 👈 make sure you have shadcn/ui input

interface AppSelectProps<T extends FieldValues> {
  label?: string;
  description?: string;
  topDescription?: string;
  name: Path<T>;
  formUtils: UseFormReturn<T>;
  options: {
    label?: string;
    value?: string;
    id?: string | number;
    identity?: string;
    name?: string;
    icon?: React.ReactNode;
    image?: string;
  }[];
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  customOnChange?: (value: string) => void;
  onInputChange?: (value: string) => void; // 👈 new prop
  readOnly?: boolean;
  disabled?: boolean;
  filterLabel?: string;
}

const AppSelect = <T extends FieldValues>({
  label,
  description,
  topDescription,
  formUtils,
  name,
  options,
  placeholder = "Select an option",
  className,
  labelClassName,
  customOnChange,
  onInputChange, // 👈 new prop
  disabled = false,
  readOnly = false,
  filterLabel,
}: AppSelectProps<T>) => {
  const value = formUtils.watch(name);

  return (
    <FormField
      control={formUtils.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={className}>
            {label && (
              <FormLabel className={`mb-[8px] ${labelClassName}`}>
                {label}
              </FormLabel>
            )}
            {topDescription && (
              <FormDescription className="mt-[-6px] mb-2">
                {topDescription}
              </FormDescription>
            )}

            <Select
              disabled={disabled}
              value={value}
              onValueChange={(value) => {
                if (customOnChange) {
                  customOnChange(value);
                } else {
                  field.onChange(value);
                }
              }}
              defaultValue={value}
            >
              <FormControl>
                <SelectTrigger
                  style={{ pointerEvents: readOnly ? "none" : "auto" }}
                >
                  <SelectValue placeholder={placeholder}>
                    <span className="text-[#717171]">
                      {filterLabel && value ? `${filterLabel}: ` : ""}
                    </span>
                    {/* Show selected option label */}
                    {options.find(
                      (opt) => String(opt.id ?? opt.value) === value
                    )?.label ?? value}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {/* 🆕 Add filter input for onInputChange */}
                {onInputChange && (
                  <div className="px-2 py-1">
                    <Input
                      type="text"
                      placeholder="Type to filter..."
                      onChange={(e) => onInputChange(e.target.value)}
                      className="h-8"
                    />
                  </div>
                )}
                {options.map((option) => (
                  <SelectItem
                    key={String(option.id ?? option.value)}
                    value={String(option.id ?? option.value)}
                  >
                    {option?.image && (
                      <img
                        src={option?.image}
                        alt={option?.label ?? option?.name ?? ""}
                        className="w-4 h-4"
                      />
                    )}{" "}
                    {option?.icon}{" "}
                    {option.identity ?? option.label ?? option.name ?? ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default AppSelect;
