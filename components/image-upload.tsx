import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

const ImageUpload: FC<ImageUploadProps> = ({ value, onChange, disabled }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <CldUploadButton
        options={{
          maxFiles: 1,
        }}
        uploadPreset="s7znvnwz"
        onUpload={(result: any) => onChange(result.info.secure_url)}
      >
        <div className="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transtion flex flex-col space-y-2 items-center">
          <div className="relative h-40 w-40">
            <Image
              fill
              alt="image"
              src={value || `/placeholder.svg`}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};

export default ImageUpload;
