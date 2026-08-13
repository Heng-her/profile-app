"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useSyncExternalStore,
  Component,
  ReactNode,
} from "react";
import Spline from "@splinetool/react-spline";

interface SplineItemProps {
  url: string;
  cacheKey: string;
  className?: string;
}

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
  onError?: (error: Error) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SplineErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

// ----------------------------------------------------
// IndexedDB Cache Storage Engine for 3D Spline Binary Files
// ----------------------------------------------------
const DB_NAME = "SplineCacheDB";
const STORE_NAME = "spline_scenes";

function openSplineDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB not supported"));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getCachedSplineBlob(cacheKey: string): Promise<Blob | null> {
  try {
    const db = await openSplineDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(cacheKey);
      req.onsuccess = () => {
        if (req.result instanceof Blob) {
          resolve(req.result);
        } else if (req.result instanceof ArrayBuffer) {
          resolve(new Blob([req.result], { type: "application/octet-stream" }));
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

async function setCachedSplineBlob(
  cacheKey: string,
  blob: Blob,
): Promise<void> {
  try {
    const db = await openSplineDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(blob, cacheKey);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  } catch {
    // Ignore storage quota or disabled error
  }
}

// Custom React Hook to load and cache Spline scene in IndexedDB
function useSplineCachedScene(
  url: string,
  cacheKey: string,
  isMounted: boolean,
) {
  const [sceneUrl, setSceneUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!isMounted) return;

    let active = true;
    let createdBlobUrl: string | null = null;
    const controller = new AbortController();

    const loadScene = async () => {
      try {
        // 1. Try reading binary Blob from IndexedDB first
        const cachedBlob = await getCachedSplineBlob(cacheKey);
        if (cachedBlob && active) {
          createdBlobUrl = URL.createObjectURL(cachedBlob);
          setSceneUrl(createdBlobUrl);
          setIsLoading(false);
          return;
        }

        // 2. If not in IndexedDB, fetch remote file with 10s timeout
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const blob = await response.blob();
        if (!active) return;

        // Save to IndexedDB for instant future reloads
        await setCachedSplineBlob(cacheKey, blob);

        createdBlobUrl = URL.createObjectURL(blob);
        setSceneUrl(createdBlobUrl);
        setIsLoading(false);
      } catch (err: unknown) {
        if (!active) return;
        // Suppress abort errors on unmount
        if (err instanceof Error && err.name === "AbortError") return;
        setHasError(true);
        setIsLoading(false);
      }
    };

    loadScene();

    return () => {
      active = false;
      controller.abort();
      if (createdBlobUrl) {
        URL.revokeObjectURL(createdBlobUrl);
      }
    };
  }, [url, cacheKey, isMounted]);

  return { sceneUrl, isLoading, hasError, setHasError };
}

export function SplineBackground({
  url,
  cacheKey,
  className = "",
}: SplineItemProps) {
  const isMounted = useIsMounted();
  const { sceneUrl, isLoading, hasError, setHasError } = useSplineCachedScene(
    url,
    cacheKey,
    isMounted,
  );

  // Suppress Next.js dev overlay for any unhandled rejections
  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      const msg = String(event.reason?.message || event.reason || "");
      if (msg.includes("fetch") || msg.includes("Failed to fetch")) {
        event.preventDefault();
        setHasError(true);
      }
    };
    window.addEventListener("unhandledrejection", handleRejection);
    return () =>
      window.removeEventListener("unhandledrejection", handleRejection);
  }, [setHasError]);

  return (
    <div
      className={`fixed inset-0 z-0 w-full h-full pointer-events-none overflow-hidden ${className}`}
    >
      {(!isMounted || isLoading) && !hasError && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-sm opacity-60">
          Loading 3D Background...
        </div>
      )}
      {hasError && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-xs opacity-30">
          3D Background unavailable
        </div>
      )}
      {isMounted && sceneUrl && !hasError && (
        <SplineErrorBoundary onError={() => setHasError(true)}>
          <Spline scene={sceneUrl} onError={() => setHasError(true)} />
        </SplineErrorBoundary>
      )}
    </div>
  );
}

interface SplineDroneProps extends SplineItemProps {
  scale?: number;
}

export function SplineDrone({
  url,
  cacheKey,
  className = "",
  scale = 0.6,
}: SplineDroneProps) {
  const isMounted = useIsMounted();
  const { sceneUrl, isLoading, hasError, setHasError } = useSplineCachedScene(
    url,
    cacheKey,
    isMounted,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking targets
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  // Suppress Next.js dev overlay for any unhandled rejections
  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      const msg = String(event.reason?.message || event.reason || "");
      if (msg.includes("fetch") || msg.includes("Failed to fetch")) {
        event.preventDefault();
        setHasError(true);
      }
    };
    window.addEventListener("unhandledrejection", handleRejection);
    return () =>
      window.removeEventListener("unhandledrejection", handleRejection);
  }, [setHasError]);

  useEffect(() => {
    if (!isMounted || hasError) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate position relative to window center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Range scaled for pleasant drone offset (-60px to +60px translation)
      targetPos.current.x = (e.clientX - centerX) * 0.15;
      targetPos.current.y = (e.clientY - centerY) * 0.15;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const animate = () => {
      // Smooth lerp (linear interpolation) towards cursor position
      currentPos.current.x +=
        (targetPos.current.x - currentPos.current.x) * 0.06;
      currentPos.current.y +=
        (targetPos.current.y - currentPos.current.y) * 0.06;

      if (containerRef.current) {
        const tiltX = currentPos.current.y * -0.15;
        const tiltY = currentPos.current.x * 0.15;
        containerRef.current.style.transform = `scale(${scale}) translate3d(${currentPos.current.x.toFixed(2)}px, ${currentPos.current.y.toFixed(2)}px, 0px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMounted, scale, hasError]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-10 w-full h-full pointer-events-none overflow-hidden will-change-transform ${className}`}
      onWheel={(e) => e.preventDefault()}
    >
      {(!isMounted || isLoading) && !hasError && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-sm opacity-60">
          Loading Drone...
        </div>
      )}
      {isMounted && sceneUrl && !hasError && (
        <SplineErrorBoundary onError={() => setHasError(true)}>
          <Spline scene={sceneUrl} onError={() => setHasError(true)} />
        </SplineErrorBoundary>
      )}
    </div>
  );
}

export default function SplinePage({ url, cacheKey }: SplineItemProps) {
  return <SplineBackground url={url} cacheKey={cacheKey} />;
}
