const { checkVersion } = require('../../lib/version_checker');

module.exports = function VersionChecker() {
  describe('Version Checker', () => {
    test('When dataVersion is empty', () => {
      const dataVersion = {};

      const result = checkVersion(dataVersion);

      expect(result.updated).toEqual(true);
      expect(result.incompatible).toEqual([]);
    });

    test('With MINOR issues', () => {
      const dataVersion = {
        currentAppVersion: '2.0.0',
        minimumRequiredAppVersion: '2.1.0',
      };

      const result = checkVersion(dataVersion);

      expect(result.updated).toEqual(false);
      expect(result.incompatible).toContainEqual({ with: 'minimumAllowedAppVersion', changes: 'MINOR' });
    });

    test('With MAJOR issues', () => {
      const dataVersion = {
        currentAppVersion: '1.0.0',
        minimumRequiredAppVersion: '2.0.0',
      };

      const result = checkVersion(dataVersion);

      expect(result.updated).toEqual(false);
      expect(result.incompatible).toContainEqual({ with: 'minimumAllowedAppVersion', changes: 'MAJOR' });
    });
  });
};
