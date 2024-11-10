export const formatCurrency = (value) => {
  if (!value) return '';

  const lang = localStorage.getItem('language');
  if (lang === 'en') {
    const usdValue = value / 25000;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(usdValue);
  } else {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(value);
  }
};

export default formatCurrency;