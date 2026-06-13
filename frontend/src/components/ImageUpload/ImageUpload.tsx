import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { imageUploadStyles } from "./ImageUpload.styles";

const ACCEPTED_TYPES = ["image/png", "image/jpeg"];
const MAX_BYTES = 8 * 1024 * 1024;

interface ImageUploadProps {
  imageUrl?: string;
  onFileSelected: (file: File) => void;
}

const ImageUpload = ({ imageUrl, onFileSelected }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | undefined>(imageUrl);
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | undefined>(undefined);

  // Cleanup object url when unmount
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const handleFile = (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Only PNG or JPG images are allowed.");

      return;
    }

    if (file.size > MAX_BYTES) {
      toast.error("Image must be 8MB or smaller.");

      return;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setPreview(url);
    onFileSelected(file);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  return (
    <Box
      sx={imageUploadStyles.dropzone}
      onClick={() => inputRef.current?.click()}
      onDragOver={event => event.preventDefault()}
      onDrop={handleDrop}
    >
      {preview ? (
        <Box component="img" src={preview} alt="Product preview" sx={imageUploadStyles.preview} />
      ) : (
        <>
          <CloudUploadOutlinedIcon fontSize="large" color="action" />
          <Typography>Drag/drop image :)</Typography>
          <Typography variant="body2" sx={imageUploadStyles.hint}>
            PNG or JPG, up to 8MB
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ImageOutlinedIcon />}
            onClick={event => {
              event.stopPropagation();
              inputRef.current?.click();
            }}
          >
            Browse files
          </Button>
        </>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleSelect}
        hidden
      />
    </Box>
  );
};

export { ImageUpload };
