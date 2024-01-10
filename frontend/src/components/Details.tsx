import { Box, Modal } from "@mui/material";
import { Student } from "../service/api";

export default function Details(props: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  student: Student
}) {
  const URL = "http://localhost:3001"
  const onClose = () => {
    props.setIsOpen(false);
  };
  return (
    <Modal
      open={props.isOpen}
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
          props.student !== undefined &&
          <Box sx={{ fontSize: "1.2rem" }}>
            <img src={`${URL}/${props.student.fileName}`} width="100%"></img>
            <Box sx={{p: "1rem"}}>
              <Box>ID: {props.student?.id}</Box>
              <Box>RRN: {props.student?.rrn}</Box>
              <Box>NAME: {props.student?.name}</Box>
              <Box>AGE: {props.student?.age}</Box>
              <Box>GRADE: {props.student?.grade}</Box>
              <Box>PLACE: {props.student?.place}</Box>
            </Box>
          </Box>
        }
      </Box>
    </Modal>
  )
}
