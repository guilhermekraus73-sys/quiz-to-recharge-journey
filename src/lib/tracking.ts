// Persist UTM / tracking parameters captured on any funnel page so they
// survive client-side navigations and reach the checkout.
const STORAGE_KEY = "funnel_tracking";

export type TrackingParams = {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  src?: string | null;
  sck?: string | null;
};

const KEYS: (keyof TrackingParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "src",
  "sck",
];

const safeStorage = (): Storage | null => {
  try {
    if (typeof window === "undefined") return null;
    return window.sessionStorage;
  } catch {
    return null;
  }
};

export const captureTracking = (search: URLSearchParams | string): TrackingParams => {
  const params = typeof search === "string" ? new URLSearchParams(search) : search;
  const storage = safeStorage();
  const stored: TrackingParams = (() => {
    if (!storage) return {};
    try {
      const raw = storage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as TrackingParams) : {};
    } catch {
      return {};
    }
  })();

  const merged: TrackingParams = { ...stored };
  let changed = false;
  for (const key of KEYS) {
    const v = params.get(key);
    if (v && v.trim()) {
      if (merged[key] !== v) {
        merged[key] = v;
        changed = true;
      }
    }
  }

  if (changed && storage) {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {
      /* ignore */
    }
  }

  return merged;
};

export const getStoredTracking = (): TrackingParams => {
  const storage = safeStorage();
  if (!storage) return {};
  try {
    const raw = storage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TrackingParams) : {};
  } catch {
    return {};
  }
};

export const resolveTracking = (search: URLSearchParams | string): TrackingParams => {
  const params = typeof search === "string" ? new URLSearchParams(search) : search;
  const stored = captureTracking(params);
  const out: TrackingParams = {};
  for (const key of KEYS) {
    const fromUrl = params.get(key);
    const v = (fromUrl && fromUrl.trim()) || stored[key] || undefined;
    if (v) out[key] = v;
  }
  return out;
};
