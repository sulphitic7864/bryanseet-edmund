"use client";

import { useEffect, useState } from "react";

type SafeImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  wrapperClassName?: string;
};

export default function SafeImage({
  src,
  alt,
  className,
  wrapperClassName,
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src?.trim() || failed) {
    return null;
  }

  return (
    <div className={wrapperClassName}>
      {/* Use native loading so empty and broken URLs can be hidden consistently. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
