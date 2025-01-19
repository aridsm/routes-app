const apiKey = "5b3ce3597851110001cf6248e5702cf024e241f9af91bbc0f047ed30";

interface Options {
  coordinates: Array<number>[];
  locomotion: "driving-car" | "foot-walking" | "cycling-regular";
  language?: string;
}

export async function fetchRoutes(options: Options): Promise<any> {
  return await fetch(
    `https://api.openrouteservice.org/v2/directions/${options.locomotion}/geojson`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify({
        coordinates: options.coordinates,
        language: options.language || "pt",
      }),
    }
  );
}

export async function fetchGeocode(value: string): Promise<any> {
  return await fetch(
    `https://api.openrouteservice.org/geocode/search?api_key=5b3ce3597851110001cf6248e5702cf024e241f9af91bbc0f047ed30&text=${value}`
  ).then(async (res: any) => {
    const result = await res.json();
    return result;
  });
}
