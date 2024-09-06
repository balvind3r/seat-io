"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import * as XLSX from "xlsx";
import { useUploadContext } from "./UploadContext";

// Define a type for the table row
type TableRow = {
  id: number;
  roomName: string;
  seats: number;
};

type TableContextType = {
  rows: TableRow[];
  addRow: () => void;
  deleteRow: (id: number) => void;
  duplicateRow: (id: number) => void;
  reorderRow: (id: number, direction: "up" | "down") => void;
  setRoomName: (id: number, name: string) => void;
  setSeats: (id: number, seats: number) => void;
  totalSeats: number;
  exportToCSV: () => void;
  exporting: boolean;
};

// Create context
const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { parsedData, file } = useUploadContext();
  const [rows, setRows] = useState<TableRow[]>([
    { id: 1, roomName: "Room No", seats: 0 },
  ]);
  const [exporting, setExporting] = useState(false);

  const addRow = () => {
    const newRow: TableRow = {
      id: rows.length ? rows[rows.length - 1].id + 1 : 1,
      roomName: "Room No",
      seats: 0,
    };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const deleteRow = (id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const duplicateRow = (id: number) => {
    const rowToDuplicate = rows.find((row) => row.id === id);
    if (rowToDuplicate) {
      const duplicatedRow = { ...rowToDuplicate, id: rows.length ? rows[rows.length - 1].id + 1 : 1 };
      setRows((prevRows) => [...prevRows, duplicatedRow]);
    }
  };

  const reorderRow = (id: number, direction: "up" | "down") => {
    const index = rows.findIndex((row) => row.id === id);
    if (index < 0) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= rows.length) return;

    const newRows = [...rows];
    const [movedRow] = newRows.splice(index, 1);
    newRows.splice(newIndex, 0, movedRow);

    setRows(newRows);
  };

  const setRoomName = (id: number, name: string) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, roomName: name } : row))
    );
  };

  const setSeats = (id: number, seats: number) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, seats } : row))
    );
  };

  const totalSeats = rows.reduce((sum, row) => sum + row.seats, 0);

  const exportToCSV = () => {
    setExporting(true);
  
    const dataWithRooms = parsedData.map((item, index) => {
      const row = rows.find((_, i) => i === Math.floor(index / (parsedData.length / rows.length)));
      return { ...item, Room: row?.roomName || "" };
    });
  
    const worksheet = XLSX.utils.json_to_sheet(dataWithRooms.map(({ ...rest }) => rest));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Seats");
    if (file) {
      XLSX.writeFile(workbook, `Seat.io_${file.name}.xlsx`);
    }
  
    setExporting(false);
  };

  return (
    <TableContext.Provider
      value={{
        rows,
        addRow,
        deleteRow,
        duplicateRow,
        reorderRow,
        setRoomName,
        setSeats,
        totalSeats,
        exportToCSV,
        exporting,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};
