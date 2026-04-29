import Utilities from '../../../../src/util/Utilities';
import powerspinConstants from '../../../../src/util/powerspinConstants';

describe('Utilities functions', () => {
  describe('constructAmountFromSet()', () => {
    it('should return an array based on the amount and the set', () => {
      const result = Utilities.constructAmountFromSet(3, powerspinConstants.MULTIPLIERS_SET);
      expect(result).to.eql([2, 1]);
    });

    it('should return the valid combination scanning the set in reverse order', () => {
      const result = Utilities.constructAmountFromSet(12, powerspinConstants.MULTIPLIERS_SET);
      expect(result).to.eql([10, 2]);
    });
  });

  describe('toggleNumberInArray()', () => {
    it('should return the array untouched if the amount in not in the set', () => {
      const array = [1, 2, 4];
      const result = Utilities.toggleNumberInArray(3, array, powerspinConstants.MULTIPLIERS_SET);

      expect(result).to.eq(array);
    });

    it('should return the array param untouched if it is not array', () => {
      const array = { test: 'test' };
      const result = Utilities.toggleNumberInArray(3, array, powerspinConstants.MULTIPLIERS_SET);

      expect(result).to.eq(array);
    });

    it('should return a clone of the array containing the new number if not exists', () => {
      const array = [1, 2, 4];
      const result = Utilities.toggleNumberInArray(10, array, powerspinConstants.MULTIPLIERS_SET);

      expect(result).to.eql([1, 2, 4, 10]);
    });

    it('should return a clone of the array removing the number if exists', () => {
      const array = [1, 2, 4];
      const result = Utilities.toggleNumberInArray(4, array, powerspinConstants.MULTIPLIERS_SET);

      expect(result).to.eql([1, 2]);
    });

    it('should return the new array sorted from min to max', () => {
      const array = [1, 2, 10];
      const result = Utilities.toggleNumberInArray(6, array, powerspinConstants.MULTIPLIERS_SET);

      expect(result).to.eql([1, 2, 6, 10]);
    });
  });

  describe('isBetTypeClose2Win()', () => {
    it('should return true if the betType is 24', () => {
      expect(Utilities.isBetTypeClose2Win(24)).to.be.true;
    });

    it('should return true if the betType is 25', () => {
      expect(Utilities.isBetTypeClose2Win(25)).to.be.true;
    });

    it('should return false if the betType is 1', () => {
      expect(Utilities.isBetTypeClose2Win(1)).to.be.false;
    });
  });

  describe('isBetTypeKinoBonus()', () => {
    it('should return true if the betType is 2', () => {
      expect(Utilities.isBetTypeKinoBonus(2)).to.be.true;
    });

    it('should return true if the betType is 25', () => {
      expect(Utilities.isBetTypeKinoBonus(25)).to.be.true;
    });

    it('should return false if the betType is 24', () => {
      expect(Utilities.isBetTypeKinoBonus(24)).to.be.false;
    });
  });
});
