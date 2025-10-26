'use client';

import { useState } from 'react';
import { Modal } from '../../modal';
import { ButtonGroup } from '../../button-group';
import { Button } from '../../button';
import { TextArea } from '../../textarea';
import { cssVars } from '../../../theme/tokens/colors';

/**
 * A modal component for adding an embedded iframe (e.g., YouTube video) using Tiptap's rich text editor.
 *
 * Features:
 * - Accepts a video URL as input.
 * - Validates the entered URL to ensure it's not empty or invalid.
 * - Provides feedback to the user if the URL is invalid.
 * - Styled consistently with the rest of the application.
 *
 * Props:
 * - `isOpen`: Boolean indicating whether the modal is open.
 * - `onClose`: Callback function to close the modal.
 * - `addIframeEmbed`: Function to add the iframe embed to the editor.
 */
export const AddIframeEmbedModal = ({
  isOpen,
  onClose,
  addIframeEmbed,
}: {
  isOpen: boolean;
  onClose: () => void;
  addIframeEmbed: (videoUrl: string) => void;
}) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Validates the entered URL and adds the iframe embed if valid.
   */
  const onAddVideoEmbedClick = () => {
    if (!videoUrl.trim()) {
      setErrorMessage('Please enter a valid video URL.');
      return;
    }

    // Basic URL validation (optional: you can use a regex for stricter validation)
    try {
      new URL(videoUrl);
    } catch {
      setErrorMessage('The entered URL is invalid.');
      return;
    }

    // If validation passes, add the iframe embed and reset state
    addIframeEmbed(videoUrl);
    setVideoUrl('');
    setErrorMessage(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Add Embedded Video"
      footer={
        <ButtonGroup>
          <Button onClick={onAddVideoEmbedClick}>Add</Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </ButtonGroup>
      }
    >
      <div>
        <label htmlFor="video-url" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Enter embedded video URL (e.g., YouTube):
        </label>
        <TextArea
          id="video-url"
          placeholder="https://www.youtube.com/embed/..."
          value={videoUrl}
          onChange={(e) => {
            setVideoUrl(e.target.value);
            setErrorMessage(null); // Clear error message on input change
          }}
          aria-label="Enter embedded video URL"
          aria-describedby={errorMessage ? 'video-url-error' : undefined}
        />
        {errorMessage && (
          <p
            id="video-url-error"
            style={{ color: cssVars.colorRed, marginTop: '0.5rem', fontSize: '0.875rem' }}
          >
            {errorMessage}
          </p>
        )}
      </div>
    </Modal>
  );
};
