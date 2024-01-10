import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useGetItems } from "../service/queries";
import { useEffect } from "react";
import { Student } from "../service/api";

export function Table(props: {
  students: Array<Student>;
  setStudents: React.Dispatch<React.SetStateAction<Array<Student>>>;
  selectedRow: GridRowSelectionModel;
  setSelectedRow: React.Dispatch<React.SetStateAction<GridRowSelectionModel>>;
}) {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "rrn", headerName: "RRN", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "age", headerName: "Age", width: 100 },
    { field: "grade", headerName: "Grade", width: 80 },
    { field: "place", headerName: "Value", width: 150 },
  ];
  console.log(props.students)
  const { data, isLoading } = useGetItems();
  useEffect(() => {
    if (data?.items) props.setStudents(data?.items);
  }, [data]);

  return (
    <>
      <DataGrid
        columns={columns}
        rows={props.students}
        loading={isLoading}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(ids) => {
          props.setSelectedRow(ids);
        }}
      ></DataGrid>
    </>
  );
}
