import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Student, updateStudent } from "../service/api";
import { useEffect } from "react";

export function UpdateForm(props: {
  setStudents: React.Dispatch<React.SetStateAction<Array<Student>>>;
  getSelectedStudents: () => Student | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMessageOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { control, handleSubmit, reset, setValue } = useForm<Student>();
  const onSubmitUpdate = (data: Student) => {
    updateStudent(data).then((data) => {
      props.setStudents((prev) =>
        prev.map((item) => {
          if (data.id === item.id) {
            return data;
          }
          return item;
        })
      );
    });
    reset();
    props.setIsOpen(false);
    props.setMessageOpen(true);
  };
  const onClose = () => {
    props.setIsOpen(false);
    reset();
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
    setValue("id", selectStudent.id);
    setValue("rrn", selectStudent.rrn);
    setValue("name", selectStudent.name);
    setValue("age", selectStudent.age);
    setValue("grade", selectStudent.grade);
    setValue("place", selectStudent.place);
  }, [props.isOpen, props.getSelectedStudents]);

  return (
    <Modal
      open={props.isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <FormControl
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
        <FormLabel sx={{ fontSize: 25, padding: "10px", textAlign: "center" }}>
          Update Student
        </FormLabel>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <Controller
            name="id"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              const { onChange, value } = field;
              const { errors } = formState;
              return (
                <TextField
                  variant="outlined"
                  onChange={onChange}
                  value={value ? value : ""}
                  disabled={true}
                  label="ID"
                  error={!!errors.id}
                ></TextField>
              );
            }}
          ></Controller>

          <Controller
            name="rrn"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              const { onChange, value } = field;
              const { errors } = formState;
              return (
                <TextField
                  variant="outlined"
                  onChange={onChange}
                  value={value ? value : ""}
                  label="RRN"
                  error={!!errors.rrn}
                ></TextField>
              );
            }}
          ></Controller>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              const { onChange, value } = field;
              const { errors } = formState;
              return (
                <TextField
                  variant="outlined"
                  onChange={onChange}
                  value={value ? value : ""}
                  label="Name"
                  error={!!errors.age}
                ></TextField>
              );
            }}
          ></Controller>
          <Controller
            name="age"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              const { onChange, value } = field;
              const { errors } = formState;
              return (
                <TextField
                  variant="outlined"
                  onChange={onChange}
                  value={value ? value : ""}
                  label="Age"
                  error={!!errors.age}
                ></TextField>
              );
            }}
          ></Controller>

          <Controller
            name="grade"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              const { onChange, value } = field;
              const { errors } = formState;
              return (
                <Autocomplete
                  onChange={(_, newValue) => {
                    onChange(newValue);
                  }}
                  value={value ? value : ""}
                  options={["S", "A", "B", "C", "D", "E", "F"]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Grade"
                      error={!!errors.grade}
                    ></TextField>
                  )}
                ></Autocomplete>
              );
            }}
          ></Controller>

          <Controller
            name="place"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              const { onChange, value } = field;
              const { errors } = formState;
              return (
                <TextField
                  variant="outlined"
                  onChange={onChange}
                  value={value ? value : ""}
                  label="Place"
                  error={!!errors.place}
                ></TextField>
              );
            }}
          ></Controller>
          <Button
            onClick={handleSubmit(onSubmitUpdate)}
            variant="contained"
            sx={{ padding: "0.7rem" }}
          >
            UPDATE
          </Button>
          <Button
            onClick={() => props.setIsOpen(false)}
            color="error"
            sx={{ padding: "0.7rem" }}
            variant="outlined"
          >
            CANCEL
          </Button>
        </Box>
      </FormControl>
    </Modal>
  );
}
