/* eslint-disable react/no-unescaped-entities */
import { convertFileToUrl } from "@/lib/utils";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
}

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="uploaded-file"
          className="object-cover max-h-[400px] overflow-hidden"
        />
      ) : (
        <>
          <Image
            src={"/assets/icons/upload.svg"}
            height={40}
            width={40}
            alt="upload-icon"
          />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-green-500">Click to Upload!</span> or drag &
              drop!
            </p>
            <p>SVG, PNG, JPG, or Gif ( max 800 x 400 )</p>
          </div>
        </>
      )}
      {/* {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )} */}
    </div>
  );
};

export default FileUploader;
