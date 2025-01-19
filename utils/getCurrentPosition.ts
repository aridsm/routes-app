export function getUserPosition(): any {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        resolve(pos.coords);
      });
    } else {
      reject({ latitude: 0, longitude: 0 });
    }
  });
}
