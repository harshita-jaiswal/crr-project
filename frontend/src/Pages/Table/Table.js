import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Renders a detailed table of purchased items.
 * Data is retrieved from local storage.
 * @returns {JSX.Element}
 */
function TablePage() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load data from local storage
    const storedData = JSON.parse(localStorage.getItem("tableData"));
    setData(storedData);
    setIsLoaded(true);
  }, []);

    const getColumnHeadings = () => {
        let columnHeadings = [];
        for (const [heading] of Object.entries(data[0])) { //keys of any entry object in data array are column headings
            columnHeadings.push(heading.toLocaleUpperCase());
        }
        return columnHeadings;
    };

  const buildColumns = () => {
    return getColumnHeadings().map((column, i) => <th key={i}>{column}</th>);
  };

  const buildSingleRow = (row) => {
    return Object.values(row).map((value, i) => <td key={i}>{value}</td>);
  };

  const buildRows = () => {
    return data.map((row, index) => <tr key={index}>{buildSingleRow(row)}</tr>);
  };

  const buildTable = () => {
    return (
        <table>
          <thead>
          <tr>{buildColumns()}</tr>
          </thead>
          <tbody>{buildRows()}</tbody>
        </table>
    );
  };

  return (
      <section className="text-center">
        <div
            className="card mx-4 mx-md-5 shadow-5-strong"
            style={{
              marginTop: "-400px",
              background: "hsla(0, 0%, 100%, 0.8)",
              backdropFilter: "blur(30px)",
            }}
        >
          <div className="card-body py-5 px-md-5">
            <div className="row d-flex justify-content-center">
              <h3>Review Your Purchases</h3>
              <div className="row d-flex justify-content-center">
                {!isLoaded && <p>Loading...</p>}
                {isLoaded && buildTable()}
              </div>
              <div className="row mt-3">
                <div className="buttonTable">
                  <Link to="upload">
                    <button className="btn btn-info btn-sml">&lt; Retry</button>
                  </Link>
                  <Link to="selection">
                    <button className="btn btn-info btn-sml">Done! &gt;</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default TablePage;
