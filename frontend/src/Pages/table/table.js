import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../../img/bill.jpg";
function TablePage() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rows, setRows] = useState([]);
  const [col, setCol] = useState([]);
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("tableData"));
    setData(data);
    setIsLoaded(true);
    // fetch("https://jsonplaceholder.typicode.com/todos/1")
    // .then(res => res.json())
    // .then(
    //     (result) => {
    //         setIsLoaded(true);
    //         localStorage.setItem('tableData', JSON.stringify(result))
    //         setData(result);
    //     },
    //     (error) => {
    //         setIsLoaded(true);
    //         setData('error');
    //     }
    // )
  }, []);

  const getColumns = () => {
    let temp = [];
    for (const [key, value] of Object.entries(data[0])) {
      temp.push(key.toLocaleUpperCase());
    }
    return temp;
  };

  const buildColumns = () => {
    return getColumns().map((column) => <th>{column}</th>);
  };

  const buildSingleRow = (row) => {
    let temp = [];
    for (const [key, value] of Object.entries(row)) {
      temp.push(<td>{value}</td>);
    }
    return temp;
  };

  const buildRows = () => {
    let temp = [];
    data.forEach((row = {}, index) => {
      temp.push(<tr>{buildSingleRow(row)}</tr>);
    });
    return temp;
  };

  const buildTable = () => {
    return (
      <table>
        <tr>{buildColumns()}</tr>
        {buildRows()}
      </table>
    );
  };

  return (
    // <div className="container justify-content-center">
    //   <h3>Review your purchases</h3>
    //   <div>
    //     {!isLoaded && <p>...Loading</p>}
    //     {isLoaded && buildTable()}
    //   </div>
    //   <Link to={"selection"}>
    //     <button>Done!</button>
    //   </Link>
    // </div>
    <section className="text-center">
      <div
        className="p-5 bg-image img-fluid"
        style={{
          backgroundImage: `url(${image})`,
          height: "500px",
        }}></div>
      <div
        className="card mx-4 mx-md-5 shadow-5-strong"
        style={{
          marginTop: "-400px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
        }}>
        <div className="card-body py-5 px-md-5">
          <div className="row d-flex justify-content-center">
            <h3>Review your purchases</h3>
            <div className="row d-flex justify-content-center">
              {!isLoaded && <p>...Loading</p>}
              {isLoaded && buildTable()}
            </div>
            <div className="row mt-3">
              <div className="buttonTable">
                <Link to={"upload"}>
                  <button className="btn btn-info btn-sml">{`< Retry`}</button>
                </Link>
                <Link to={"selection"}>
                  <button className="btn btn-info btn-sml">{`Done! >`}</button>
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
