import React from "react";
import Image from "next/image";

const ImageViewPage = ({
  searchParams,
}: {
  searchParams: {
    imageUrl: string;
  };
}) => {
  const { imageUrl } = searchParams;
  console.log(imageUrl);
  imageUrl;
  return (
    <div className="h-screen w-screen bg-bg-gray relative">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="uploaded image"
          className="object-contain h-full w-full"
          fill
        />
      )}
    </div>
  );
};

export default ImageViewPage;
