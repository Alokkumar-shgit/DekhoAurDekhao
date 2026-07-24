import { useCallback, useEffect, useState } from "react";
import { places as staticPlaces } from "../data/places";

// Community submissions live in localStorage as a stand-in for the
// `submittedBy` / `status: "pending"` MongoDB collection described in the spec.
const KEY = "dad_submissions";

const read = () => JSON.parse(localStorage.getItem(KEY) || "[]");
const write = (items) => localStorage.setItem(KEY, JSON.stringify(items));

export function useSubmissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    setSubmissions(read());
  }, []);

  const addSubmission = useCallback((place) => {
    const withMeta = {
      ...place,
      id: `community-${crypto.randomUUID()}`,
      status: "approved", // instant-publish per spec section 8; flip to "pending" to require moderation
    };
    const next = [...read(), withMeta];
    write(next);
    setSubmissions(next);
    return withMeta;
  }, []);

  return { submissions, addSubmission };
}

export function useAllPlaces() {
  const { submissions } = useSubmissions();
  return [...staticPlaces, ...submissions];
}
