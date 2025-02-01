export function getUserPosition(): any {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve(pos.coords);
        },
        () => {
          reject("Acesso à localização negado");
        }
      );
    } else {
      reject("Geolocalização não suportada");
    }
  });
}
