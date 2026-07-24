import { useCallback, useEffect, useState } from "react";
import { api, fileUrl } from "../lib/api";

// Normalizes an API place record: resolves uploaded image/video paths
// (served from the backend's /uploads folder) into absolute URLs.
const normalize = (place) => ({
  ...place,
  image: fileUrl(place.image),
  videos: (place.videos || []).map(fileUrl),
});

export function usePlaces({ district, category, q } = {}) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { places: data } = await api.getPlaces({ district, category, q });
      setPlaces(data.map(normalize));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [district, category, q]);

  useEffect(() => {
    load();
  }, [load]);

  return { places, loading, error, refetch: load };
}

export function usePlace(id) {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    api
      .getPlace(id)
      .then(({ place: data }) => {
        if (!cancelled) setPlace(normalize(data));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { place, loading, error };
}

export async function submitPlace(formValues, files) {
  const formData = new FormData();
  Object.entries(formValues).forEach(([key, value]) => {
    if (value !== undefined && value !== null) formData.append(key, value);
  });
  (files.images || []).forEach((file) => formData.append("images", file));
  (files.videos || []).forEach((file) => formData.append("videos", file));

  const { place } = await api.createPlace(formData);
  return normalize(place);
}
