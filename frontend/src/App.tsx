import Box from "@mui/material/Box";
import { AddForm } from "./components/AddForm";
import { UpdateForm } from "./components/UpdateForm";
import { Table } from "./components/Table";
import { Alert, Button, Snackbar } from "@mui/material";
import { DeleteModal } from "./components/DeleteModal";
import { AddCircle, DeleteRounded, DetailsRounded, UpdateRounded } from "@mui/icons-material";
import Details from "./components/Details";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/store";
import { open } from "./state/modal/modalSlice";
import { hide } from "./state/message/messageSlice";

export default function App() {
  const dispatch = useDispatch()
  const selected = useSelector((state: RootState) => state.selected.value)
  const message = useSelector((state: RootState) => state.message.value)
  return (
    <Box
      sx={{
        maxWidth: "100vw",
        maxHeight: "100vh",
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      <Box
        justifyContent={"center"}
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: "10px",
          padding: "20px",
        }}
      >
        <Table />
        <Box
          sx={{ display: "flex", flexDirection: "row-reverse", gap: "1rem" }}
        >
          <Button onClick={() => dispatch(open({ show: true, type: "add" }))} variant="contained"
            startIcon={<AddCircle />}
          >
            Add Student
          </Button>
          <Button
            startIcon={<DeleteRounded />}
            disabled={selected.length === 0}
            onClick={() => dispatch(open({ show: true, type: "delete" }))}
            variant="contained"
            color="error"
          >
            Delete Student
          </Button>
          <Button
            startIcon={<UpdateRounded />}
            disabled={selected.length !== 1}
            onClick={() => dispatch(open({ show: true, type: "update" }))}
            variant="contained"
            color="success"
          >
            Update Student
          </Button>
          <Button
            startIcon={<DetailsRounded />}
            disabled={selected.length !== 1}
            onClick={() => dispatch(open({ show: true, type: "detail" }))}
            variant="contained"
            color="info"
          >
            Details
          </Button>
          <AddForm />
          <UpdateForm />
          <DeleteModal ></DeleteModal>
          <Details
          />
        </Box>
      </Box>
      <Snackbar
        open={message.show}
        autoHideDuration={5000}
        onClose={() => dispatch(hide())}
      >
        <Alert
          onClose={() => dispatch(hide())}
          severity="error"
          sx={{ width: "100%" }}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </Box>
  );
}
