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

export interface IAppTableBody {
  [key: string]: string | number | boolean;
}

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRowClick?: any;
}
