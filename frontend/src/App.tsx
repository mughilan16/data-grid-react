import Box from "@mui/material/Box";
import { AddForm } from "./components/AddForm";
import { UpdateForm } from "./components/UpdateForm";
import { Table } from "./components/Table";
import { useState } from "react";
import { Student } from "./service/api";
import { Alert, Button, Snackbar } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { DeleteModal } from "./components/DeleteModal";
import { AddCircle, DeleteRounded, UpdateRounded } from "@mui/icons-material";

export default function App() {
  const [students, setStudents] = useState(new Array<Student>());
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [deleteMessageOpen, setDeleteMessageOpen] = useState(false);
  const [addMessageOpen, setAddMessageOpen] = useState<ErrorMessage>({
    open: false,
    message: "",
    mode: "success",
  });
  type ErrorMessage = {
    open: boolean;
    mode: "success" | "info" | "error";
    message: string;
  };
  const [updateMessageOpen, setUpdateMessageOpen] = useState<ErrorMessage>({
    open: false,
    message: "",
    mode: "success",
  });
  const handleDeleteMessageClose = () => {
    setDeleteMessageOpen(false);
  };
  const handleUpdateMessageClose = () => {
    setUpdateMessageOpen({
      open: false,
      message: "",
      mode: "success",
    });
  };
  const handleAddMessageClose = () => {
    setAddMessageOpen({
      open: false,
      message: "",
      mode: "success",
    });
  };

  const [selectedStudents, setSelectedStudents] =
    useState<GridRowSelectionModel>([]);
  function getSelectedStudent() {
    let student;
    students.forEach((s) => {
      if (s.id === selectedStudents[0]) {
        student = s;
      }
    });
    return student;
  }
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
        <Table
          students={students}
          setStudents={setStudents}
          selectedRow={selectedStudents}
          setSelectedRow={setSelectedStudents}
        />
        <Box
          sx={{ display: "flex", flexDirection: "row-reverse", gap: "1rem" }}
        >
          <Button onClick={() => setAddModal(true)} variant="contained"
            startIcon={<AddCircle />}
          >
            Add Student
          </Button>
          <Button
            startIcon={<DeleteRounded />}
            disabled={selectedStudents.length === 0}
            onClick={() => setDeleteModal(true)}
            variant="contained"
            color="error"
          >
            Delete Student
          </Button>
          <Button
            startIcon={<UpdateRounded />}
            disabled={selectedStudents.length !== 1}
            onClick={() => setUpdateModal(true)}
            variant="contained"
            color="success"
          >
            Update Student
          </Button>
          <AddForm
            students={students}
            setStudents={setStudents}
            isOpen={addModal}
            setIsOpen={setAddModal}
            setMessageOpen={setAddMessageOpen}
          />
          <UpdateForm
            students={students}
            setStudents={setStudents}
            getSelectedStudents={getSelectedStudent}
            isOpen={updateModal}
            setIsOpen={setUpdateModal}
            setMessageOpen={setUpdateMessageOpen}
          />
          <DeleteModal
            isOpen={deleteModal}
            setIsOpen={setDeleteModal}
            selectedStudents={selectedStudents}
            students={students}
            setStudents={setStudents}
            setMessageOpen={setDeleteMessageOpen}
          ></DeleteModal>
        </Box>
      </Box>
      <Snackbar
        open={deleteMessageOpen}
        autoHideDuration={5000}
        onClose={handleDeleteMessageClose}
      >
        <Alert
          onClose={handleDeleteMessageClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Successfully delete the selected students details
        </Alert>
      </Snackbar>

      <Snackbar
        open={addMessageOpen.open}
        autoHideDuration={5000}
        onClose={handleAddMessageClose}
      >
        <Alert
          onClose={handleAddMessageClose}
          severity={addMessageOpen.mode}
          sx={{ width: "100%" }}
        >
          {addMessageOpen.message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={updateMessageOpen.open}
        autoHideDuration={5000}
        onClose={handleUpdateMessageClose}
      >
        <Alert
          onClose={handleUpdateMessageClose}
          severity="info"
          sx={{ width: "100%" }}
        >
          {updateMessageOpen.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
