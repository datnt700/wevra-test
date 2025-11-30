import { Button, ButtonGroup, Modal } from '@eventure/eventured';
import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { centerCrop, Crop, makeAspectCrop, PixelCrop } from 'react-image-crop';
import { useDebounceEffect } from './useDebounceEffect';
import { canvasPreview } from './canvasPreview';
import { ImageCropModalMainStyled, ImageCropModalPreviewStyled } from './ImageCropModal.styles';

interface UploadCropImageProps {
  src: string | null;
  isOpen: boolean;
  onClose: () => void;
  selectedImage: File;
  uploadFileFn: ({ file }: { file: File }) => void;
  isUploadImagePending: boolean;
  cropWidth?: number;
  cropHeight?: number;
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export const ImageCropModal: React.FC<UploadCropImageProps> = ({
  src,
  isOpen,
  onClose,
  selectedImage,
  uploadFileFn,
  isUploadImagePending,
  cropWidth = 536,
  cropHeight = 270,
}: UploadCropImageProps) => {
  // const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop | undefined>({
    unit: 'px',
    x: 0,
    y: 0,
    width: cropWidth,
    height: cropHeight,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  // const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const reader = new FileReader();
  //     reader.addEventListener('load', () => setSrc(reader.result as string));
  //     reader.readAsDataURL(e.target.files[0]);
  //     setSelectedImage(e.target.files[0]);
  //   }
  // };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, cropWidth / cropHeight));
  }

  useEffect(() => {
    setCrop(undefined); // Makes crop preview update between images.
  }, []);

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, 1, 0);
      }
    },
    100,
    [completedCrop, 1, 0]
  );

  // const blobUrlRef = useRef('');
  // const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);

  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist');
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    // const scaleX = image.naturalWidth / image.width;
    // const scaleY = image.naturalHeight / image.height;

    // const offscreen = new OffscreenCanvas(completedCrop.width * scaleX, completedCrop.height * scaleY);

    // TODO: Fix 1.11 why?
    const offscreen = new OffscreenCanvas(completedCrop.width * 1.11, completedCrop.height * 1.11);

    //const offscreen = new OffscreenCanvas(536, 270);

    const ctx = offscreen.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    });

    const file = new File([blob], selectedImage?.name || '', { type: selectedImage?.type });

    uploadFileFn({
      file,
    });

    // if (blobUrlRef.current) {
    //   URL.revokeObjectURL(blobUrlRef.current);
    // }
    // blobUrlRef.current = URL.createObjectURL(blob);

    // if (hiddenAnchorRef.current) {
    //   hiddenAnchorRef.current.href = blobUrlRef.current;
    //   hiddenAnchorRef.current.click();
    // }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <ButtonGroup>
          <Button variant="secondary" onClick={onClose} disabled={isUploadImagePending}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onDownloadCropClick}
            disabled={isUploadImagePending}
            isLoading={isUploadImagePending}
          >
            Crop
          </Button>
        </ButtonGroup>
      }
    >
      {/* <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div> */}
      <ImageCropModalMainStyled>
        {!!src && (
          <ReactCrop
            crop={crop}
            ruleOfThirds
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            maxWidth={cropWidth} // Set the minimum width for cropping
            maxHeight={cropHeight} // Set the minimum height for cropping
            aspect={cropWidth / cropHeight}
            //locked
          >
            <img ref={imgRef} src={src} onLoad={onImageLoad} />
          </ReactCrop>
        )}
        <ImageCropModalPreviewStyled>
          {!!completedCrop && (
            <canvas
              ref={previewCanvasRef}
              style={{
                border: '1px solid black',
                objectFit: 'contain',
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          )}
        </ImageCropModalPreviewStyled>
      </ImageCropModalMainStyled>
    </Modal>
  );
};
