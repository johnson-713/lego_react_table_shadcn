/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableCell, TableRow, TableBody } from "@/components/ui/table";
import type { IAppTableBody, IAppTableAction, Selectable } from "./types";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

const NoData: React.FC<{ colSpan: number }> = ({ colSpan }) => (
  <TableRow>
    <TableCell colSpan={colSpan} className="py-12 text-center">
      <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
        {/* <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#f3f4f6"/><path d="M16 32h16M20 20v4m8-4v4m-12 8V18a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2z" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> */}
        <span className="text-lg font-medium">No data found</span>
      </div>
    </TableCell>
  </TableRow>
);

function getNestedValue<T>(obj: T, path: string[]): any {
  return path.reduce(
    (acc, key) =>
      acc && typeof acc === "object" ? (acc as any)[key] : undefined,
    obj
  );
}

const AppTableBody = ({
  body,
  keysToAccessObjects,
  actions,
  colSpan = 1,
  customValueRender,
  selectable,
  onRowClick,
}: {
  body: IAppTableBody[];
  keysToAccessObjects: string[];
  actions?: IAppTableAction[];
  colSpan?: number;
  customValueRender?: {
    [key: string]: (row: IAppTableBody, header: string) => React.ReactNode;
  };
  selectable?: Selectable;
  onRowClick?: (row: IAppTableBody) => void;
}) => {
  const getRowValueFromHeader = (row: any, header: string) => {
    if (customValueRender?.[header]) {
      return customValueRender[header](row, header);
    }

    const splittedHeader = header.split("__");
    const value = getNestedValue(row, splittedHeader);
    if (value === undefined || value === null || value === "") {
      return <span className="flex items-center justify-start"> - </span>;
    }
    return value;
  };

  if (!body || body.length === 0) {
    return (
      <TableBody>
        <NoData colSpan={colSpan} />
      </TableBody>
    );
  }

  const handleSelected = (
    e: boolean | "indeterminate",
    data: IAppTableBody,
    selectable?: Selectable
  ): void => {
    if (e) {
      selectable?.setSelect([...(selectable?.select ?? []), data]);
    } else {
      const newSelectedData =
        selectable?.select?.filter((f) => f?.id !== data?.id) ?? [];
      selectable?.setSelect(newSelectedData);
    }
  };

  return (
    <TableBody>
      {body?.map((row, ind) => (
        <TableRow
          key={`${row?.id || row?.uuid || ind}`}
          className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
          onClick={() => onRowClick?.(row)}
        >
          {selectable && (
            <TableCell
              className="px-[10px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox
                onCheckedChange={(e) => handleSelected(e, row, selectable)}
                checked={selectable?.select?.some((sel) => sel?.id == row?.id)}
              />
            </TableCell>
          )}
          {keysToAccessObjects?.map((key, ind) => (
            <TableCell className="p-[17px]" key={key + `${ind}`}>
              {getRowValueFromHeader(row, key)}
            </TableCell>
          ))}
          {!!actions && (
            <TableCell
              className="px-[10px]"
              onClick={(e) => e.stopPropagation()}
            >
              {actions?.map((action) => action.render(row))}
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default AppTableBody;
