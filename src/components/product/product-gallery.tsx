"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] || "");

  return (
    <div className="flex flex-col gap-4">
      {/* Imagem Principal */}
      <div className="relative aspect-square w-full rounded-lg bg-neutral-100 overflow-hidden border">
        <Image
          src={selectedImage}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Miniaturas (Thumbnails) */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img)}
              className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                selectedImage === img
                  ? "border-neutral-900 ring-2 ring-neutral-900/20"
                  : "border-neutral-200 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${title} view ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}