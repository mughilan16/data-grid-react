import { Box, Modal } from "@mui/material";
import useStore from "../state/useStore";

export default function Details() {
  const URL = "http://localhost:3001"
  const modal = useStore(state => state.modal)
  const students = useStore(state => state.students)
  const selected = useStore(state => state.selected)
  const student = students.filter(s => s.id === selected[0])[0]

  const closeModal = useStore(state => state.closeModal)

  const onClose = () => {
    closeModal()
  };
  return (
    <Modal
      open={modal.show && modal.type === "detail"}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
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
        {
          student !== undefined &&
          <Box sx={{ fontSize: "1.2rem" }}>
            <img src={`${URL}/${student.fileName}`} width="100%"></img>
            <Box sx={{p: "1rem"}}>
              <Box>ID: {student?.id}</Box>
              <Box>RRN: {student?.rrn}</Box>
              <Box>NAME: {student?.name}</Box>
              <Box>AGE: {student?.age}</Box>
              <Box>GRADE: {student?.grade}</Box>
              <Box>PLACE: {student?.place}</Box>
            </Box>
          </Box>
        }
      </Box>
    </Modal>
  )
}
