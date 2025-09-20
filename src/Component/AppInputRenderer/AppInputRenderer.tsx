import type { ReactNode } from "react";
import type { UseFormReturn, FieldValues, Path } from "react-hook-form";
import AppText from "../AppText/AppText";
import AppSelect from "../AppSelect/AppSelect";
import type { InputGroup, InputType } from "../AppTable/types";
import AppDatePicker from "../DatePicker/AppDatePicker";
import AppDateRangePicker from "../DateRangePicker/AppDateRangePicker";

interface InputConfig {
  type: InputType;
  name: Path<FieldValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  topDescription?: string;
  options?: {
    label: string;
    value: string;
    id?: string | number;
    identity?: string;
    name?: string;
  }[];
  customComp?: ReactNode;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  min?: number;
  max?: number;
  step?: number;
  sliderLeftDescription?: string;
  sliderRightDescription?: string;
  labelToolTip?: string;
  tag?: {
    text: string;
    color: string;
  };
  formMessageClassName?: string;
  customOnChange?: (value: string) => void;
  filterLabel?: string;
  onInputChange?: (value: string) => void;
}

interface AppInputRendererProps {
  inputArr: InputGroup[];
  formUtils: UseFormReturn;
  formWrapperClassName?: string;
}

const AppInputRenderer = ({
  inputArr,
  formUtils,
  formWrapperClassName,
}: AppInputRendererProps) => {
  const renderInput = (input: InputConfig) => {
    switch (input.type) {
      case "date-range":
        return (
          <AppDateRangePicker
            key={input.name}
            label={input.label}
            value={formUtils.watch(input.name)}
            onChange={(val) => formUtils.setValue(input.name, val)}
            filterLabel={input.filterLabel}
          />
        );

      case "select":
        return (
          <AppSelect
            key={input.name}
            name={input.name}
            label={input.label}
            description={input.description}
            topDescription={input.topDescription}
            placeholder={input.placeholder}
            options={input.options ?? []}
            formUtils={formUtils}
            className={input.className}
            labelClassName={input.labelClassName}
            customOnChange={input.customOnChange}
            onInputChange={input.onInputChange}
            filterLabel={input.filterLabel}
          />
        );

      case "date":
        return (
          <AppDatePicker
            key={input.name}
            name={input.name}
            label={input.label}
            description={input.description}
            placeholder={input.placeholder}
            formUtils={formUtils}
            className={input.className}
            labelClassName={input.labelClassName}
          />
        );

      case "custom-comp":
        return input.customComp;

      default:
        return (
          <AppSelect
            key={input.name}
            name={input.name}
            label={input.label}
            description={input.description}
            topDescription={input.topDescription}
            placeholder={input.placeholder}
            options={input.options ?? []}
            formUtils={formUtils}
            className={input.className}
            labelClassName={input.labelClassName}
            customOnChange={input.customOnChange}
            onInputChange={input.onInputChange}
            filterLabel={input.filterLabel}
          />
        );
    }
  };

  return (
    <div className={`grid grid-cols-1 gap-4 ${formWrapperClassName}`}>
      {inputArr.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className={`grid grid-cols-1 gap-4 ${group.wrapperClassName}`}
        >
          {group?.subTitle && (
            <AppText
              text={group.subTitle}
              className="text-[16px] font-medium"
            />
          )}
          {group.render.map((input: InputConfig) => (
            <> {renderInput(input)}</>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AppInputRenderer;
