// utils/formatters.ts
export const formatWeight = (weight: number, unit: 'lbs' | 'kg' = 'lbs'): string => {
  return `${weight} ${unit}`;
};

export const formatVolume = (volume: number): string => {
  if (volume >= 1000) {
    return `${(volume / 1000).toFixed(1)}k`;
  }
  return volume.toString();
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const formatPercentage = (value: number, total: number): string => {
  if (total === 0) return '0%';
  return `${Math.round((value / total) * 100)}%`;
};
