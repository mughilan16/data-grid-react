import { Box, Button, FormControl } from "@mui/material";
import { uploadFile } from "./service/api";
import { useState } from "react";
import { CloudUpload } from "@mui/icons-material";
import { VisuallyHiddenInput } from "./components/FileInput";

export default function FileUpload() {
  const [selectedFiles, setSelectedFile] = useState<FileList | null>(null);
  const submitHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    var formData = new FormData();
    if (selectedFiles === null) {
      return;
    }
    formData.append("file", selectedFiles[0]);
    uploadFile(formData);
  };
  return (
    <Box>
      <FormControl>
        <Button component="label" variant="contained" startIcon={<CloudUpload />}>
          Upload file
          <VisuallyHiddenInput type="file" onChange={(event) => {
            setSelectedFile(event.target.files)
          }} />
        </Button>
        <Button onClick={submitHandler}>Submit</Button>
      </FormControl>
    </Box>
  );
}
