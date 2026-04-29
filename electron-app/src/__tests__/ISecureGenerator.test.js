import { AppToHALCommands } from '@/constants/AppToHALCommands';
import { ISecureGenerator } from '@/services/ISecureGenerator';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  return {
    randomBytes: vi.fn(() => {
      const buffer = Buffer.alloc(4);
      buffer.writeUInt32BE(1234567890, 0);
      return buffer;
    }),
  };
});

vi.mock('node:crypto', () => {
  return {
    default: {
      randomBytes: mocks.randomBytes,
    },
  };
});

const mockWSRequestManager = {
  sendRequest: vi.fn(),
};

describe('ISecureGenerator', () => {
  let iSecureGenerator;

  beforeEach(() => {
    vi.clearAllMocks();
    iSecureGenerator = new ISecureGenerator(mockWSRequestManager);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('generateISecure', () => {
    it('should return transformed iSecure object on success', async () => {
      const mockResponse = {
        reply: 'OK',
        iSecure: {
          randomNumbers: [123, 456],
        },
      };

      mockWSRequestManager.sendRequest.mockResolvedValueOnce(mockResponse);

      const result = await iSecureGenerator.generateISecure();

      expect(mockWSRequestManager.sendRequest).toHaveBeenCalledWith(AppToHALCommands.GENERATE_ISECURE);
      expect(result).toEqual({
        randomNumbers: ['0000000123', '0000000456'],
        hashes: undefined,
      });
    });

    it('should throw an error if request fails', async () => {
      const mockError = new Error('Network error');
      mockWSRequestManager.sendRequest.mockRejectedValueOnce(mockError);

      await expect(iSecureGenerator.generateISecure()).rejects.toThrow(
        `Error generating iSecure: ${mockError.message}`,
      );
    });
  });

  describe('getHashFromRandomNumbers', () => {
    it('should return hashes from HAL response', async () => {
      const mockResponse = {
        reply: 'OK',
        iSecure: {
          hashes: [789, 101],
        },
      };
      const randomNumbers = [123, 456];

      mockWSRequestManager.sendRequest.mockResolvedValueOnce(mockResponse);

      const result = await iSecureGenerator.getHashFromRandomNumbers(randomNumbers);

      expect(mockWSRequestManager.sendRequest).toHaveBeenCalledWith(AppToHALCommands.GET_HASH_FROM_RANDOM_NUMBERS, {
        randomNumbers,
      });
      expect(result).toEqual([789, 101]);
    });

    it('should throw an error if request fails', async () => {
      const mockError = new Error('Failed to get hash');
      mockWSRequestManager.sendRequest.mockRejectedValueOnce(mockError);

      await expect(iSecureGenerator.getHashFromRandomNumbers([123, 456])).rejects.toThrow(
        `Error getting hash from random numbers: ${mockError.message}`,
      );
    });
  });

  describe('calculateCRC', () => {
    it('should return padded CRC string on success', async () => {
      const mockResponse = {
        reply: 'OK',
        crc: 123,
      };
      const barcode = 'ABC123';

      mockWSRequestManager.sendRequest.mockResolvedValueOnce(mockResponse);

      const result = await iSecureGenerator.calculateCRC(barcode);

      expect(mockWSRequestManager.sendRequest).toHaveBeenCalledWith(AppToHALCommands.CALCULATE_CRC, { barcode });
      expect(result).toBe('00123');
    });

    it('should throw an error if request fails', async () => {
      const mockError = new Error('CRC calculation failed');
      mockWSRequestManager.sendRequest.mockRejectedValueOnce(mockError);

      await expect(iSecureGenerator.calculateCRC('ABC123')).rejects.toThrow(
        `Error calculating CRC: ${mockError.message}`,
      );
    });
  });

  describe('generateISecureSeed', () => {
    it('should generate a random 32-bit number', () => {
      const seed = iSecureGenerator.generateISecureSeed();
      expect(seed).toBe(1234567890);
    });
  });

  describe('generateISecureData', () => {
    it('should use provided seeds if available', async () => {
      const mockHashes = [789, 101];
      const mockGetHash = vi.spyOn(iSecureGenerator, 'getHashFromRandomNumbers').mockResolvedValueOnce(mockHashes);

      const data = {
        iSecureFirst: '123',
        iSecureSecond: '456',
      };

      const result = await iSecureGenerator.generateISecureData(data);

      expect(mockGetHash).toHaveBeenCalledWith([123, 456]);
      expect(result).toEqual({
        randomNumbers: ['0000000123', '0000000456'],
        hashes: mockHashes,
      });

      mockGetHash.mockRestore();
    });

    it('should use randomly generated seeds if no data is provided', async () => {
      const mockSeed = 1234567890;
      const mockHashes = [789, 101];

      vi.spyOn(iSecureGenerator, 'generateISecureSeed').mockReturnValueOnce(mockSeed).mockReturnValueOnce(mockSeed);
      vi.spyOn(iSecureGenerator, 'getHashFromRandomNumbers').mockResolvedValueOnce(mockHashes);

      const result = await iSecureGenerator.generateISecureData();

      expect(iSecureGenerator.generateISecureSeed).toHaveBeenCalledTimes(2);
      expect(iSecureGenerator.getHashFromRandomNumbers).toHaveBeenCalledWith([mockSeed, mockSeed]);
      expect(result).toEqual({
        randomNumbers: ['1234567890', '1234567890'],
        hashes: mockHashes,
      });
    });
  });
});
