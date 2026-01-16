import {
  lerp,
  clamp,
  getFrameIndexFromProgress,
  isValidEmail,
  isValidUAEPhone,
  getFrameFilename,
} from '../lib/utils';

describe('Utility Functions', () => {
  describe('lerp', () => {
    it('should return start value when t is 0', () => {
      expect(lerp(0, 100, 0)).toBe(0);
    });

    it('should return end value when t is 1', () => {
      expect(lerp(0, 100, 1)).toBe(100);
    });

    it('should return midpoint when t is 0.5', () => {
      expect(lerp(0, 100, 0.5)).toBe(50);
    });

    it('should handle negative values', () => {
      expect(lerp(-50, 50, 0.5)).toBe(0);
    });
  });

  describe('clamp', () => {
    it('should return value when within range', () => {
      expect(clamp(50, 0, 100)).toBe(50);
    });

    it('should return min when value is below', () => {
      expect(clamp(-10, 0, 100)).toBe(0);
    });

    it('should return max when value is above', () => {
      expect(clamp(150, 0, 100)).toBe(100);
    });
  });

  describe('getFrameIndexFromProgress', () => {
    const totalFrames = 120;

    it('should return 0 for 0% progress', () => {
      const result = getFrameIndexFromProgress(0, totalFrames, 1, 0);
      expect(result).toBe(0);
    });

    it('should return last frame for 100% progress', () => {
      const result = getFrameIndexFromProgress(1, totalFrames, 1, totalFrames - 1);
      expect(result).toBe(totalFrames - 1);
    });

    it('should return middle frame for 50% progress', () => {
      const result = getFrameIndexFromProgress(0.5, totalFrames, 1, 59);
      expect(result).toBeCloseTo(59, 0);
    });

    it('should clamp values within range', () => {
      const result = getFrameIndexFromProgress(1.5, totalFrames, 1, totalFrames - 1);
      expect(result).toBe(totalFrames - 1);
    });

    it('should apply smoothing correctly', () => {
      // With 0.12 smoothing from frame 0 to raw target 119
      const result = getFrameIndexFromProgress(1, totalFrames, 0.12, 0);
      expect(result).toBeCloseTo(14, 0); // lerp(0, 119, 0.12) ≈ 14.28
    });
  });

  describe('isValidEmail', () => {
    it('should return true for valid email', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
    });

    it('should return false for invalid email', () => {
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('test.com')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
    });
  });

  describe('isValidUAEPhone', () => {
    it('should return true for valid UAE phone', () => {
      expect(isValidUAEPhone('+971501234567')).toBe(true);
      expect(isValidUAEPhone('971501234567')).toBe(true);
      expect(isValidUAEPhone('0501234567')).toBe(true);
    });

    it('should return false for invalid phone', () => {
      expect(isValidUAEPhone('123')).toBe(false);
      expect(isValidUAEPhone('abcdefghij')).toBe(false);
    });
  });

  describe('getFrameFilename', () => {
    it('should generate correct filename with default padding', () => {
      expect(getFrameFilename(1)).toBe('frame_0001_delay-0.066s.webp');
      expect(getFrameFilename(120)).toBe('frame_0120_delay-0.066s.webp');
    });

    it('should handle custom padding', () => {
      expect(getFrameFilename(1, 3)).toBe('frame_001_delay-0.066s.webp');
      expect(getFrameFilename(1, 5)).toBe('frame_00001_delay-0.066s.webp');
    });
  });
});
