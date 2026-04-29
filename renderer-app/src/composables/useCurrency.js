export function useCurrency(locale = 'el-GR', currencyCode = 'EUR') {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const format = (value) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      return formatter.format(0);
    }
    return formatter.format(value);
  };

  const formatSimple = (value) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      return '€0.00';
    }
    return `€${value.toFixed(2)}`;
  };

  return {
    format,
    formatSimple,
  };
}
