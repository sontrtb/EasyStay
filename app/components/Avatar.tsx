"use client";

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
  variant?: "default" | "medium" | "large";
}

const Avatar: React.FC<AvatarProps> = ({ src, variant = "default" }) => {
  let size = 30;
  if (variant === "large") {
    size = 80;
  }
  return (
    <Image
      className="rounded-full"
      height={size}
      width={size}
      alt="Avatar"
      src={src || "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
