import Box from "@mui/material/Box";
import { AddForm } from "./components/AddForm";
import { UpdateForm } from "./components/UpdateForm";
import { Table } from "./components/Table";
import { Alert, Button, Snackbar } from "@mui/material";
import { DeleteModal } from "./components/DeleteModal";
import { AddCircle, DeleteRounded, DetailsRounded, UpdateRounded } from "@mui/icons-material";
import Details from "./components/Details";
import useModalStore from "./state/modalStore";
import useSelectedStore from "./state/selectedStore";
import useMessageStore from "./state/messageStore";

export default function App() {
  const openModal = useModalStore(state => state.open)
  const selected = useSelectedStore(state => state.value)
  const message = useMessageStore(state => state.value)
  const hideMesssage = useMessageStore(state => state.hide)
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
          <Button onClick={() => openModal("add")} variant="contained"
            startIcon={<AddCircle />}
          >
            Add Student
          </Button>
          <Button
            startIcon={<DeleteRounded />}
            disabled={selected.length === 0}
            onClick={() => openModal("delete")}
            variant="contained"
            color="error"
          >
            Delete Student
          </Button>
          <Button
            startIcon={<UpdateRounded />}
            disabled={selected.length !== 1}
            onClick={() => openModal("update")}
            variant="contained"
            color="success"
          >
            Update Student
          </Button>
          <Button
            startIcon={<DetailsRounded />}
            disabled={selected.length !== 1}
            onClick={() => openModal("detail")}
            variant="contained"
            color="info"
          >
            Details
          </Button>
          <AddForm />
          <UpdateForm />
          <DeleteModal />
          <Details />
        </Box>
      </Box>
      <Snackbar
        open={message.show}
        autoHideDuration={5000}
        onClose={() => hideMesssage()}
      >
        <Alert
          onClose={() => hideMesssage()}
          severity="error"
          sx={{ width: "100%" }}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </Box>
  );
}
