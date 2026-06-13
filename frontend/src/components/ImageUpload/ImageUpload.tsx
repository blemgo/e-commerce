import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useUploadProductImage } from "@api/hooks/cloudinary/useUploadProductImage";
import { imageUploadStyles } from "./ImageUpload.styles";

const ACCEPTED_TYPES = ["image/png", "image/jpeg"];
const MAX_BYTES = 8 * 1024 * 1024;

interface ImageUploadProps {
  imageUrl?: string;
  onUploaded: (url: string) => void;
}

const ImageUpload = ({ imageUrl, onUploaded }: ImageUploadProps) => {
  const { uploadImage, isLoading } = useUploadProductImage();
  const [preview, setPreview] = useState<string | undefined>(imageUrl);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Only PNG or JPG images are allowed.");

      return;
    }

    if (file.size > MAX_BYTES) {
      toast.error("Image must be 8MB or smaller.");

      return;
    }

    setPreview(URL.createObjectURL(file));

    const url = await uploadImage(file);
    onUploaded(url);
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
      {isLoading ? (
        <CircularProgress color="secondary" />
      ) : preview ? (
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
