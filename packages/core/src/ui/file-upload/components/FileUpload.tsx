/**
 * @file FileUpload component
 * @description A reusable file upload component with drag-and-drop support
 */

import React, { useState, DragEvent, useRef, ChangeEvent } from 'react';
import { Icon } from '@tavia/core';
import { CloudUpload } from 'lucide-react';
import { FileUploadProps } from '..';
import { Styled } from './FileUpload.styles';

/**
 * FileUpload component for handling file selection and drag-and-drop uploads.
 *
 * @component
 * @example
 * // Basic usage
 * <FileUpload label="Upload Document" />
 *
 * @example
 * // Multiple files with description
 * <FileUpload
 *   label="Upload Files"
 *   multiple
 *   description="Supported formats: PDF, JPG, PNG (Max 10MB)"
 * />
 *
 * @example
 * // Custom content
 * <FileUpload label="Upload Image">
 *   <div>
 *     <p>Drop your image here</p>
 *     <p>or click to browse</p>
 *   </div>
 * </FileUpload>
 *
 * @param props - Component props
 * @param props.label - Label text for the file input
 * @param props.children - Custom content to display in the upload zone
 * @param props.multiple - Allow multiple file selection
 * @param props.description - Description text shown below the upload zone
 * @returns A file upload component with drag-and-drop support
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
