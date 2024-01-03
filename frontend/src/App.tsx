import Box from "@mui/material/Box";
import { AddForm } from "./components/AddForm";
import { UpdateForm } from "./components/UpdateForm";
import { Table } from "./components/Table";
import { Item } from "./types/Item";
import { useState } from "react";

function App() {
  const [items, setItems] = useState(new Array<Item>());
  return (
    <Box
      justifyContent={"center"}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "20px",
      }}
    >
      <Table items={items} setItems={setItems} />
      <AddForm setItems={setItems} />
      <UpdateForm setItems={setItems} />
    </Box>
  );
}

export default App;
