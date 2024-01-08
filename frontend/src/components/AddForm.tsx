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
import { Student, addStudent, addStudentRequest } from "../service/api";
import React from "react";

export function AddForm(props: {
  setStudents: React.Dispatch<React.SetStateAction<Array<Student>>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMessageOpen: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      message: string;
      mode: "success" | "info" | "error";
    }>
  >;
  students: Array<Student>;
}) {
  const { control, handleSubmit, reset } = useForm<addStudentRequest>();
  const onSubmitAdd = (data: addStudentRequest) => {
    data.age = parseInt(`${data.age}`);
    data.rrn = parseInt(`${data.rrn}`);
    const isValid = isAddDataValid(data);
    if (!isValid) {
      return;
    }
    addStudent(data).then((res) => {
      props.setStudents((prev) => {
        return [...prev, res];
      });
    });
    reset();
    props.setIsOpen(false);
    props.setMessageOpen({
      open: true,
      message: "Successfully added new student details",
      mode: "success",
    });
  };
  const onClose = () => {
    props.setIsOpen(false);
    reset();
  };
  function isAddDataValid(data: addStudentRequest): boolean {
    if (data.rrn === undefined || data.rrn === 0) {
      props.setMessageOpen({
        open: true,
        message: "Missing Field RRN",
        mode: "error",
      });
      return false;
    }
    if (data.name === undefined || data.name === "") {
      props.setMessageOpen({
        open: true,
        message: "Missing Field Name",
        mode: "error",
      });
      return false;
    }
    if (data.age === undefined || data.age === 0) {
      props.setMessageOpen({
        open: true,
        message: "Missing Field Age",
        mode: "error",
      });
      return false;
    }
    if (
      data.grade === undefined ||
      !["S", "A", "B", "C", "D", "E", "F"].includes(data.grade)
    ) {
      props.setMessageOpen({
        open: true,
        message:
          "Invalid Data: Grade should be one of these S, A, B, C, D, E, F",
        mode: "error",
      });
      return false;
    }

    if (props.students.map((student) => student.rrn).includes(data.rrn)) {
      props.setMessageOpen({
        open: true,
        message: "Student RRN already exists",
        mode: "error",
      });
      return false;
    }
    return true;
  }
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
          Add New Student
        </FormLabel>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <Controller
            name="rrn"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              const { onChange, value } = field;
              const { errors } = formState;
              return (
                <>
                  <TextField
                    type="number"
                    variant="outlined"
                    onChange={onChange}
                    value={value ? value : ""}
                    label="RRN"
                    error={!!errors.rrn}
                    helperText={errors.rrn && `${errors.rrn.message}`}
                  ></TextField>
                </>
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
                  error={!!errors.name}
                  helperText={errors.name && `${errors.name.message}`}
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
                  type="number"
                  variant="outlined"
                  onChange={onChange}
                  value={value ? value : ""}
                  label="Age"
                  error={!!errors.age}
                  helperText={errors.age && `${errors.age.message}`}
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
                  value={value ? value : ""}
                  onChange={(_, newValue) => {
                    onChange(newValue);
                  }}
                  options={["S", "A", "B", "C", "D", "E", "F"]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Grade"
                      error={!!errors.grade}
                      helperText={errors.grade && `${errors.grade.message}`}
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
                  helperText={errors.place && `${errors.place.message}`}
                ></TextField>
              );
            }}
          ></Controller>
          <Button
            onClick={handleSubmit(onSubmitAdd)}
            sx={{ padding: "0.7rem" }}
            variant="contained"
          >
            ADD
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
