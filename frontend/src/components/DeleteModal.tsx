import { Box, Button, Modal } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { Student, deleteStudents } from "../service/api";

export function DeleteModal(props: {
  students: Array<Student>;
  setStudents: React.Dispatch<React.SetStateAction<Array<Student>>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMessageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStudents: GridRowSelectionModel;
}) {
  const onClose = () => {
    props.setIsOpen(false);
  };
  const deleteSelected = () => {
    const ids = props.selectedStudents.join(",");
    deleteStudents(ids);
    props.setStudents((prev) =>
      prev.filter((student) => !props.selectedStudents.includes(student.id))
    );
    props.setIsOpen(false);
    props.setMessageOpen(true);
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
            {props.students
              .filter((student) => props.selectedStudents.includes(student.id))
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
              props.setIsOpen(false);
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
