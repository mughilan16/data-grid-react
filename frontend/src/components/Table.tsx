import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useGetItems } from "../service/queries";
import { Item } from "../types/Item";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { deleteItems } from "../service/api";

export function Table(props: {
  items: Array<Item>;
  setItems: React.Dispatch<React.SetStateAction<Array<Item>>>;
}) {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "value", headerName: "Value", width: 150 },
  ];
  const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);
  const { data, isLoading } = useGetItems();
  const deleteSelected = () => {
    const ids = selectedRow.join(",");
    deleteItems(ids);
    props.setItems((prev) =>
      prev.filter((item) => !selectedRow.includes(item.id))
    );
  };
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
    <>
      <DataGrid
        columns={columns}
        rows={props.items}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(ids) => {
          setSelectedRow(ids);
        }}
      ></DataGrid>
      {selectedRow.length !== 0 && (
        <Button onClick={deleteSelected}>Delete</Button>
      )}
    </>
  );
}
