import React from 'react';

/**
 * Props for the ImageUpload component.
 */
export interface ImageUploadProps {
  /**
   * Optional content displayed in the upload zone (e.g., instructions or icons).
   */
  content?: React.ReactNode;

  /**
   * Description for the upload zone (optional).
   */
  description?: string;

  /**
   * Current value of the uploaded image URL (controlled).
   */
  value?: string;

  /**
   * Callback function triggered when the uploaded image changes.
   * @param value - The uploaded image URL.
   */
  onChange: (value: string) => void;

  /**
   * Function to handle image uploads and return the uploaded URL.
   * @param file - The file to upload.
   * @returns A Promise resolving to the uploaded image URL.
   */
  uploadImage: ({ file }: { file: File }) => Promise<string>;

  /**
   * Boolean indicating whether the image upload is in progress.
   */
  isUploadImagePending: boolean;

  /**
   * Optional width for the image crop area (default: 16).
   */
  cropWidth?: number;

  /**
   * Optional height for the image crop area (default: 9).
   */
  cropHeight?: number;
}
