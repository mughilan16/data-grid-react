import Box from "@mui/material/Box";
import { AddForm } from "./components/AddForm";
import { UpdateForm } from "./components/UpdateForm";
import { Table } from "./components/Table";

function App() {
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
      <Table />
      <AddForm/>
      <UpdateForm/>
    </Box>
  );
}

export default App;
