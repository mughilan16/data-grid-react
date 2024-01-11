import { DataGrid, GridColDef} from "@mui/x-data-grid";
import { useGetItems } from "../service/queries";
import { useEffect } from "react";
import { RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { set } from "../state/students/studentsSlice";
import { setSelected } from "../state/selected/selectedSlice";

export function Table() {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "rrn", headerName: "RRN", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "age", headerName: "Age", width: 100 },
    { field: "grade", headerName: "Grade", width: 80 },
    { field: "place", headerName: "Value", width: 150 },
  ];
  const students = useSelector((state: RootState) => state.students.value)
  const dispatch = useDispatch();
  const { data, isLoading } = useGetItems();
  useEffect(() => {
    if (data?.items) dispatch(set(data.items))
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
          dispatch(setSelected(ids))
        }}
      ></DataGrid>
    </>
  );
}
