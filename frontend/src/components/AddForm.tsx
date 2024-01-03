import { Button, FormControl, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { addItem, addItemRequest } from "../service/api";
import { Item } from "../types/Item";

export function AddForm(props: {
  setItems: React.Dispatch<React.SetStateAction<Array<Item>>>;
}) {
  const { control, handleSubmit, reset } = useForm<addItemRequest>();
  const onSubmitAdd = (data: addItemRequest) => {
    addItem(data).then((res) => {
      props.setItems((prev) => {
        return [...prev, res];
      });
    });
    reset();
  };
  return (
    <FormControl sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
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
            ></TextField>
          );
        }}
      ></Controller>
      <Controller
        name="value"
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
              placeholder="Value"
              label="Value"
              error={!!errors.value}
            ></TextField>
          );
        }}
      ></Controller>
      <Button onClick={handleSubmit(onSubmitAdd)}>ADD</Button>
    </FormControl>
  );
}
