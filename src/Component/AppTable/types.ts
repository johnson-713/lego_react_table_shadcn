/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface IAppTableAction {
  label: string;
  // onClick: () => void;
  render: (row: unknown) => React.ReactNode;
}

export interface Selectable {
  select: IAppTableBody[];
  setSelect: React.Dispatch<React.SetStateAction<IAppTableBody[]>>;
}

export interface SelectableItem {
  id: string | number;
  [key: string]: string | number | null;
}

export type IAppTableBody = Record<string, unknown>;

export interface IAppTableHeader {
  [key: string]: string;
}

export interface IAppTable {
  headers: IAppTableHeader;
  body: IAppTableBody[];
  selectedRows?: object[];
  actions?: IAppTableAction[];
  page: number;
  perPage: number;
  total: number;
  setPage: (page: number) => void;
  isLoading?: boolean;
  customValueRender?: {
    [key: string]: (row: IAppTableBody, header: string) => React.ReactNode;
  };
  selectable?: Selectable;
  onRowClick?: any;
  handleSearch: (value: string) => void;
  searchPlaceholder?: string;
  searchInputClassName?: string;
  tableHeaderClassName?: string;
  checkboxClassName?: string;
  enableFilter?: boolean;
  inputArr?: InputGroup[];
  formUtils?: UseFormReturn<any>;
}

export type InputType =
  | "text"
  | "select"
  | "date"
  | "custom-comp"
  | "textarea"
  | "range"
  | "checkbox"
  | "radio"
  | "number"
  | "switch"
  | "text-editor"
  | "password"
  | "date-range"
  | "multi-select";

export type InputConfig = {
  type: InputType;
  name: Path<FieldValues>;
  label?: string;
  placeholder?: string;
  options?: {
    label: string;
    value: string;
    id?: string | number;
    identity?: string;
    name?: string;
  }[];
  min?: number;
  max?: number;
  step?: number;
  sliderLeftDescription?: string;
  sliderRightDescription?: string;
  labelToolTip?: string;
  customComp?: React.ReactNode;
  description?: string;
  topDescription?: string;
  tag?: {
    text: string;
    color: string;
  };
  className?: string;
  customOnChange?: (value: string) => void;
  filterLabel?: string;
};

export type InputGroup = {
  wrapperClassName?: string;
  render: InputConfig[];
  subTitle?: string;
};
