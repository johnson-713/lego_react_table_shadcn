/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { InputGroup } from "../AppTable/types";
import AppForm from "../AppForm/AppForm";

interface NewRowFormProps {
  inputArr?: InputGroup[];
  formUtils?: UseFormReturn<any>;
  className?: string;
  formClassName?: string;
  formWrapperClassName?: string;
  skeletonWrapperClassName?: string;
  isLoading?: boolean;
  fieldsCount?: number;
}

const AppListFilter: React.FC<NewRowFormProps> = ({
  inputArr,
  formUtils,
  className,
  formClassName,
  formWrapperClassName,
}) => {
  const handleClearFilters = () => {
    inputArr?.forEach((group) => {
      group.render.forEach((filter) => {
        formUtils?.setValue(filter.name, "");
      });
    });
  };

  return (
    <div className={`${className} flex md:flex-row flex-col w-full gap-[20px]`}>
      <AppForm
        inputArr={inputArr}
        formUtils={formUtils && formUtils}
        className={className}
        formClassName={`flex flex-col w-full md:flex-row space-x-4 md:items-center ${
          formClassName ?? ""
        }`}
        formWrapperClassName={formWrapperClassName}
        onSubmit={() => {
          console.log("data");
        }}
      ></AppForm>
      {inputArr ? (
        <button
          type="button"
          className="text-[14px] whitespace-nowrap cursor-pointer text-primary underline px-[10px] py-[11px]"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      ) : null}
    </div>
  );
};

export default AppListFilter;
