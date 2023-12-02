import React, { useState, useEffect, useMemo } from "react";
import "./DataTable.css";
import { MdDeleteForever } from "react-icons/md";
import Rowdata from "./Rowdata";

const DataTable = ({ data }) => {
  const itemsPerPage = 10;
  const [tableData, setTableData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [editableRows, setEditableRows] = useState([]);
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  useMemo(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayData(tableData.slice(startIndex, endIndex));
  }, [tableData, currentPage]);

  useEffect(() => {
    const allRowsSelected =
      displayData.length > 0 && selectedRows.length === displayData.length;
    setSelectAllChecked(allRowsSelected);
  }, [selectedRows, displayData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSelectedRows([]);
    setEditableRows([]);
  };

  const handleFirstPage = () => {
    handlePageChange(1);
  };

  const handleLastPage = () => {
    handlePageChange(totalPages);
  };

  const deleteData = (index) => {
    const newData = [...tableData];
    newData.splice((currentPage - 1) * itemsPerPage + index, 1);
    setTableData(newData);
  };
  const deleteAll = () => {
    const newData = tableData.filter(
      (_, index) => !selectedRows.includes(index)
    );
    setTableData(newData);
    setSelectedRows([]);
    setEditableRows([]);
  };

  const toggleRowSelection = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows((prev) => prev.filter((i) => i !== index));
    } else {
      setSelectedRows((prev) => [...prev, index]);
    }
    setEditableRows([]);
  };

  const handleSelectAllChange = () => {
    if (selectAllChecked) {
      setSelectedRows([]);
    } else {
      const allRows = Array.from({ length: displayData.length }, (_, i) => i);
      setSelectedRows(allRows);
    }
    setSelectAllChecked(!selectAllChecked);
  };

  const toggleEditMode = (index) => {
    if (editableRows.includes(index)) {
      setEditableRows((prev) =>
        prev.filter((editableIndex) => editableIndex !== index)
      );
    } else {
      setEditableRows((prev) => [...prev, index]);
    }
  };

  const isRowEditable = (index) => editableRows.includes(index);
  const saveEditedData = (editedData, editedIndex) => {
    console.log("editable");
    const newData = [...tableData];
    const dataIndex = (currentPage - 1) * itemsPerPage + editedIndex;
    newData[dataIndex] = editedData;
    setTableData(newData);
    setEditableRows((prev) =>
      prev.filter((editableIndex) => editableIndex !== editedIndex)
    );
  };
  return (
    <div className="data-table-container">
      <div
        style={{ display: "flex", justifyContent: "end", marginBottom: "4px" }}
      >
        <MdDeleteForever
          className="delete icon"
          fontSize={"24"}
          style={{ color: "red" }}
          onClick={() => deleteAll()}
        />
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAllChecked}
                onChange={handleSelectAllChange}
              />
            </th>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((row, index) => (
            <Rowdata
              row={row}
              index={index}
              selectedRows={selectedRows}
              toggleRowSelection={toggleRowSelection}
              isRowEditable={isRowEditable}
              saveEditedData={saveEditedData}
              toggleEditMode={toggleEditMode}
              deleteData={deleteData}
            />
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <button
          className="first-page pagination-button"
          onClick={handleFirstPage}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          className="previous-page pagination-button"
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
          }
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
        </span>
        <button
          className="next-page pagination-button"
          onClick={() =>
            handlePageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
        <button
          className="last-page pagination-button"
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default DataTable;
