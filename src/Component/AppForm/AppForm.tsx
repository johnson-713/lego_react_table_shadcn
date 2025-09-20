/* eslint-disable @typescript-eslint/no-explicit-any */

import type { UseFormReturn, SubmitHandler } from "react-hook-form";
import { Form } from "../ui/form";
import type { InputGroup } from "../AppTable/types";
import AppInputRenderer from "../AppInputRenderer/AppInputRenderer";

interface AppFormProps {
  inputArr?: InputGroup[];
  onSubmit?: SubmitHandler<any>;
  formUtils?: UseFormReturn<any>;
  className?: string;
  formClassName?: string;
  children?: React.ReactNode;
  topChildren?: boolean;
  formWrapperClassName?: string;
}

const AppForm = ({
  inputArr,
  onSubmit,
  formUtils,
  className,
  formClassName,
  children,
  topChildren = false,
  formWrapperClassName,
}: AppFormProps) => {
  return (
    <div className={className}>
      {formUtils ? (
        <Form {...formUtils}>
          <form
            onSubmit={onSubmit ? formUtils.handleSubmit(onSubmit) : undefined}
            className={formClassName}
          >
            {topChildren && children}
            {inputArr && (
              <AppInputRenderer
                inputArr={inputArr}
                formUtils={formUtils}
                formWrapperClassName={formWrapperClassName}
              />
            )}
            {!topChildren && children}
          </form>
        </Form>
      ) : (
        // fallback if no formUtils: simple form without react-hook-form
        <form
          onSubmit={
            onSubmit
              ? (e) => {
                  e.preventDefault();
                  onSubmit({} as any);
                }
              : undefined
          }
          className={formClassName}
        >
          {topChildren && children}
          {inputArr && formUtils && (
            <AppInputRenderer
              inputArr={inputArr}
              formUtils={formUtils}
              formWrapperClassName={formWrapperClassName}
            />
          )}
          {!topChildren && children}
        </form>
      )}
    </div>
  );
};

export default AppForm;
