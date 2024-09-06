"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import * as XLSX from "xlsx"; // Ensure you have this library installed

// Define a type for the parsed data
type ParsedDataType = { [key: string]: any }[];

// Define a type for the context state
type UploadContextType = {
  file: File | null;
  status: number; // 0: No file, 1: File uploaded, parsing, 2: Invalid file, 3: Success!
  handleFileUpload: (file: File) => void;
  parseFile: (file: File) => Promise<void>;
  parsedData: ParsedDataType; // State to store parsed data
};

// Create the context with an initial value of undefined
const UploadContext = createContext<UploadContextType | undefined>(undefined);

// Create a provider component
export const UploadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [parsedData, setParsedData] = useState<ParsedDataType>([]); // Initialize parsedData state

  const handleFileUpload = async (file: File) => {
    setFile(file);
    setStatus(1);
    try {
      await parseFile(file);
    } catch (error) {
      console.log("Invalid file");
      setFile(null); // Reset file on error
      setStatus(2);
    }
  };

  const parseFile = async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData: ParsedDataType = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        // Check if data exists and file is valid
        if (!jsonData.length || (file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && file.type !== "application/vnd.ms-excel")) {
          setParsedData([]);
          setFile(null);
          setStatus(2); // Invalid file
          reject("Invalid file format or empty file");
        } else {
          // Add ID to each entry
          const dataWithId = jsonData.map((item, index) => ({ id: index + 1, ...item, Room:"" }));
          setParsedData(dataWithId); // Store the extracted JSON data
          setStatus(3); // Parsing success
          console.log(dataWithId);
          
          resolve();
        }
      };

      reader.onerror = () => {
        setParsedData([]);
        setFile(null);
        setStatus(2); // Invalid file
        reject("File reading failed");
      };

      reader.readAsArrayBuffer(file); // Updated to use readAsArrayBuffer
    });
  };

  return (
    <UploadContext.Provider value={{ file, status, handleFileUpload, parseFile, parsedData }}>
      {children}
    </UploadContext.Provider>
  );
};

// Create a custom hook to use the UploadContext
export const useUploadContext = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUploadContext must be used within an UploadProvider");
  }
  return context;
};
