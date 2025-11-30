import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from '@eventure/eventured';
import { FileText, Image as ImageIcon, Video, Music, Archive } from 'lucide-react';

/**
 * FileUpload component for handling file selection with drag-and-drop support.
 *
 * Features:
 * - Drag-and-drop file upload
 * - Click to browse files
 * - Single or multiple file selection
 * - Custom labels and descriptions
 * - Custom content rendering
 * - Visual feedback for drag state
 */
const meta: Meta<typeof FileUpload> = {
  title: 'Core/Form/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the file input',
    },
    description: {
      control: 'text',
      description: 'Description text shown below the upload zone',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
    children: {
      control: false,
      description: 'Custom content to display in the upload zone',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

/**
 * Basic file upload with default styling.
 * Drag files or click to browse.
 */
export const Basic: Story = {
  args: {
    label: 'Upload File',
  },
};

/**
 * File upload with description text.
 * Useful for showing file requirements.
 */
export const WithDescription: Story = {
  args: {
    label: 'Upload Document',
    description: 'Supported formats: PDF, DOC, DOCX (Max 10MB)',
  },
};

/**
 * Multiple file upload.
 * Allows selecting multiple files at once.
 */
export const MultipleFiles: Story = {
  args: {
    label: 'Upload Files',
    description: 'Select multiple files to upload',
    multiple: true,
  },
};

/**
 * Image upload with specific requirements.
 */
export const ImageUpload: Story = {
  args: {
    label: 'Upload Images',
    description: 'Supported: JPG, PNG, GIF (Max 5MB each)',
    multiple: true,
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FileUpload {...args}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <ImageIcon size={48} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 500 }}>
            Drop images here
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>or click to browse</p>
        </div>
      </FileUpload>
    </div>
  ),
};

/**
 * Document upload with icon.
 */
export const DocumentUpload: Story = {
  args: {
    label: 'Upload Documents',
    description: 'PDF, DOC, DOCX, TXT',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FileUpload {...args}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <FileText size={48} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 500 }}>
            Drop documents here
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
            or click to select files
          </p>
        </div>
      </FileUpload>
    </div>
  ),
};

/**
 * Video upload with custom styling.
 */
export const VideoUpload: Story = {
  args: {
    label: 'Upload Videos',
    description: 'MP4, MOV, AVI (Max 100MB)',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FileUpload {...args}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Video size={48} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 500 }}>
            Drop video files
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
            Drag & drop or click to upload
          </p>
        </div>
      </FileUpload>
    </div>
  ),
};

/**
 * Audio upload with custom content.
 */
export const AudioUpload: Story = {
  args: {
    label: 'Upload Audio',
    description: 'MP3, WAV, OGG (Max 50MB)',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FileUpload {...args}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Music size={48} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 500 }}>
            Upload audio files
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
            Supported formats: MP3, WAV, OGG
          </p>
        </div>
      </FileUpload>
    </div>
  ),
};

/**
 * Archive upload (ZIP, RAR, etc.).
 */
export const ArchiveUpload: Story = {
  args: {
    label: 'Upload Archive',
    description: 'ZIP, RAR, TAR, 7Z',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FileUpload {...args}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Archive size={48} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 500 }}>
            Drop archive files
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
            Compressed files accepted
          </p>
        </div>
      </FileUpload>
    </div>
  ),
};

/**
 * Compact upload zone.
 * Smaller size for inline forms.
 */
export const Compact: Story = {
  args: {
    label: 'Attachment',
    description: 'Max 5MB',
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <FileUpload {...args}>
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            <strong>Click</strong> or <strong>drag</strong> to upload
          </p>
        </div>
      </FileUpload>
    </div>
  ),
};

/**
 * Large upload zone.
 * More prominent for important upload actions.
 */
export const Large: Story = {
  args: {
    label: 'Upload Files',
    description: 'Drop your files anywhere in this zone',
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <FileUpload {...args}>
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <ImageIcon size={64} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 600 }}>
            Drag & drop your files here
          </p>
          <p style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#6b7280' }}>
            or click to browse from your computer
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#9ca3af' }}>
            Supported formats: All file types • Maximum size: 50MB per file
          </p>
        </div>
      </FileUpload>
    </div>
  ),
};

/**
 * Profile picture upload.
 * Common use case with specific requirements.
 */
export const ProfilePictureUpload: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Profile Picture</h3>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
          Upload a photo for your profile
        </p>
      </div>
      <FileUpload label="Change Picture" description="JPG, PNG or GIF (Max 2MB, minimum 400x400px)">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 1rem',
              borderRadius: '50%',
              backgroundColor: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ImageIcon size={32} style={{ color: '#9ca3af' }} />
          </div>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 500 }}>
            Click to upload
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>or drag and drop</p>
        </div>
      </FileUpload>
    </div>
  ),
};

/**
 * Resume/CV upload for job applications.
 */
export const ResumeUpload: Story = {
  render: () => (
    <div
      style={{
        width: '500px',
        padding: '1.5rem',
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
      }}
    >
      <h3 style={{ margin: '0 0 1rem 0' }}>Application Form</h3>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
          Full Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
        <input
          type="email"
          placeholder="john@example.com"
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <FileUpload label="Resume/CV *" description="PDF or DOC format (Max 5MB)">
          <div style={{ textAlign: 'center', padding: '1.5rem' }}>
            <FileText size={40} style={{ margin: '0 auto 0.75rem', color: '#9ca3af' }} />
            <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', fontWeight: 500 }}>
              Upload your resume
            </p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>
              Click or drag file here
            </p>
          </div>
        </FileUpload>
      </div>

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          fontWeight: 500,
        }}
      >
        Submit Application
      </button>
    </div>
  ),
};

/**
 * Showcase of all FileUpload variants.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Basic</h3>
        <FileUpload label="Upload File" />
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>With Description</h3>
        <FileUpload label="Upload Document" description="Supported: PDF, DOC, DOCX (Max 10MB)" />
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Multiple Files</h3>
        <FileUpload label="Upload Multiple" description="Select multiple files" multiple />
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Custom Content</h3>
        <FileUpload label="Upload Images">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <ImageIcon size={48} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
            <p style={{ margin: 0, fontWeight: 500 }}>Custom upload zone</p>
          </div>
        </FileUpload>
      </div>
    </div>
  ),
};
