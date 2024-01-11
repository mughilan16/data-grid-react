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
import { addStudent, addStudentRequest, uploadFile } from "../service/api";
import { VisuallyHiddenInput } from "./FileInput";
import { CloudUpload } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { add, updateFile } from "../state/students/studentsSlice";
import { RootState } from "../state/store";
import { close } from "../state/modal/modalSlice";
import { show } from "../state/message/messageSlice";

export function AddForm() {
  const { control, handleSubmit, reset, setValue } = useForm<addStudentRequest>();
  const modal = useSelector((state: RootState) => state.modal.value)
  const students = useSelector((state: RootState) => state.students.value)
  const dispatch = useDispatch()
  const onSubmitAdd = (data: addStudentRequest) => {
    data.age = parseInt(`${data.age}`);
    data.rrn = parseInt(`${data.rrn}`);
    const isValid = isAddDataValid(data);
    if (!isValid) {
      return;
    }
    addStudent(data).then((res) => {
      var formData = new FormData();
      formData.append("id", `${res.id}`)
      formData.append("file", data.file[0]);
      dispatch(add(res))
      uploadFile(formData).then(res => dispatch(updateFile(res)));
    });
    reset();
    dispatch(close())
    dispatch(show({
      text: "Successfully added new student details",
      mode: "success",
    }))
  };
  const onClose = () => {
    reset();
    dispatch(close())
  };
  function isAddDataValid(data: addStudentRequest): boolean {
    if (data.rrn === undefined || data.rrn === 0) {
      dispatch(show({
        text: "Missing Field RRN",
        mode: "success",
      }))
      return false;
    }
    if (data.name === undefined || data.name === "") {
      dispatch(show({
        text: "Missing Field Name",
        mode: "success",
      }))
      return false;
    }
    if (data.file === undefined || data.file.length === 0) {
      dispatch(show({
        text: "Missing Field File",
        mode: "success",
      }))
      return false;
    } else {
      try {
        const fileExtension = data.file[0].name.split(".")[1]
        if (!["jpeg", "jpg", "png"].includes(fileExtension)) {
          dispatch(show({
            text: "Invalid File Format",
            mode: "success",
          }))
          return false
        }
      } catch (e) {
        dispatch(show({
          text: "Invalid File Format",
          mode: "success",
        }))
        return false
      }
    }
    if (data.age === undefined || data.age === 0) {
      dispatch(show({
        text: "Missing Field Age",
        mode: "success",
      }))
      return false;
    }
    if (
      data.grade === undefined ||
      !["S", "A", "B", "C", "D", "E", "F"].includes(data.grade)
    ) {
      dispatch(show({
        text: "Invalid Grade Field Value",
        mode: "success",
      }))
      return false;
    }

    if (students.map((student) => student.rrn).includes(data.rrn)) {
      dispatch(show({
        text: "Student RRN already exists",
        mode: "success",
      }))
      return false;
    }
    return true;
  }
  return (
    <Modal
      open={modal.show && modal.type === "add"}
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
          <Button component="label" variant="contained" startIcon={<CloudUpload />} sx={{ padding: "0.7rem" }}>
            Upload file
            <VisuallyHiddenInput type="file" onChange={(event) => {
              const files = event.currentTarget.files
              if (files === null)
                return
              setValue("file", files)
            }} />
          </Button>

          <Button
            onClick={handleSubmit(onSubmitAdd)}
            sx={{ padding: "0.7rem" }}
            variant="contained"
          >
            ADD
          </Button>
          <Button
            onClick={() => dispatch(close())}
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
