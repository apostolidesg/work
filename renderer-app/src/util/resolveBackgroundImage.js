const resolveBackgroundImage = (value) => {
  if (!value) return '';
  const trimmed = String(value).trim();
  if (!trimmed) return '';
  if (/^(url|linear-gradient|radial-gradient|conic-gradient)\(/i.test(trimmed)) {
    return trimmed;
  }
  return `url(${trimmed})`;
};

export default resolveBackgroundImage;
