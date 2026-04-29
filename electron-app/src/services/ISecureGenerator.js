import { AppToHALCommands } from '@/constants/AppToHALCommands';
import { logger as mainLogger } from '@/util/Logger';
import to from 'await-to-js';
import { randomBytes } from 'node:crypto';

const logger = process.env.FORGE_NODE_ENV === 'development' ? console : mainLogger;

/**
 * @class ISecureGenerator
 * @description A service to generate iSecure hashes for L10
 */
export class ISecureGenerator {
  /**
   * Created an instance of ISecureGenerator
   * @constructor
   * @param {WSRequestManager} WSRequestManager - The WSRequestManager instance
   */
  constructor(WSRequestManager) {
    this.wsRequestManager = WSRequestManager;
  }

  /**
   * Generates iSecure object
   * @returns {Promise<ISecure>} A promise that resolves with the generated iSecure.
   * @throws If an error occurs during iSecure generation.
   */
  async generateISecure() {
    /**
     * @type {[Error, HalResponse]}
     */
    const [err, response] = await to(this.wsRequestManager.sendRequest(AppToHALCommands.GENERATE_ISECURE));

    if (err) {
      logger.error(`Error generating iSecure: ${JSON.stringify(err)}`);
      throw new Error(`Error generating iSecure: ${err.message}`);
    }

    response.reply === 'OK'
      ? logger.info(`iSecure Generated: ${JSON.stringify(response)}`)
      : logger.error(`iSecure Generation Error: ${JSON.stringify(response.error)}`);

    const iSecure = response.iSecure;
    const [firstSeed, secondSeed] = iSecure.randomNumbers;
    const firstSeedStr = firstSeed.toString().padStart(10, '0');
    const secondSeedStr = secondSeed.toString().padStart(10, '0');

    const transformedISecure = {
      ...iSecure,
      randomNumbers: [firstSeedStr, secondSeedStr],
    };

    return transformedISecure;
  }

  /**
   * Generates iSecure hashes
   * @param {number[]} randomNumbers - The random numbers to generate hashes for
   * @returns {Promise<number[]>} A promise that resolves with the generated hashes.
   * @throws If an error occurs during hash generation.
   */
  async getHashFromRandomNumbers(randomNumbers) {
    /**
     * @type {[Error, HalResponse]}
     */
    const [err, response] = await to(
      this.wsRequestManager.sendRequest(AppToHALCommands.GET_HASH_FROM_RANDOM_NUMBERS, {
        randomNumbers,
      }),
    );

    if (err) {
      logger.error(`Error getting hash from random numbers: ${JSON.stringify(err)}`);
      throw new Error(`Error getting hash from random numbers: ${err.message}`);
    }

    response.reply === 'OK'
      ? logger.info(`Hash Generated: ${JSON.stringify(response)}`)
      : logger.error(`Hash Generation Error: ${JSON.stringify(response.error)}`);

    const hashes = response?.iSecure?.hashes;

    return hashes;
  }

  /**
   * Calculate the CRC for a given barcode
   * @param {string} barcode - The barcode to calculate the CRC for
   * @returns {Promise<string>} A promise that resolves with the calculated CRC.
   * @throws If an error occurs during CRC calculation.
   */
  async calculateCRC(barcode) {
    /**
     * @type {[Error, HalResponse]}
     */
    const [err, response] = await to(
      this.wsRequestManager.sendRequest(AppToHALCommands.CALCULATE_CRC, {
        barcode,
      }),
    );

    if (err) {
      logger.error(`Error calculating CRC: ${JSON.stringify(err)}`);
      throw new Error(`Error calculating CRC: ${err.message}`);
    }

    response.reply === 'OK'
      ? logger.info(`CRC Calculated: ${JSON.stringify(response)}`)
      : logger.error(`CRC Calculation Error: ${JSON.stringify(response.error)}`);

    const crc = response.crc?.toString().padStart(5, '0');

    return crc;
  }

  /**
   * Generates a random 32-bit number
   */
  generateISecureSeed() {
    return randomBytes(4).readUInt32BE(0, true);
  }

  /**
   * Generates a random iSecure object.
   * @param {Object} data - The data to use to generate the iSecure object
   * @param {string} data.iSecureFirst - The first seed for the iSecure object
   * @param {string} data.iSecureSecond - The second seed for the iSecure object
   * @returns {Promise<ISecure>} A promise that resolves with the generated iSecure object
   */
  async generateISecureData(data) {
    let firstSeed = this.generateISecureSeed();
    let secondSeed = this.generateISecureSeed();
    if (data) {
      const { iSecureFirst = '', iSecureSecond = '' } = data;
      firstSeed = iSecureFirst && !isNaN(iSecureFirst) ? parseInt(iSecureFirst, 10) : firstSeed;
      secondSeed = iSecureSecond && !isNaN(iSecureSecond) ? parseInt(iSecureSecond, 10) : secondSeed;
    }

    const hashes = await this.getHashFromRandomNumbers([firstSeed, secondSeed]);
    const firstSeedStr = firstSeed.toString().padStart(10, '0');
    const secondSeedStr = secondSeed.toString().padStart(10, '0');
    const iSecure = {
      randomNumbers: [firstSeedStr, secondSeedStr],
      hashes,
    };

    return iSecure;
  }
}
