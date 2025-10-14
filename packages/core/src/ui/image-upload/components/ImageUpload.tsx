import React, { useCallback, useRef, useState } from 'react';
import { Styled } from './ImageUpload.styles';
import { ImageCropModal } from './ImageCropModal';
import { ImageUploadProps } from '..';

/**
 * A reusable ImageUpload component designed for uploading and cropping images.
 *
 * Features:
 * - Supports drag-and-drop functionality for image uploads.
 * - Displays a preview of the uploaded image.
 * - Integrates with an image cropping modal for customization.
 * - Styled using Emotion's `styled` API for modularity and reusability.
 * - Grouped styles under a `Styled` object for better organization and maintainability.
 *
 * Props:
 * - `content`: Optional content displayed in the upload zone (e.g., instructions or icons).
 * - `value`: Current value of the uploaded image URL (controlled).
 * - `onChange`: Callback function triggered when the uploaded image changes.
 * - `uploadImage`: Function to handle image uploads and return the uploaded URL.
 * - `isUploadImagePending`: Boolean indicating whether the image upload is in progress.
 * - `cropWidth`: Optional width for the image crop area.
 * - `cropHeight`: Optional height for the image crop area.
 */
export const ImageUpload = ({
  content,
  value,
  onChange,
  uploadImage,
  isUploadImagePending,
  cropWidth = 16,
  cropHeight = 9
}: ImageUploadProps) => {
  const [isDragZoneActive, setIsDragZoneActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [imageSrc, setImageSrc] = useState<string | null>(value || null);
  const [isCropModalOpen, setCropModalOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  /**
   * Handles the drag-over event to activate the drag zone.
   * @param e - Drag event.
   */
  const onUploadDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragZoneActive(true);
  };

  /**
   * Handles the drag-leave event to deactivate the drag zone.
   */
  const onUploadDragLeave = () => {
    setIsDragZoneActive(false);
  };

  /**
   * Handles the drop event to process the dropped file.
   * @param e - Drop event.
   */
  const onUploadDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragZoneActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles({ target: { files } }); // Pass a valid synthetic event-like object
    }
  };

  /**
   * Handles file selection and prepares the image for cropping.
   * @param e - File change event.
   */
  const handleFiles = async (e: {
    target: {
      files: FileList | null;
    };
  }) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);

    setImage(file);
    setCropModalOpen(true);
  };

  /**
   * Uploads the selected image and updates the component state.
   * @param params.file - The file to upload.
   */
  const uploadFileFn = useCallback(
    async ({ file }: { file: File }) => {
      if (!uploadImage) return;

      try {
        const data = await uploadImage({ file });
        setCropModalOpen(false);
        onChange(data);
        setPreview(data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    },
    [uploadImage, onChange]
  );

  return (
    <>
      {/* Hidden file input */}
      <Styled.InputUpload
        id="upload"
        type="file"
        name="upload"
        accept="image/*"
        onChange={handleFiles}
        ref={inputRef}
      />

      {/* Drag-and-drop zone */}
      <Styled.Wrapper
        $isActive={isDragZoneActive}
        onDragOver={onUploadDragOver}
        onDragLeave={onUploadDragLeave}
        onDrop={onUploadDrop}
        htmlFor="upload"
        aria-label="Drag and drop an image here or click to browse"
      >
        {/* Image preview */}
        {preview && <Styled.Preview src={preview} alt="Upload preview" />}

        {/* Default content */}
        <Styled.Content>{content}</Styled.Content>
      </Styled.Wrapper>

      {/* Image crop modal */}
      {isCropModalOpen && (
        <ImageCropModal
          isOpen={isCropModalOpen}
          onClose={() => setCropModalOpen(false)}
          uploadFileFn={uploadFileFn}
          selectedImage={image!}
          src={imageSrc!}
          isUploadImagePending={isUploadImagePending}
          cropWidth={cropWidth}
          cropHeight={cropHeight}
        />
      )}
    </>
  );
};
