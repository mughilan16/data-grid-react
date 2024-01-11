import { Box, Button, Modal } from "@mui/material";
import { deleteStudents } from "../service/api";
import useStore from "../state/useStore";

export function DeleteModal() {
  const modal = useStore(state => state.modal)
  const students = useStore(state => state.students)
  const selected = useStore(state => state.selected)

  const closeModal = useStore(state => state.closeModal)
  const showMessage = useStore(state => state.showMessage)

  const deleteStudentStore = useStore(state => state.deleteStudent)

  const onClose = () => {
    closeModal()
  };
  const deleteSelected = () => {
    const ids = selected.join(",");
    deleteStudents(ids).then(
      (_) => deleteStudentStore(selected)
    );
    closeModal()
    showMessage({
      text: "Successfully deleted selected students",
      mode: "success",
    })
  };

  return (
    <Modal
      open={modal.show && modal.type === "delete"}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "1px solid #666666",
          boxShadow: 24,
          borderRadius: "7px",
          p: 3,
        }}
      >

        <Box sx={{ fontSize: "1.4rem" }}>
          <Box sx={{ fontWeight: 400 }}>
            This will permanently delete the details of following students
          </Box>
          <Box
            sx={{
              fontSize: "1.2rem",
              padding: "0.7rem",
              fontFamily: "monospace",
            }}
          >
            {students
              .filter((student) => selected.includes(student.id))
              .map((student) => (
                <Box key={student.id}>{student.name}</Box>
              ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            flexDirection: "row-reverse",
          }}
        >
          <Button variant="contained" color="error" onClick={deleteSelected}>
            Delete
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              closeModal()
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
