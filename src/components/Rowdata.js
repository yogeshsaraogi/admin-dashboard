import React, { useState } from "react";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";

const Rowdata = ({
  row,
  index,
  selectedRows,
  toggleRowSelection,
  isRowEditable,
  saveEditedData,
  toggleEditMode,
  deleteData,
}) => {
  const [data, setData] = useState(row);
  const handleEditChange = (currValue, type) => {
    const newData = { ...data, [type]: currValue };
    setData(newData);
  };

  return (
    <>
      <tr key={index}>
        <td 
          style={{
            backgroundColor: selectedRows.includes(index) ? "#fff" : "inherit",
          }}
        >
          <input
            type="checkbox"
            checked={selectedRows.includes(index)}
            onChange={() => toggleRowSelection(index)}
          />
        </td>
        <td
          style={{
            backgroundColor: selectedRows.includes(index) ? "#fff" : "inherit",
          }}
        >
          {row?.id}
        </td>
        <td
          style={{
            backgroundColor: selectedRows.includes(index) ? "#fff" : "inherit",
          }}
        >
          {isRowEditable(index) ? (
            <input
              type="text"
              value={data?.name}
              onChange={(e) => handleEditChange(e.target.value, "name")}
            />
          ) : (
            row?.name
          )}
        </td>
        <td
          style={{
            backgroundColor: selectedRows.includes(index) ? "#fff" : "inherit",
          }}
        >
          {isRowEditable(index) ? (
            <input
              type="text"
              value={data?.email}
              onChange={(e) => handleEditChange(e.target.value, "email")}
            />
          ) : (
            row?.email
          )}
        </td>
        <td
          style={{
            backgroundColor: selectedRows.includes(index) ? "#fff" : "inherit",
          }}
        >
          {isRowEditable(index) ? (
            <input
              type="text"
              value={data?.role}
              onChange={(e) => handleEditChange(e.target.value, "role")}
            />
          ) : (
            row?.role
          )}
        </td>
        <td
          style={{
            backgroundColor: selectedRows.includes(index) ? "#fff" : "inherit",
          }}
        >
          {isRowEditable(index) ? (
            <>
              <FaSave
                className="save icon"
                style={{ color: "green", marginLeft: "8px" }}
                onClick={() => saveEditedData(data, index)}
              />
              <FaTimes
                className="cancel icon"
                style={{ color: "red", marginLeft: "8px" }}
                onClick={() => toggleEditMode(index)}
              />
            </>
          ) : (
            <>
              <FaTrash
                className="delete icon"
                style={{ color: "red" }}
                onClick={() => deleteData(index)}
              />
              <FaEdit
                className="edit icon"
                style={{ color: "blue", marginLeft: "8px" }}
                onClick={() => toggleEditMode(index)}
              />
            </>
          )}
        </td>
      </tr>
    </>
  );
};
export default Rowdata;
