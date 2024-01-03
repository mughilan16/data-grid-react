import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetItems } from "../service/queries";
import { Item } from "../types/Item";
import { useEffect } from "react";

export function Table(props: {
  items: Array<Item>;
  setItems: React.Dispatch<React.SetStateAction<Array<Item>>>;
}) {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "value", headerName: "Value", width: 150 },
  ];
  const { data, isLoading } = useGetItems();
  useEffect(() => {
    if (data?.items) props.setItems(data?.items);
  }, [data]);

  if (isLoading || !data) {
    return <>Loading</>;
  }
  if (data.items === null || data.items.length === 0) {
    return <>Table Empty</>;
  }
  return (
    <DataGrid
      columns={columns}
      rows={props.items}
      checkboxSelection
      disableRowSelectionOnClick
    ></DataGrid>
  );
}
