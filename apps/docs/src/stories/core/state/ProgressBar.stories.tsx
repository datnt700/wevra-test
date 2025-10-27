import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar, Button } from '@tavia/taviad';
import { useState, useEffect } from 'react';

/**
 * ProgressBar component - Visual indicator of task completion or loading state.
 *
 * Features:
 * - Determinate mode (0-100% with known progress)
 * - Indeterminate mode (loading state with animation)
 * - Four color variants (default, success, warning, error)
 * - Optional label showing percentage
 * - Smooth transitions and animations
 * - Fully accessible with ARIA attributes
 * - Auto-clamping of values (0-100)
 *
 * Best Practices:
 * - Use determinate for known progress (file uploads, forms)
 * - Use indeterminate for unknown duration (API calls)
 * - Choose variant based on context:
 *   - default: neutral tasks
 *   - success: completed successfully
 *   - warning: partial completion or caution
 *   - error: failed or critical state
 * - Show labels for longer operations
 * - Keep users informed with progress updates
 */
const meta = {
  title: 'Core/State/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress percentage (0-100)',
    },
    hasLabel: {
      control: 'boolean',
      description: 'Show percentage label',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Visual style variant',
    },
    isIndeterminate: {
      control: 'boolean',
      description: 'Indeterminate loading state',
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic progress bar - determinate mode.
 */
export const Basic: Story = {
  args: {
    progress: 45,
    hasLabel: false,
    variant: 'default',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <ProgressBar {...args} />
    </div>
  ),
};

/**
 * With label - showing percentage text.
 */
export const WithLabel: Story = {
  args: {
    progress: 65,
    hasLabel: true,
    variant: 'default',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <ProgressBar {...args} />
    </div>
  ),
};

/**
 * All variants - default, success, warning, error.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '500px' }}>
      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Default</div>
        <ProgressBar progress={60} hasLabel variant="default" />
      </div>

      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Success</div>
        <ProgressBar progress={100} hasLabel variant="success" />
      </div>

      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Warning</div>
        <ProgressBar progress={75} hasLabel variant="warning" />
      </div>

      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Error</div>
        <ProgressBar progress={30} hasLabel variant="error" />
      </div>
    </div>
  ),
};

/**
 * Indeterminate mode - loading state with animation.
 */
export const Indeterminate: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <div style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>Loading...</div>
      <ProgressBar isIndeterminate variant="default" />
    </div>
  ),
};

/**
 * File upload simulation - animated progress.
 */
export const FileUpload: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const startUpload = () => {
      setProgress(0);
      setIsUploading(true);
    };

    useEffect(() => {
      if (!isUploading) return;

      if (progress < 100) {
        const timer = setTimeout(() => {
          setProgress((prev) => Math.min(prev + Math.random() * 15, 100));
        }, 300);
        return () => clearTimeout(timer);
      } else {
        setTimeout(() => setIsUploading(false), 1000);
      }
    }, [progress, isUploading]);

    return (
      <div style={{ width: '500px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <span style={{ fontWeight: 500 }}>document.pdf</span>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            {isUploading ? (progress === 100 ? 'Complete!' : 'Uploading...') : 'Ready'}
          </span>
        </div>
        <ProgressBar
          progress={progress}
          hasLabel
          variant={progress === 100 ? 'success' : 'default'}
        />
        {!isUploading && (
          <Button
            variant="primary"
            onClick={startUpload}
            style={{ marginTop: '1rem', width: '100%' }}
          >
            Start Upload
          </Button>
        )}
      </div>
    );
  },
};

/**
 * Form completion - multi-step progress.
 */
export const FormCompletion: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;
    const progress = (currentStep / totalSteps) * 100;

    const steps = ['Personal Info', 'Contact Details', 'Preferences', 'Review & Submit'];

    return (
      <div style={{ width: '600px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 600 }}>
              Step {currentStep} of {totalSteps}
            </span>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{steps[currentStep - 1]}</span>
          </div>
          <ProgressBar progress={progress} variant="default" />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
          <Button
            variant="secondary"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button
            variant="primary"
            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, totalSteps))}
            disabled={currentStep === totalSteps}
            style={{ flex: 1 }}
          >
            {currentStep === totalSteps ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    );
  },
};

/**
 * Download progress - file download simulation.
 */
export const DownloadProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);

    const startDownload = () => {
      setProgress(0);
      setIsDownloading(true);
    };

    useEffect(() => {
      if (!isDownloading) return;

      if (progress < 100) {
        const timer = setTimeout(() => {
          setProgress((prev) => Math.min(prev + Math.random() * 10, 100));
        }, 200);
        return () => clearTimeout(timer);
      } else {
        setTimeout(() => setIsDownloading(false), 500);
      }
    }, [progress, isDownloading]);

    const fileSizeMB = 45.8;
    const downloadedMB = ((fileSizeMB * progress) / 100).toFixed(1);

    return (
      <div style={{ width: '450px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '2rem' }}>📥</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500 }}>application-setup.exe</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {isDownloading
                ? `${downloadedMB} MB of ${fileSizeMB} MB`
                : progress === 100
                  ? 'Download complete'
                  : 'Ready to download'}
            </div>
          </div>
        </div>
        <ProgressBar
          progress={progress}
          hasLabel
          variant={progress === 100 ? 'success' : 'default'}
        />
        {!isDownloading && progress < 100 && (
          <Button
            variant="primary"
            onClick={startDownload}
            style={{ marginTop: '1rem', width: '100%' }}
          >
            Download
          </Button>
        )}
      </div>
    );
  },
};

/**
 * Task completion - percentage milestones.
 */
export const TaskCompletion: Story = {
  render: () => {
    const [progress, setProgress] = useState(25);

    const getVariant = () => {
      if (progress === 100) return 'success';
      if (progress >= 75) return 'warning';
      return 'default';
    };

    const getMessage = () => {
      if (progress === 100) return '🎉 All tasks completed!';
      if (progress >= 75) return 'Almost there!';
      if (progress >= 50) return 'Halfway done';
      if (progress >= 25) return 'Good start';
      return 'Just getting started';
    };

    return (
      <div style={{ width: '500px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 600 }}>Project Tasks</span>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{progress}% complete</span>
          </div>
          <ProgressBar progress={progress} variant={getVariant()} />
          <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            {getMessage()}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="secondary" onClick={() => setProgress((prev) => Math.max(prev - 25, 0))}>
            -25%
          </Button>
          <Button
            variant="primary"
            onClick={() => setProgress((prev) => Math.min(prev + 25, 100))}
            style={{ flex: 1 }}
          >
            +25%
          </Button>
          <Button variant="secondary" onClick={() => setProgress(0)}>
            Reset
          </Button>
        </div>
      </div>
    );
  },
};

/**
 * Installation progress - package installation.
 */
export const InstallationProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isInstalling, setIsInstalling] = useState(false);
    const [currentPackage, setCurrentPackage] = useState('');

    const packages = ['react', 'typescript', 'eslint', 'prettier', 'vite'];

    const startInstallation = () => {
      setProgress(0);
      setIsInstalling(true);
      setCurrentPackage(packages[0]);
    };

    useEffect(() => {
      if (!isInstalling) return;

      if (progress < 100) {
        const timer = setTimeout(() => {
          const newProgress = Math.min(progress + Math.random() * 8, 100);
          setProgress(newProgress);

          const packageIndex = Math.floor((newProgress / 100) * packages.length);
          setCurrentPackage(packages[Math.min(packageIndex, packages.length - 1)]);
        }, 250);
        return () => clearTimeout(timer);
      } else {
        setTimeout(() => {
          setIsInstalling(false);
          setCurrentPackage('');
        }, 1000);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress, isInstalling]);

    return (
      <div style={{ width: '500px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Installing Dependencies</div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem' }}>
            {isInstalling
              ? `Installing ${currentPackage}...`
              : progress === 100
                ? 'Installation complete!'
                : 'Ready to install packages'}
          </div>
          <ProgressBar
            progress={progress}
            hasLabel
            variant={progress === 100 ? 'success' : 'default'}
          />
        </div>

        {!isInstalling && (
          <Button
            variant="primary"
            onClick={startInstallation}
            style={{ width: '100%' }}
            disabled={progress === 100 && !isInstalling}
          >
            {progress === 100 ? 'Installed' : 'Install Packages'}
          </Button>
        )}
      </div>
    );
  },
};

/**
 * Profile completion - account setup progress.
 */
export const ProfileCompletion: Story = {
  render: () => {
    const [completed, setCompleted] = useState({
      photo: true,
      bio: true,
      contact: false,
      social: false,
      preferences: false,
    });

    const completedCount = Object.values(completed).filter(Boolean).length;
    const totalCount = Object.keys(completed).length;
    const progress = (completedCount / totalCount) * 100;

    const toggleItem = (key: string) => {
      setCompleted((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
    };

    return (
      <div style={{ width: '500px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 600 }}>Complete Your Profile</span>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {completedCount} of {totalCount} completed
            </span>
          </div>
          <ProgressBar progress={progress} variant={progress === 100 ? 'success' : 'default'} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {Object.entries(completed).map(([key, value]) => (
            <label
              key={key}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
            >
              <input
                type="checkbox"
                checked={value}
                onChange={() => toggleItem(key)}
                style={{ width: '18px', height: '18px' }}
              />
              <span style={{ textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</span>
              {value && <span style={{ marginLeft: 'auto', color: '#10b981' }}>✓</span>}
            </label>
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Loading states - indeterminate vs determinate.
 */
export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '500px' }}>
      <div>
        <div style={{ marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: 500 }}>
          Indeterminate (Unknown duration)
        </div>
        <ProgressBar isIndeterminate variant="default" />
        <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
          Loading data...
        </div>
      </div>

      <div>
        <div style={{ marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: 500 }}>
          Determinate (Known progress)
        </div>
        <ProgressBar progress={67} hasLabel variant="default" />
        <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
          Processing files...
        </div>
      </div>
    </div>
  ),
};

/**
 * Error state - failed operation.
 */
export const ErrorState: Story = {
  render: () => (
    <div style={{ width: '450px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 600, color: '#ef4444' }}>Upload Failed</span>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>42% completed</span>
        </div>
        <ProgressBar progress={42} hasLabel variant="error" />
        <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#ef4444' }}>
          ⚠️ Connection lost. Please try again.
        </div>
      </div>
      <Button variant="primary" style={{ width: '100%' }}>
        Retry Upload
      </Button>
    </div>
  ),
};

/**
 * Success state - completed operation.
 */
export const SuccessState: Story = {
  render: () => (
    <div style={{ width: '450px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontWeight: 600, color: '#10b981' }}>Upload Complete</span>
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>100%</span>
      </div>
      <ProgressBar progress={100} hasLabel variant="success" />
      <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#10b981' }}>
        ✓ File uploaded successfully!
      </div>
    </div>
  ),
};

/**
 * Multiple progress bars - concurrent operations.
 */
export const MultipleOperations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '500px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>image1.jpg</span>
          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Uploading</span>
        </div>
        <ProgressBar progress={85} variant="default" />
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>document.pdf</span>
          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Uploading</span>
        </div>
        <ProgressBar progress={45} variant="default" />
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>video.mp4</span>
          <span style={{ fontSize: '0.75rem', color: '#10b981' }}>Complete</span>
        </div>
        <ProgressBar progress={100} variant="success" />
      </div>
    </div>
  ),
};

/**
 * Showcase of all progress bar configurations.
 */
export const Showcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', padding: '2rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Basic Progress</h3>
        <div style={{ width: '400px' }}>
          <ProgressBar progress={60} />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>With Label</h3>
        <div style={{ width: '400px' }}>
          <ProgressBar progress={75} hasLabel />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Color Variants</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
          <ProgressBar progress={50} hasLabel variant="default" />
          <ProgressBar progress={100} hasLabel variant="success" />
          <ProgressBar progress={80} hasLabel variant="warning" />
          <ProgressBar progress={35} hasLabel variant="error" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Indeterminate Loading</h3>
        <div style={{ width: '400px' }}>
          <ProgressBar isIndeterminate />
        </div>
      </div>
    </div>
  ),
};
