import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetItems } from "../service/queries";
import { useEffect } from "react";
import useStudentStore from "../state/studentsStore";
import useSelectedStore from "../state/selectedStore";

export function Table() {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "rrn", headerName: "RRN", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "age", headerName: "Age", width: 100 },
    { field: "grade", headerName: "Grade", width: 80 },
    { field: "place", headerName: "Value", width: 150 },
  ];
  const students = useStudentStore((state) => state.value)
  const setStudent = useStudentStore(state => state.setStudents)
  const setSelected = useSelectedStore(state => state.setSelected)

  const { data, isLoading } = useGetItems();
  useEffect(() => {
    if (data?.items) setStudent(data.items)
  }, [data]);

  return (
    <>
      <DataGrid
        columns={columns}
        rows={students}
        loading={isLoading}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(ids) => {
          setSelected(ids)
        }}
      ></DataGrid>
    </>
  );
}
