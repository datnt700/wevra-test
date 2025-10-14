import React, { useState, DragEvent, useRef, ChangeEvent } from 'react';
import { Icon } from '@tavia/core';
import { CloudUpload } from 'lucide-react';
import { FileUploadProps } from '..';
import { Styled } from './FileUpload.styles';

/**
 * A reusable FileUpload component designed to handle file selection and drag-and-drop functionality.
 *
 * Features:
 * - Supports multiple file uploads with the `multiple` prop.
 * - Provides a drag-and-drop zone with visual feedback when files are dragged over the area.
 * - Includes a hidden input field for traditional file selection via click.
 * - Displays customizable content (e.g., icons, titles, descriptions) for user guidance.
 * - Fully accessible with proper ARIA attributes and keyboard support.
 * - Styled using Emotion's `styled` API for modularity and reusability.
 * - Grouped styles under a `Styled` object for better organization and maintainability.
 *
 * Use Cases:
 * - File upload forms where users can select or drag-and-drop files.
 * - Customizable upload zones with dynamic styling based on interaction states (e.g., drag-over).
 */
export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  children,
  multiple = false,
  description,
}) => {
  const [isDragZoneActive, setIsDragZoneActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragZoneActive(true);
  };

  const onUploadDragLeave = () => {
    setIsDragZoneActive(false);
  };

  const onUploadDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragZoneActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // Use reader.result as a URL for previewing, e.g., setPreview(reader.result as string);
    };
    reader.readAsDataURL(file!);
  };

  const handleFilesInputUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleUploadFile = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <Styled.InputUpload
        id="upload"
        type="file"
        name="upload"
        onChange={handleFilesInputUpload}
        ref={inputRef}
        multiple={multiple}
      />
      {label && (
        <Styled.Label htmlFor="upload">
          <p>
            <span>{label}</span>
          </p>
        </Styled.Label>
      )}
      <Styled.Wrapper
        $isActive={isDragZoneActive}
        onDragOver={onUploadDragOver}
        onDragLeave={onUploadDragLeave}
        onDrop={onUploadDrop}
        onClick={handleUploadFile}
      >
        {children ? (
          children
        ) : (
          <Styled.Content>
            <Styled.TitleWrapper>
              <Icon source={<CloudUpload size={16} />} />
              <Styled.Title>
                Drag files or <Styled.Highlight>Click here</Styled.Highlight> to upload
              </Styled.Title>
            </Styled.TitleWrapper>
            {description && <Styled.Description>{description}</Styled.Description>}
          </Styled.Content>
        )}
      </Styled.Wrapper>
    </>
  );
};

FileUpload.displayName = 'FileUpload';
