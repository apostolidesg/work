/**
 * Generate a UUID v4
 * @returns {string} A UUID v4 string
 */
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Validate if a string is a valid UUID format
 * @param {string} uuid - The UUID string to validate
 * @returns {boolean} True if valid UUID format
 */
export function isValidUUID(uuid) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return typeof uuid === 'string' && uuidRegex.test(uuid);
}

/**
 * Generate a short UUID (8 characters)
 * @returns {string} A short UUID string
 */
export function generateShortUUID() {
  return Math.random().toString(36).substr(2, 8);
}
