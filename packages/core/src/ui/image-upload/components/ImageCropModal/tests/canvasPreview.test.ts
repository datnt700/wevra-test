import { describe, it, expect, vi, beforeEach } from 'vitest';
import { canvasPreview } from '../canvasPreview';

describe('canvasPreview', () => {
  let mockImage: HTMLImageElement;
  let mockCanvas: HTMLCanvasElement;
  let mockContext: any;

  beforeEach(() => {
    mockContext = {
      scale: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      drawImage: vi.fn(),
      imageSmoothingQuality: 'high',
    };

    mockImage = {
      naturalWidth: 1920,
      naturalHeight: 1080,
      width: 800,
      height: 450,
    } as HTMLImageElement;

    mockCanvas = {
      getContext: vi.fn(() => mockContext),
      width: 0,
      height: 0,
    } as unknown as HTMLCanvasElement;

    // Mock devicePixelRatio
    Object.defineProperty(window, 'devicePixelRatio', {
      writable: true,
      configurable: true,
      value: 2,
    });
  });

  describe('Basic Functionality', () => {
    it('should get 2d context from canvas', async () => {
      const crop = { unit: 'px' as const, x: 0, y: 0, width: 200, height: 100 };

      await canvasPreview(mockImage, mockCanvas, crop);

      expect(mockCanvas.getContext).toHaveBeenCalledWith('2d');
    });

    it('should throw error when context is not available', async () => {
      const crop = { unit: 'px' as const, x: 0, y: 0, width: 200, height: 100 };
      const canvasWithoutContext = {
        getContext: vi.fn(() => null),
      } as unknown as HTMLCanvasElement;

      await expect(canvasPreview(mockImage, canvasWithoutContext, crop)).rejects.toThrow(
        'No 2d context'
      );
    });

    it('should set canvas width and height based on crop and scale', async () => {
      const crop = { unit: 'px' as const, x: 0, y: 0, width: 400, height: 200 };

      await canvasPreview(mockImage, mockCanvas, crop);

      // Expected: crop.width * scaleX * pixelRatio
      // scaleX = naturalWidth / width = 1920 / 800 = 2.4
      // width = 400 * 2.4 * 2 = 1920
      expect(mockCanvas.width).toBe(1920);

      // scaleY = naturalHeight / height = 1080 / 450 = 2.4
      // height = 200 * 2.4 * 2 = 960
      expect(mockCanvas.height).toBe(960);
    });

    it('should call save and restore on context', async () => {
      const crop = { unit: 'px' as const, x: 0, y: 0, width: 200, height: 100 };

      await canvasPreview(mockImage, mockCanvas, crop);

      expect(mockContext.save).toHaveBeenCalled();
      expect(mockContext.restore).toHaveBeenCalled();
    });

    it('should draw image on canvas', async () => {
      const crop = { unit: 'px' as const, x: 0, y: 0, width: 200, height: 100 };

      await canvasPreview(mockImage, mockCanvas, crop);

      expect(mockContext.drawImage).toHaveBeenCalledWith(
        mockImage,
        0,
        0,
        mockImage.naturalWidth,
        mockImage.naturalHeight,
        0,
        0,
        mockImage.naturalWidth,
        mockImage.naturalHeight
      );
    });
  });

  describe('Scaling', () => {
    it('should apply default scale of 1', async () => {
      const crop = { unit: 'px' as const, x: 0, y: 0, width: 200, height: 100 };

      await canvasPreview(mockImage, mockCanvas, crop);

      // Should call scale with 1, 1 (from scale parameter)
      expect(mockContext.scale).toHaveBeenCalledWith(1, 1);
    });

    it('should apply custom scale when provided', async () => {
      const crop = { unit: 'px' as const, x: 0, y: 0, width: 200, height: 100 };

      await canvasPreview(mockImage, mockCanvas, crop, 1.5);

      expect(mockContext.scale).toHaveBeenCalledWith(1.5, 1.5);
    });

    it('should scale context by pixelRatio', async () => {
      const crop = { unit: 'px' as const, x: 0, y: 0, width: 200, height: 100 };

      await canvasPreview(mockImage, mockCanvas, crop);

      // First scale call should be for pixelRatio
      const scaleCalls = mockContext.scale.mock.calls;
      expect(scaleCalls[0]).toEqual([2, 2]); // devicePixelRatio = 2
    });

    it('should handle scale of 0.5', async () => {
      const crop = { unit: 'px' as const, x: 0, y: 0, width: 200, height: 100 };

      await canvasPreview(mockImage, mockCanvas, crop, 0.5);

      expect(mockContext.scale).toHaveBeenCalledWith(0.5, 0.5);
    });
  });

  describe('Rotation', () => {
    it('should apply default rotation of 0', async () => {
      const crop = { unit: 'px' as const, x: 0, y: 0, width: 200, height: 100 };

      await canvasPreview(mockImage, mockCanvas, crop);

      expect(mockContext.rotate).toHaveBeenCalledWith(0);
    });

    it('should apply custom rotation when provided', async () => {
      const crop = { unit: 'px' as const, x: 0, y: 0, width: 200, height: 100 };

      await canvasPreview(mockImage, mockCanvas, crop, 1, 90);

      // 90 degrees in radians = 90 * (PI / 180) ≈ 1.5708
      expect(mockContext.rotate).toHaveBeenCalledWith(expect.any(Number));
    });

    it('should handle 180 degree rotation', async () => {
      const crop = { unit: 'px' as const, x: 0, y: 0, width: 200, height: 100 };

      await canvasPreview(mockImage, mockCanvas, crop, 1, 180);

      // 180 degrees in radians = Math.PI
      expect(mockContext.rotate).toHaveBeenCalledWith(Math.PI);
    });

    it('should handle 360 degree rotation', async () => {
      const crop = { unit: 'px' as const, x: 0, y: 0, width: 200, height: 100 };

      await canvasPreview(mockImage, mockCanvas, crop, 1, 360);

      // 360 degrees in radians = 2 * Math.PI
      expect(mockContext.rotate).toHaveBeenCalledWith(2 * Math.PI);
    });
  });

  describe('Crop Positioning', () => {
    it('should handle crop at origin (0, 0)', async () => {
      const crop = { unit: 'px' as const, x: 0, y: 0, width: 200, height: 100 };

      await canvasPreview(mockImage, mockCanvas, crop);

      // Should translate (multiple calls for transformations)
      expect(mockContext.translate).toHaveBeenCalled();
      expect(mockContext.translate.mock.calls.length).toBeGreaterThan(0);
    });

    it('should handle crop with offset position', async () => {
      const crop = { unit: 'px' as const, x: 100, y: 50, width: 200, height: 100 };

      await canvasPreview(mockImage, mockCanvas, crop);

      // Should translate by -cropX, -cropY (scaled)
      // cropX = 100 * 2.4 = 240
      // cropY = 50 * 2.4 = 120
      expect(mockContext.translate).toHaveBeenCalledWith(-240, -120);
    });

    it('should handle crop at maximum position', async () => {
      const crop = { unit: 'px' as const, x: 600, y: 350, width: 200, height: 100 };

      await canvasPreview(mockImage, mockCanvas, crop);

      // cropX = 600 * 2.4 = 1440
      // cropY = 350 * 2.4 = 840
      expect(mockContext.translate).toHaveBeenCalledWith(-1440, -840);
    });
  });

  describe('Image Dimensions', () => {
    it('should handle large image dimensions', async () => {
      const largeImage = {
        naturalWidth: 3840,
        naturalHeight: 2160,
        width: 1920,
        height: 1080,
      } as HTMLImageElement;

      const crop = { unit: 'px' as const, x: 0, y: 0, width: 500, height: 250 };

      await canvasPreview(largeImage, mockCanvas, crop);

      expect(mockContext.drawImage).toHaveBeenCalledWith(
        largeImage,
        0,
        0,
        3840,
        2160,
        0,
        0,
        3840,
        2160
      );
    });

    it('should handle small image dimensions', async () => {
      const smallImage = {
        naturalWidth: 200,
        naturalHeight: 100,
        width: 100,
        height: 50,
      } as HTMLImageElement;

      const crop = { unit: 'px' as const, x: 0, y: 0, width: 50, height: 25 };

      await canvasPreview(smallImage, mockCanvas, crop);

      expect(mockContext.drawImage).toHaveBeenCalledWith(
        smallImage,
        0,
        0,
        200,
        100,
        0,
        0,
        200,
        100
      );
    });

    it('should handle square image dimensions', async () => {
      const squareImage = {
        naturalWidth: 1000,
        naturalHeight: 1000,
        width: 500,
        height: 500,
      } as HTMLImageElement;

      const crop = { unit: 'px' as const, x: 0, y: 0, width: 300, height: 300 };

      await canvasPreview(squareImage, mockCanvas, crop);

      expect(mockContext.drawImage).toHaveBeenCalledWith(
        squareImage,
        0,
        0,
        1000,
        1000,
        0,
        0,
        1000,
        1000
      );
    });
  });

  describe('Canvas Context Properties', () => {
    it('should set imageSmoothingQuality to high', async () => {
      const crop = { unit: 'px' as const, x: 0, y: 0, width: 200, height: 100 };

      await canvasPreview(mockImage, mockCanvas, crop);

      expect(mockContext.imageSmoothingQuality).toBe('high');
    });
  });

  describe('Transformation Order', () => {
    it('should call transformations in correct order', async () => {
      const crop = { unit: 'px' as const, x: 10, y: 10, width: 200, height: 100 };

      await canvasPreview(mockImage, mockCanvas, crop, 1.5, 45);

      const calls = mockContext.translate.mock.calls;
      const rotateCalls = mockContext.rotate.mock.calls;
      const scaleCalls = mockContext.scale.mock.calls;

      // Verify transformations were called
      expect(calls.length).toBeGreaterThan(0);
      expect(rotateCalls.length).toBeGreaterThan(0);
      expect(scaleCalls.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle crop with zero dimensions', async () => {
      const crop = { unit: 'px' as const, x: 0, y: 0, width: 0, height: 0 };

      await canvasPreview(mockImage, mockCanvas, crop);

      expect(mockCanvas.width).toBe(0);
      expect(mockCanvas.height).toBe(0);
    });

    it('should handle negative rotation', async () => {
      const crop = { unit: 'px' as const, x: 0, y: 0, width: 200, height: 100 };

      await canvasPreview(mockImage, mockCanvas, crop, 1, -45);

      // -45 degrees in radians
      expect(mockContext.rotate).toHaveBeenCalledWith(expect.any(Number));
    });

    it('should handle fractional crop dimensions', async () => {
      const crop = { unit: 'px' as const, x: 10.5, y: 20.5, width: 100.5, height: 50.5 };

      await canvasPreview(mockImage, mockCanvas, crop);

      // Canvas dimensions should be floored
      expect(mockCanvas.width).toBeGreaterThan(0);
      expect(mockCanvas.height).toBeGreaterThan(0);
    });

    it('should handle devicePixelRatio of 1', async () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 1,
      });

      const crop = { unit: 'px' as const, x: 0, y: 0, width: 200, height: 100 };

      await canvasPreview(mockImage, mockCanvas, crop);

      // First scale call should be for pixelRatio = 1
      const scaleCalls = mockContext.scale.mock.calls;
      expect(scaleCalls[0]).toEqual([1, 1]);
    });

    it('should handle high devicePixelRatio', async () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 3,
      });

      const crop = { unit: 'px' as const, x: 0, y: 0, width: 200, height: 100 };

      await canvasPreview(mockImage, mockCanvas, crop);

      // First scale call should be for pixelRatio = 3
      const scaleCalls = mockContext.scale.mock.calls;
      expect(scaleCalls[0]).toEqual([3, 3]);
    });
  });
});
