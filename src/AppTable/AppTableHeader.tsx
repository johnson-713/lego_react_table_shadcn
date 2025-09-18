import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableRow } from "../components/ui/table";
import { TableHeader } from "../components/ui/table";
import {
  type IAppTableAction,
  type IAppTableBody,
  type Selectable,
} from "./types";

const AppTableHeaders = ({
  headersToMap,
  actions,
  selectable,
  body,
}: {
  headersToMap: string[];
  actions?: IAppTableAction[];
  selectable?: Selectable;
  body: IAppTableBody[];
}) => {
  const handleSelectAll = (data: IAppTableBody[]) => {
    const isSelectAll = selectable?.select?.length === data?.length;

    if (isSelectAll) {
      selectable?.setSelect([]); // Clear the selection
    } else {
      // Select all rows
      selectable?.setSelect([...data]);
    }
  };

  const isAllSelected = selectable?.select?.length === body?.length;

  //rgba(255, 229, 246, 1)
  return (
    <TableHeader className={` bg-[#FFE5F6] ${""}`}>
      <TableRow className="rounded-t-[8px]">
        {selectable && (
          <TableHead className="px-[10px]" onClick={(e) => e.stopPropagation()}>
            <Checkbox
              onCheckedChange={() => handleSelectAll(body)}
              checked={isAllSelected}
            />
          </TableHead>
        )}
        {headersToMap.map((header, ind) => (
          <TableHead
            className="p-[17px] text-primary font-[600] bg-[#FFE5F6]"
            key={`${header}-${ind}`}
          >
            {header}
          </TableHead>
        ))}
        {!!actions && (
          <TableHead className="px-[10px] text-primary font-[600]">
            Actions
          </TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
};

export default AppTableHeaders;
