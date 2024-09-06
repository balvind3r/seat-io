"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import * as XLSX from "xlsx";
import { useUploadContext } from "./UploadContext";

// Define a type for the table row
type ReorderDirection = 'up' | 'down';

type ReorderAction = {
  id: number;
  direction: ReorderDirection;
};

type ActionRole = "Delete" | "Duplicate";

type Action = {
    id: number;
    role: ActionRole;
};

type TableRow = {
  id: number; // Unique identifier for each row
  roomName: string; // Default: "Room No"
  seats: number | "Seats"; // Default: "Seats"
  Reorder: ReorderAction[]; // List of Reordering options
  Actions: Action[]; // List of actions associated with the row
};

type TableContextType = {
    TableData: TableRow[];
    reorderRow: (id:number, direction: "up" | "down") => void;
    duplicateRow: (id: number) => void;
    deleteRow: (id: number) => void;
    addRow: () => void;
    setRoomName: (id: number, name: string) => void;
    setSeats: (id: number, seats: number | "Seats") => void;  
    totalSeats: number;
    exportToCSV: () => void;
    exporting: boolean;
}

// Create context
const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider: React.FC<{ children:ReactNode }> = ({ children }) => {
    const { parsedData, file } = useUploadContext();
    let room_id = 1;
    const defaultReorder: ReorderAction[] = [
        {
            id: 1,
            direction: "up"
        },
        {
            id: 1,
            direction: "down"
        }
    ]
    const defualtActions: Action[] =[
        {
            id: 1,
            role: "Delete",
        },
        {
            id: 1,
            role: "Duplicate",
        }
    ]
    const [TableData, setTableData] = useState<TableRow[]>([
        {
            id: room_id,
            roomName: "Room No",
            seats: "Seats",
            Reorder: defaultReorder.map((reorder) => ({ ...reorder, id: room_id })),
            Actions: defualtActions.map((action) => ({ ...action, id: room_id })),
        }
    ]);
    
   
    return (
        <>
        </>        
    )
    
}



// const addRow = () => {
//     const newId = TableData.length + 1;
//     const newRow: TableRow = {
//         id: newId,
//         roomName: "Room No",
//         seats: "Seats",
//         Reorder: defaultReorder.map((reorder) => ({ ...reorder, id: newId })),
//         Actions: defualtActions.map((action) => ({ ...action, id: newId })),
//     };
//     setTableData([...TableData, newRow]);
// };