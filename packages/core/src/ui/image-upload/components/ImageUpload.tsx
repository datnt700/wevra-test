/**
 * @file ImageUpload component
 * @description A reusable image upload component with drag-and-drop and cropping support
 */

import React, { useCallback, useRef, useState } from 'react';
import { Styled } from './ImageUpload.styles';
import { ImageCropModal } from './ImageCropModal';
import { ImageUploadProps } from '..';

/**
 * ImageUpload component for uploading and cropping images with drag-and-drop support.
 *
 * @component
 * @example
 * // Basic usage with upload handler
 * <ImageUpload
 *   value={imageUrl}
 *   onChange={(url) => setImageUrl(url)}
 *   uploadImage={async ({ file }) => {
 *     const formData = new FormData();
 *     formData.append('file', file);
 *     const response = await fetch('/api/upload', { method: 'POST', body: formData });
 *     return response.json().then(data => data.url);
 *   }}
 *   isUploadImagePending={uploading}
 *   content={<p>Click or drag image to upload</p>}
 * />
 *
 * @example
 * // Custom crop dimensions (16:9 aspect ratio)
 * <ImageUpload
 *   value={imageUrl}
 *   onChange={setImageUrl}
 *   uploadImage={uploadHandler}
 *   cropWidth={16}
 *   cropHeight={9}
 *   content={
 *     <div>
 *       <Icon source={<ImageIcon />} />
 *       <p>Upload banner image</p>
 *     </div>
 *   }
 * />
 *
 * @example
 * // Square crop (1:1 aspect ratio)
 * <ImageUpload
 *   value={avatarUrl}
 *   onChange={setAvatarUrl}
 *   uploadImage={uploadHandler}
 *   cropWidth={1}
 *   cropHeight={1}
 *   content={<p>Upload profile picture</p>}
 * />
 *
 * @param props - Component props
 * @param props.content - Custom content to display in the upload zone
 * @param props.value - Current uploaded image URL (controlled)
 * @param props.onChange - Callback when the image changes
 * @param props.uploadImage - Function to handle image upload and return URL
 * @param props.isUploadImagePending - Whether image upload is in progress
 * @param props.cropWidth - Width aspect ratio for crop (default: 16)
 * @param props.cropHeight - Height aspect ratio for crop (default: 9)
 * @returns An image upload component with drag-and-drop and cropping
 */
export const ImageUpload = ({
  content,
  value,
  onChange,
  uploadImage,
  isUploadImagePending,
  cropWidth = 16,
  cropHeight = 9,
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

ImageUpload.displayName = 'ImageUpload';
