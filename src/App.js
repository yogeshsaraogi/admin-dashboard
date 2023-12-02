import { SearchBar } from "./components/SearchBar";
import "./App.css";
import { useEffect, useState } from "react";
import DataTable from "./components/DataTable";

function App() {
  const [results, setResults] = useState(null);
  useEffect(() => {
    const url = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      })
      .catch((erro) => {
        setResults(null);
      });
  }, []);

  return (
    <div className="App">
      <div className="search-bar-container">
        <div className="search-filter">
          <SearchBar setResults={setResults} />
        </div>
        {results != null ? <DataTable data={results} /> : <div>Loading...</div>}
      </div>
    </div>
  );
}

export default App;
