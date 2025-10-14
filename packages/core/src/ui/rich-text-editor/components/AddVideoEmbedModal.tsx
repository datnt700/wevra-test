import { useState } from 'react';
import { Modal } from '../../modal';
import { InputText } from '../../input';
import { ButtonGroup } from '../../button-group';
import { Button } from '../../button';

/**
 * A modal component for adding an embedded video using Tiptap's rich text editor.
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
 * - `addVideoEmbed`: Function to add the video embed to the editor.
 */
export const AddVideoEmbedModal = ({
  isOpen,
  onClose,
  addVideoEmbed,
}: {
  isOpen: boolean;
  onClose: () => void;
  addVideoEmbed: (videoUrl: string) => void;
}) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Validates the entered URL and adds the video embed if valid.
   */
  const onAddVideoEmbedClick = () => {
    if (!videoUrl.trim()) {
      setErrorMessage('Please enter a valid video URL.');
      return;
    }

    // Basic URL validation (optional: you can use a regex for stricter validation)
    try {
      new URL(videoUrl);
    } catch (error) {
      setErrorMessage('The entered URL is invalid.');
      return;
    }

    // If validation passes, add the video embed and reset state
    addVideoEmbed(videoUrl);
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <label htmlFor="video-url" style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
          Enter embedded video URL (e.g., YouTube):
        </label>
        <InputText
          id="video-url"
          type="text"
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
            style={{
              color: 'var(--color-red)',
              marginTop: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
            }}
          >
            {errorMessage}
          </p>
        )}
      </div>
    </Modal>
  );
};
