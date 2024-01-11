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
import { updateStudent, updateStudentRequest, uploadFile } from "../service/api";
import { useEffect } from "react";
import { CloudUpload } from "@mui/icons-material";
import { VisuallyHiddenInput } from "./FileInput";
import useStudentStore from "../state/studentsStore";
import useModalStore from "../state/modalStore";
import useMessageStore from "../state/messageStore";
import useSelectedStore from "../state/selectedStore";

export function UpdateForm() {
  const { control, handleSubmit, reset, setValue } = useForm<updateStudentRequest>();
  const modal = useModalStore(state => state.value)
  const students = useStudentStore(state => state.value)
  const selected = useSelectedStore(state => state.value)

  const updateStudentStore = useStudentStore(state => state.updateStudent)
  const addFileStore = useStudentStore(state => state.addFile)
  const closeModal = useModalStore(state => state.close)
  const showMessage = useMessageStore(state => state.show)

  function isUpdateDataValid(data: updateStudentRequest): boolean {
    if (data.rrn === undefined || data.rrn === 0) {
      showMessage({
        text: "Missing Field RRN",
        mode: "success",
      })
      return false;
    }
    if (data.name === undefined || data.name === "") {
      showMessage({
        text: "Missing Field Name",
        mode: "success",
      })
      return false;
    }
    if (data.file !== undefined && data.file.length > 0) {
      try {
        const fileExtension = data.file[0].name.split(".")[1]
        if (!["jpeg", "jpg", "png"].includes(fileExtension)) {
          showMessage({
            text: "Invalid File Format",
            mode: "success",
          })
          return false
        }
      } catch (e) {
        showMessage({
          text: "Invalid File Format",
          mode: "success",
        })
        return false
      }
    }
    if (data.age === undefined || data.age === 0) {
      showMessage({
        text: "Missing Field Age",
        mode: "success",
      })
      return false;
    }
    if (
      data.grade === undefined ||
      !["S", "A", "B", "C", "D", "E", "F"].includes(data.grade)
    ) {
      showMessage({
        text: "Invalid Grade Field Value",
        mode: "success",
      })
      return false;
    }

    if (students
      .filter((student) => student.id !== data.id)
      .map((student) => student.rrn)
      .includes(data.rrn)
    ) {
      showMessage({
        text: "Student RRN already exists",
        mode: "error",
      })
      return false;
    }
    return true;
  }
const onSubmitUpdate = (data: updateStudentRequest) => {
  data.age = parseInt(`${data.age}`);
  data.rrn = parseInt(`${data.rrn}`);
  const isValid = isUpdateDataValid(data);
  console.log(isValid)
  if (!isValid) {
    return;
  }
  updateStudent(data).then((res) => {
    updateStudentStore(res)
    if (data.file !== undefined && data.file.length !== 0) {
      const formData = new FormData();
      formData.append("id", `${data.id}`)
      formData.append("file", data.file[0])
      uploadFile(formData).then(res => addFileStore(res))
    }
  });
  reset();
  closeModal()
  showMessage({
    text: "Successfully added new student details",
    mode: "success",
  })
};

useEffect(() => {
  const student = students.filter(s => s.id === selected[0])[0]
  if (student === undefined) {
    return;
  }
  if (!modal.show) {
    return;
  }
  setValue("id", student.id);
  setValue("rrn", student.rrn);
  setValue("name", student.name);
  setValue("age", student.age);
  setValue("grade", student.grade);
  setValue("place", student.place);
}, [modal, students, selected]);

return (
  <Modal
    open={modal.show && modal.type === "update"}
    onClose={() => {
      closeModal()
      reset();
    }
    }
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
                type="number"
                variant="outlined"
                onChange={onChange}
                value={value ? value : ""}
                label="RRN"
                error={!!errors.rrn}
                helperText={errors.rrn && `${errors.rrn.message}`}
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
          onClick={handleSubmit(onSubmitUpdate)}
          variant="contained"
          sx={{ padding: "0.7rem" }}
        >
          UPDATE
        </Button>
        <Button
          onClick={() => closeModal()}
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

