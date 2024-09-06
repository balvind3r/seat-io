"use client";
import React from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { useUploadContext } from "./UploadContext";

export function Upload() {
  const { handleFileUpload, status } = useUploadContext();

  // Updated to accept a single file
  const handleChange = (file: File) => {
    if (file) {
      handleFileUpload(file); // Only handle the single file
    } else {
      console.log("No file selected.");
    }
  };

  return (
    <div className="w-fit max-w-4xl mx-auto h-fit border border-dashed bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleChange} /> {/* Updated prop */}
      {/* Display status messages based on the current status */}
      <div className="mb-4 flex flex-row items-center justify-center">
        {status === 0 && <p>No file uploaded yet.</p>}
        {status === 1 && <p>File uploaded, parsing...</p>}
        {status === 2 && <p className="text-red">Invalid file. Please upload a valid file.</p>}
        {status === 3 && <p className="text-green-500">Success! File parsed successfully.</p>}
      </div>
    </div>
  );
}
