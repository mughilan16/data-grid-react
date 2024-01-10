import { Box, Modal } from "@mui/material";
import { Student } from "../service/api";
import { useEffect, useState } from "react";

export default function Details(props: {
  getSelectedStudents: () => Student | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const URL = "http://localhost:3001"
  const [student, setStudent] = useState<Student | undefined>(undefined);
  const onClose = () => {
    props.setIsOpen(false);
  };
  useEffect(() => {
    if (props.isOpen === false) {
      return;
    }
    const selectStudent = props.getSelectedStudents();
    console.log(selectStudent);
    if (selectStudent === undefined) {
      return;
    }
    setStudent(selectStudent)
  }, [props.isOpen, props.getSelectedStudents]);
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
