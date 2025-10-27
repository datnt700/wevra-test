import type { Meta, StoryObj } from '@storybook/react';
import { ImageUpload } from '@tavia/taviad';
import { useState } from 'react';
import { Image as ImageIcon, User, Camera } from 'lucide-react';

/**
 * ImageUpload component for uploading and cropping images with drag-and-drop support.
 *
 * Features:
 * - Drag-and-drop image upload
 * - Built-in image cropping with customizable aspect ratios
 * - Preview of uploaded images
 * - Upload progress state
 * - Custom content rendering
 * - Square, landscape, and portrait crop options
 */
const meta: Meta<typeof ImageUpload> = {
  title: 'Core/Form/ImageUpload',
  component: ImageUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Current uploaded image URL',
    },
    content: {
      control: false,
      description: 'Custom content to display in upload zone',
    },
    cropWidth: {
      control: 'number',
      description: 'Width aspect ratio for crop',
    },
    cropHeight: {
      control: 'number',
      description: 'Height aspect ratio for crop',
    },
    isUploadImagePending: {
      control: 'boolean',
      description: 'Whether upload is in progress',
    },
    onChange: {
      action: 'image changed',
      description: 'Callback when image changes',
    },
    uploadImage: {
      action: 'upload image',
      description: 'Function to handle image upload',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageUpload>;

/**
 * Simulates an image upload to a server.
 * In production, replace with actual API call.
 */
const mockUploadImage = async ({ file }: { file: File }): Promise<string> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In production, upload to server and return URL
  // const formData = new FormData();
  // formData.append('file', file);
  // const response = await fetch('/api/upload', { method: 'POST', body: formData });
  // return response.json().then(data => data.url);

  // For demo, return local object URL
  return URL.createObjectURL(file);
};

/**
 * Basic image upload with 16:9 aspect ratio (default).
 * Click or drag to upload an image.
 */
export const Basic: Story = {
  render: () => {
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleUpload = async ({ file }: { file: File }) => {
      setUploading(true);
      const url = await mockUploadImage({ file });
      setUploading(false);
      return url;
    };

    return (
      <div style={{ width: '400px' }}>
        <ImageUpload
          value={imageUrl}
          onChange={setImageUrl}
          uploadImage={handleUpload}
          isUploadImagePending={uploading}
          content={<p>Click or drag image to upload</p>}
        />
      </div>
    );
  },
};

/**
 * Square crop (1:1 aspect ratio).
 * Perfect for profile pictures and avatars.
 */
export const SquareCrop: Story = {
  render: () => {
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleUpload = async ({ file }: { file: File }) => {
      setUploading(true);
      const url = await mockUploadImage({ file });
      setUploading(false);
      return url;
    };

    return (
      <div style={{ width: '400px' }}>
        <ImageUpload
          value={imageUrl}
          onChange={setImageUrl}
          uploadImage={handleUpload}
          isUploadImagePending={uploading}
          cropWidth={1}
          cropHeight={1}
          content={
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <User size={48} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
              <p style={{ margin: 0 }}>Upload square image (1:1)</p>
            </div>
          }
        />
      </div>
    );
  },
};

/**
 * Wide banner crop (21:9 aspect ratio).
 * Ideal for header banners and cover photos.
 */
export const WideBannerCrop: Story = {
  render: () => {
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleUpload = async ({ file }: { file: File }) => {
      setUploading(true);
      const url = await mockUploadImage({ file });
      setUploading(false);
      return url;
    };

    return (
      <div style={{ width: '600px' }}>
        <ImageUpload
          value={imageUrl}
          onChange={setImageUrl}
          uploadImage={handleUpload}
          isUploadImagePending={uploading}
          cropWidth={21}
          cropHeight={9}
          content={
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <ImageIcon size={48} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
              <p style={{ margin: 0 }}>Upload wide banner (21:9)</p>
            </div>
          }
        />
      </div>
    );
  },
};

/**
 * Portrait crop (9:16 aspect ratio).
 * Useful for mobile story formats or vertical images.
 */
export const PortraitCrop: Story = {
  render: () => {
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleUpload = async ({ file }: { file: File }) => {
      setUploading(true);
      const url = await mockUploadImage({ file });
      setUploading(false);
      return url;
    };

    return (
      <div style={{ width: '300px' }}>
        <ImageUpload
          value={imageUrl}
          onChange={setImageUrl}
          uploadImage={handleUpload}
          isUploadImagePending={uploading}
          cropWidth={9}
          cropHeight={16}
          content={
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <ImageIcon size={48} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
              <p style={{ margin: 0 }}>Upload portrait image (9:16)</p>
            </div>
          }
        />
      </div>
    );
  },
};

/**
 * Standard landscape (4:3 aspect ratio).
 * Common for photos and general images.
 */
export const LandscapeCrop: Story = {
  render: () => {
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleUpload = async ({ file }: { file: File }) => {
      setUploading(true);
      const url = await mockUploadImage({ file });
      setUploading(false);
      return url;
    };

    return (
      <div style={{ width: '400px' }}>
        <ImageUpload
          value={imageUrl}
          onChange={setImageUrl}
          uploadImage={handleUpload}
          isUploadImagePending={uploading}
          cropWidth={4}
          cropHeight={3}
          content={<p>Upload landscape image (4:3)</p>}
        />
      </div>
    );
  },
};

/**
 * Profile picture uploader with custom styling.
 * Shows circular preview and upload state.
 */
export const ProfilePicture: Story = {
  render: () => {
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleUpload = async ({ file }: { file: File }) => {
      setUploading(true);
      const url = await mockUploadImage({ file });
      setUploading(false);
      return url;
    };

    return (
      <div
        style={{
          width: '400px',
          padding: '2rem',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
        }}
      >
        <h3 style={{ margin: '0 0 1rem 0', textAlign: 'center' }}>Profile Picture</h3>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #3b82f6',
              }}
            />
          ) : (
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <User size={48} style={{ color: '#9ca3af' }} />
            </div>
          )}
        </div>

        <ImageUpload
          value={imageUrl}
          onChange={setImageUrl}
          uploadImage={handleUpload}
          isUploadImagePending={uploading}
          cropWidth={1}
          cropHeight={1}
          content={
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <Camera size={32} style={{ margin: '0 auto 0.5rem', color: '#9ca3af' }} />
              <p style={{ margin: '0 0 0.25rem 0', fontWeight: 500 }}>
                {uploading ? 'Uploading...' : 'Change Picture'}
              </p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>
                JPG, PNG or GIF (Max 2MB)
              </p>
            </div>
          }
        />
      </div>
    );
  },
};

/**
 * Cover photo uploader for profile pages.
 * Wide format with preview.
 */
export const CoverPhoto: Story = {
  render: () => {
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleUpload = async ({ file }: { file: File }) => {
      setUploading(true);
      const url = await mockUploadImage({ file });
      setUploading(false);
      return url;
    };

    return (
      <div style={{ width: '700px' }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>Cover Photo</h3>

        {imageUrl && (
          <div style={{ marginBottom: '1rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <img
              src={imageUrl}
              alt="Cover"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
          </div>
        )}

        <ImageUpload
          value={imageUrl}
          onChange={setImageUrl}
          uploadImage={handleUpload}
          isUploadImagePending={uploading}
          cropWidth={16}
          cropHeight={9}
          content={
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <ImageIcon size={48} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 500 }}>
                {uploading ? 'Uploading cover photo...' : 'Upload cover photo'}
              </p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                Recommended: 1920x1080px • JPG or PNG (Max 5MB)
              </p>
            </div>
          }
        />
      </div>
    );
  },
};

/**
 * Product image uploader for e-commerce.
 * Square format with guidelines.
 */
export const ProductImage: Story = {
  render: () => {
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleUpload = async ({ file }: { file: File }) => {
      setUploading(true);
      const url = await mockUploadImage({ file });
      setUploading(false);
      return url;
    };

    return (
      <div
        style={{
          width: '500px',
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
        }}
      >
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Product Photo</h3>
        <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
          Upload a high-quality image of your product
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <ImageUpload
              value={imageUrl}
              onChange={setImageUrl}
              uploadImage={handleUpload}
              isUploadImagePending={uploading}
              cropWidth={1}
              cropHeight={1}
              content={
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <ImageIcon size={40} style={{ margin: '0 auto 0.75rem', color: '#9ca3af' }} />
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 500 }}>
                    {uploading ? 'Uploading...' : 'Upload image'}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>
                    Square format (1:1)
                  </p>
                </div>
              }
            />
          </div>

          {imageUrl && (
            <div style={{ width: '150px' }}>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 500 }}>
                Preview
              </p>
              <img
                src={imageUrl}
                alt="Product preview"
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '0.375rem',
                  border: '1px solid #e5e7eb',
                }}
              />
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#f9fafb',
            borderRadius: '0.375rem',
          }}
        >
          <p
            style={{
              margin: '0 0 0.5rem 0',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#374151',
            }}
          >
            Image Guidelines:
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.75rem', color: '#6b7280' }}>
            <li>Minimum 800x800px, recommended 2000x2000px</li>
            <li>White or transparent background preferred</li>
            <li>JPG or PNG format, maximum 10MB</li>
            <li>Show the product clearly without distractions</li>
          </ul>
        </div>
      </div>
    );
  },
};

/**
 * Blog post featured image uploader.
 * 16:9 format with preview and metadata.
 */
export const BlogFeaturedImage: Story = {
  render: () => {
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleUpload = async ({ file }: { file: File }) => {
      setUploading(true);
      const url = await mockUploadImage({ file });
      setUploading(false);
      return url;
    };

    return (
      <div style={{ width: '600px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Article Title
          </label>
          <input
            type="text"
            placeholder="Enter your article title..."
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Featured Image
          </label>
          <ImageUpload
            value={imageUrl}
            onChange={setImageUrl}
            uploadImage={handleUpload}
            isUploadImagePending={uploading}
            cropWidth={16}
            cropHeight={9}
            content={
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <ImageIcon size={48} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 500 }}>
                  {uploading ? 'Uploading...' : 'Upload featured image'}
                </p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                  16:9 aspect ratio • JPG or PNG (Max 5MB)
                </p>
              </div>
            }
          />
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: '#6b7280' }}>
            This image will appear at the top of your article and in social media previews.
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Social media post image uploader.
 * Square format optimized for Instagram/Twitter.
 */
export const SocialMediaPost: Story = {
  render: () => {
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleUpload = async ({ file }: { file: File }) => {
      setUploading(true);
      const url = await mockUploadImage({ file });
      setUploading(false);
      return url;
    };

    return (
      <div
        style={{
          width: '500px',
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
        }}
      >
        <h3 style={{ margin: '0 0 1rem 0' }}>Create Post</h3>

        <textarea
          placeholder="What's on your mind?"
          rows={3}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontFamily: 'inherit',
            marginBottom: '1rem',
          }}
        />

        <ImageUpload
          value={imageUrl}
          onChange={setImageUrl}
          uploadImage={handleUpload}
          isUploadImagePending={uploading}
          cropWidth={1}
          cropHeight={1}
          content={
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <ImageIcon size={40} style={{ margin: '0 auto 0.75rem', color: '#9ca3af' }} />
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', fontWeight: 500 }}>
                {uploading ? 'Uploading...' : 'Add photo'}
              </p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>
                Square format recommended
              </p>
            </div>
          }
        />

        <button
          type="submit"
          style={{
            width: '100%',
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Post
        </button>
      </div>
    );
  },
};

/**
 * Multiple aspect ratios comparison.
 * Shows different crop options side by side.
 */
export const AspectRatios: Story = {
  render: () => {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async ({ file }: { file: File }) => {
      setUploading(true);
      const url = await mockUploadImage({ file });
      setUploading(false);
      return url;
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Square (1:1) - Profile Pictures</h3>
          <div style={{ maxWidth: '300px' }}>
            <ImageUpload
              value=""
              onChange={() => {}}
              uploadImage={handleUpload}
              isUploadImagePending={uploading}
              cropWidth={1}
              cropHeight={1}
              content={<p style={{ textAlign: 'center' }}>1:1 Aspect Ratio</p>}
            />
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Landscape (4:3) - Photos</h3>
          <div style={{ maxWidth: '400px' }}>
            <ImageUpload
              value=""
              onChange={() => {}}
              uploadImage={handleUpload}
              isUploadImagePending={uploading}
              cropWidth={4}
              cropHeight={3}
              content={<p style={{ textAlign: 'center' }}>4:3 Aspect Ratio</p>}
            />
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Widescreen (16:9) - Banners</h3>
          <div style={{ maxWidth: '600px' }}>
            <ImageUpload
              value=""
              onChange={() => {}}
              uploadImage={handleUpload}
              isUploadImagePending={uploading}
              cropWidth={16}
              cropHeight={9}
              content={<p style={{ textAlign: 'center' }}>16:9 Aspect Ratio</p>}
            />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Showcase of all ImageUpload variants.
 */
export const AllVariants: Story = {
  render: () => {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async ({ file }: { file: File }) => {
      setUploading(true);
      const url = await mockUploadImage({ file });
      setUploading(false);
      return url;
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Default (16:9)</h3>
          <ImageUpload
            value=""
            onChange={() => {}}
            uploadImage={handleUpload}
            isUploadImagePending={uploading}
            content={<p>Upload image</p>}
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Square (1:1)</h3>
          <div style={{ maxWidth: '300px' }}>
            <ImageUpload
              value=""
              onChange={() => {}}
              uploadImage={handleUpload}
              isUploadImagePending={uploading}
              cropWidth={1}
              cropHeight={1}
              content={<p>Upload square image</p>}
            />
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>With Custom Content</h3>
          <ImageUpload
            value=""
            onChange={() => {}}
            uploadImage={handleUpload}
            isUploadImagePending={uploading}
            content={
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <ImageIcon size={48} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
                <p style={{ margin: 0, fontWeight: 500 }}>Custom upload zone</p>
              </div>
            }
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Uploading State</h3>
          <ImageUpload
            value=""
            onChange={() => {}}
            uploadImage={handleUpload}
            isUploadImagePending={true}
            content={<p>Uploading...</p>}
          />
        </div>
      </div>
    );
  },
};
