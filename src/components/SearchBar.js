import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const fetchData = (value) => {
    const url = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const results = value
          ? data.filter((user) => {
              return (
                user &&
                (user.name.toLowerCase().includes(value) ||
                  user.id.toLowerCase().includes(value) ||
                  user.email.toLowerCase().includes(value) ||
                  user.role.toLowerCase().includes(value))
              );
            })
          : data;
        setResults(results);
      });
  };
  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Search.."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
