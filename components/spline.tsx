"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore, Component, ReactNode } from "react";
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

class SplineErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
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

function useIsSplineCached(cacheKey: string) {
  return useSyncExternalStore(
    emptySubscribe,
    () => {
      try {
        return sessionStorage.getItem(`splineCached:${cacheKey}`) === "true";
      } catch {
        return false;
      }
    },
    () => false,
  );
}

export function SplineBackground({
  url,
  cacheKey,
  className = "",
}: SplineItemProps) {
  const isMounted = useIsMounted();
  const isCached = useIsSplineCached(cacheKey);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isLoading = !isCached && !isLoaded && !hasError;

  const handleSplineLoad = () => {
    try {
      sessionStorage.setItem(`splineCached:${cacheKey}`, "true");
    } catch {
      // ignore storage error
    }
    setIsLoaded(true);
  };

  const handleSplineError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div
      className={`fixed inset-0 z-0 w-full h-full pointer-events-none overflow-hidden ${className}`}
    >
      {(!isMounted || isLoading) && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-sm opacity-60">
          Loading 3D Background...
        </div>
      )}
      {hasError && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-xs opacity-40">
          Unable to load 3D Background
        </div>
      )}
      {isMounted && !hasError && (
        <SplineErrorBoundary onError={handleSplineError}>
          <Spline scene={url} onLoad={handleSplineLoad} onError={handleSplineError} />
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
  const isCached = useIsSplineCached(cacheKey);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isLoading = !isCached && !isLoaded && !hasError;

  // Mouse tracking targets
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

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

  const handleSplineLoad = () => {
    try {
      sessionStorage.setItem(`splineCached:${cacheKey}`, "true");
    } catch {
      // ignore storage error
    }
    setIsLoaded(true);
  };

  const handleSplineError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-10 w-full h-full pointer-events-none overflow-hidden will-change-transform ${className}`}
      onWheel={(e) => e.preventDefault()}
    >
      {(!isMounted || isLoading) && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-sm opacity-60">
          Loading Drone...
        </div>
      )}
      {isMounted && !hasError && (
        <SplineErrorBoundary onError={handleSplineError}>
          <Spline scene={url} onLoad={handleSplineLoad} onError={handleSplineError} />
        </SplineErrorBoundary>
      )}
    </div>
  );
}

export default function SplinePage({ url, cacheKey }: SplineItemProps) {
  return <SplineBackground url={url} cacheKey={cacheKey} />;
}

