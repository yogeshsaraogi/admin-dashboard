import React, { useState, useEffect, useMemo } from "react";
import "./DataTable.css";
import { FaTrash, FaEdit } from "react-icons/fa";
const DataTable = ({ data }) => {
  const itemsPerPage = 10;
  const [tableData, setTableData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedRowIndex, setEditedRowIndex] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
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
  };
  const openEditModal = (index) => {
    setEditModalOpen(true);
    setEditedRowIndex(index);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditedRowIndex(null);
  };

  const saveEditedData = (editedData) => {
    const newData = [...tableData];
    const editedIndex = (currentPage - 1) * itemsPerPage + editedRowIndex;
    newData[editedIndex] = editedData;
    setTableData(newData);
    closeEditModal();
  };

  const toggleRowSelection = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows((prev) => prev.filter((i) => i !== index));
    } else {
      setSelectedRows((prev) => [...prev, index]);
    }
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

  return (
    <div className="data-table-container">
      <div
        style={{ display: "flex", justifyContent: "end", marginBottom: "4px" }}
      >
        <FaTrash
          className="delete icon"
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
            <tr
              key={index}
              style={{
                backgroundColor: selectedRows.includes(index)
                  ? "#f2f2f2"
                  : "inherit",
              }}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(index)}
                  onChange={() => toggleRowSelection(index)}
                />
              </td>
              <td>{row?.id}</td>
              <td>{row?.name}</td>
              <td>{row?.email}</td>
              <td>{row?.role}</td>
              <td>
                <FaTrash
                  className="delete icon"
                  style={{ color: "red" }}
                  onClick={() => deleteData(index)}
                />
                <FaEdit
                  className="edit icon"
                  style={{ color: "blue", marginLeft: "6px" }}
                  onClick={() => openEditModal(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <button
          className="pagination-button"
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
          className="pagination-button"
          onClick={() =>
            handlePageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
      {/* {isEditModalOpen && editedRowIndex!=null && (
        <EditModal
          rowData={tableData[(currentPage - 1) * itemsPerPage + editedRowIndex]}
          onSave={saveEditedData}
          onClose={closeEditModal}
        />
      )} */}
    </div>
  );
};

export default DataTable;
