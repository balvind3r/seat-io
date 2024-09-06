"use client";
import React from "react";
import { useTableContext } from "./TableContextCopy";
import { useUploadContext } from "./UploadContext";

export function Tabular() {
  const {
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
  } = useTableContext();

  const handleRoomNameChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(id, event.target.value);
  };

  const handleSeatsChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const seats = parseInt(event.target.value, 10) || 0;
    setSeats(id, seats);
  };
  const { parsedData } = useUploadContext();

  return (
    <div className="table-container bg-[#171717] p-4">
      <table className="w-full text-white">
        <thead>
          <tr>
            <th>S.No</th>
            <th className="hidden lg:table-cell">Room No</th>
            <th className="hidden lg:table-cell">Seats</th>
            <th className="lg:hidden">Details</th>
            <th>Reorder</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td className="hidden lg:table-cell">
                <input
                  type="text"
                  value={row.roomName}
                  onChange={(e) => handleRoomNameChange(row.id, e)}
                  className="bg-transparent border-b border-gray-600 text-white"
                />
              </td>
              <td className="hidden lg:table-cell">
                <input
                  type="number"
                  value={row.seats}
                  onChange={(e) => handleSeatsChange(row.id, e)}
                  className="bg-transparent border-b border-gray-600 text-white"
                />
              </td>
              <td className="lg:hidden">
                <input
                  type="text"
                  value={row.roomName}
                  onChange={(e) => handleRoomNameChange(row.id, e)}
                  className="bg-transparent border-b border-gray-600 text-white"
                />
                <input
                  type="number"
                  value={row.seats}
                  onChange={(e) => handleSeatsChange(row.id, e)}
                  className="bg-transparent border-b border-gray-600 text-white mt-2"
                />
              </td>
              <td>
                <div className="flex lg:flex-row flex-col">
                  <div onClick={() => reorderRow(row.id, "up")}>
                    {/* Add up arrow image here */}
                  </div>
                  <div onClick={() => reorderRow(row.id, "down")}>
                    {/* Add down arrow image here */}
                  </div>
                </div>
              </td>
              <td>
                <div className="flex lg:flex-row flex-col">
                  <div onClick={() => duplicateRow(row.id)}>
                    {/* Add duplicate image here */}
                  </div>
                  <div onClick={() => deleteRow(row.id)}>
                    {/* Add delete image here */}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button onClick={addRow} className="bg-gray-800 text-white px-4 py-2 rounded">
          Add Room
        </button>
        <button
          onClick={exportToCSV}
          disabled={exporting}
          className={`px-4 py-2 rounded ${exporting ? "bg-gray-600" : "bg-gray-800 text-white"}`}
        >
          {exporting ? "Exporting..." : "Export CSV"}
        </button>
      </div>
      <p className={`mt-4 ${totalSeats < parsedData.length ? "text-red-500" : "text-white"}`}>
        Seated {totalSeats}/{parsedData.length}
      </p>
    </div>
  );
}
