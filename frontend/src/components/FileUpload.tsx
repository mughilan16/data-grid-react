import { Button } from "@mui/material";

export default function FileUpload(props : {
  setSelectedFile: React.Dispatch<React.SetStateAction<FileList | null>>
}) {
  const submitHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
  };
  return (
    <>
      <Button component="label" variant="contained" startIcon={<CloudUpload />}>
        Upload file
        <VisuallyHiddenInput type="file" onChange={(event) => {
          props.setSelectedFile(event.target.files)
        }} />
      </Button>
      <Button onClick={submitHandler}>Submit</Button>
    </>
  );
}
