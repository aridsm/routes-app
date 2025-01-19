export function convertTime(seconds: number) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor(((seconds % 86400) % 3600) / 60);

  if (days >= 1) {
    return `${days} dias, ${hours}h ${minutes}min`;
  } else {
    return `${hours}h ${minutes}min`;
  }
}

export function convertMetersToKm(meters: number) {
  return (meters / 1000).toFixed(2);
}
