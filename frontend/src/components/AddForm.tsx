import { Button, FormControl, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { addItemRequest } from "../service/api";
import { Item } from "../types/Item";
import { useEffect, useState } from "react";
import { useAddItem } from "../service/queries";

export function AddForm(props: {
  setItems: React.Dispatch<React.SetStateAction<Array<Item>>>;
}) {
  const { control, handleSubmit } = useForm<addItemRequest>();
  const [newItemState, setNewItemState] = useState<addItemRequest | undefined>(
    undefined
  );
  const addedItem = useAddItem(newItemState);
  useEffect(() => {
    if (addedItem === undefined) {
      return;
    }
    if (addedItem.data === undefined) {
      return;
    }
    const data = addedItem.data;
    props.setItems((prev) => {
      if (prev.includes(data)) {
        return prev;
      }
      return [...prev, data];
    });
  }, [addedItem]);

  const onSubmitAdd = (data: addItemRequest) => {
    setNewItemState(data);
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
