'use client';

import { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

interface SplinePageProps {
  url: string;
  cacheKey: string;
}

export default function SplinePage({
  url,
  cacheKey,
}: SplinePageProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem(
      `splineCached:${cacheKey}`
    );

    if (hasLoadedBefore) {
      setIsLoading(false);
    }
  }, [cacheKey]);

  const handleSplineLoad = () => {
    sessionStorage.setItem(
      `splineCached:${cacheKey}`,
      'true'
    );

    setIsLoading(false);
  };

  return (
    <main
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
      }}
    >
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        >
          Loading 3D Model...
        </div>
      )}

      <Spline
        scene={url}
        onLoad={handleSplineLoad}
      />
    </main>
  );
}