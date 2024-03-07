import { translationResources } from './config';

describe('i18n config', () => {
  it('should have all the required languages', () => {
    // Arrange
    const supportedLanguages = ['de', 'en', 'es', 'fr', 'na'];
    // Act
    const languages = Object.keys(translationResources);
    // Assert
    expect(languages).toEqual(supportedLanguages);
  });
});
