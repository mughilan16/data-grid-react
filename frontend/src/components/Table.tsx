import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetItems } from "../service/queries";

export function Table() {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "value", headerName: "Value", width: 150 },
  ];
  const { data, isLoading } = useGetItems();

  if (isLoading || !data) {
    return <>Loading</>;
  }
  if (data.items === null || data.items.length) {
    return <>Table Empty</>
  }
  return (
    <DataGrid
      columns={columns}
      rows={data.items}
      checkboxSelection
      disableRowSelectionOnClick
    ></DataGrid>
  );
}
