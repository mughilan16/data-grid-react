import { Button, FormControl, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { updateItem, updateItemRequest } from "../service/api";
import { Item } from "../types/Item";

export function UpdateForm(props: {
  setItems: React.Dispatch<React.SetStateAction<Array<Item>>>;
}) {
  const { control, handleSubmit, reset } = useForm<updateItemRequest>();
  const onSubmitUpdate = (data: updateItemRequest) => {
    updateItem(data).then((data) => {
      props.setItems((prev) =>
        prev.map((item) => {
          if (data.id === item.id) {
            return data;
          }
          return item;
        })
      );
    });
    reset();
  };
  return (
    <FormControl sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
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
              label="ID"
              error={!!errors.id}
            ></TextField>
          );
        }}
      ></Controller>
      <Controller
        name="updatedValue"
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
              error={!!errors.updatedValue}
            ></TextField>
          );
        }}
      ></Controller>
      <Button onClick={handleSubmit(onSubmitUpdate)}>UPDATE</Button>
    </FormControl>
  );
}
