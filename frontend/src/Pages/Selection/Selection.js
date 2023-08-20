import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { API_BASEURL, SPLIT_BILL } from "../../utils/url"

function Selection() {
  const [tableData, setTableData] = useState([]);
  const [personsList, setPersonsList] = useState([]);
  const [currentIndividual, setCurrentIndividual] = useState(null);
  const [selectionData, setSelectionData] = useState({});
  const history = useHistory();

  const getTotalBillAmount = () => {
    let total = 0;
    const regexcurrency = /[^0-9.-]/gm;
    tableData.forEach((item) => {
      total = total + parseInt(item["value"].replace(regexcurrency, ""), 10);
    });
    return total;
  };

  const getColumns = () => {
    const temp = [];
    for (const key of Object.keys(tableData[0])) {
      temp.push(key.toLocaleUpperCase());
    }
    currentIndividual && temp.push("is in?");
    return temp;
  };

  const buildColumns = () => {
    return getColumns().map((column, ind) => <th key={ind}>{column}</th>);
  };

  const buildSingleRow = (row) => {
    const temp = [];
    for (const value of Object.values(row)) {
      temp.push(<td>{value}</td>);
    }
    currentIndividual &&
      temp.push(
        <td>
          <input
            onChange={(e) => onCheckboxChange(e, row.value)}
            id={`${row.name}${currentIndividual}`}
            name={row.name}
            checked={
              !!selectionData?.[`${row.name}`]?.people_involved.includes(
                currentIndividual
              )
            }
            type="checkbox"
          />
        </td>
      );
    return temp;
  };

  const buildRows = () => {
    const temp = [];
    tableData.forEach((row = {}, index) => {
      temp.push(<tr key={index}>{buildSingleRow(row)}</tr>);
    });
    return temp;
  };

  const buildTable = () => {
    return (
      <table>
        <tr>{buildColumns()}</tr>
        <tbody>{buildRows()}</tbody>
      </table>
    );
  };

  const createFinalSelectionData = () => {
    const temp = {
      totalPeopleInvolved: personsList,
      totalBillAmount: getTotalBillAmount(),
      data: [],
    };

    for (const [itemName, itemSelectionData] of Object.entries(selectionData)) {
      temp.data.push({
        itemName,
        people_involved: itemSelectionData["people_involved"],
        price: itemSelectionData["price"],
        people_count: itemSelectionData["people_involved"].length,
      });
    }

    fetch(`${API_BASEURL}${SPLIT_BILL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(temp),
    })
      .then((data) => data.json())
      .then((data) => {
        localStorage.setItem("shares", JSON.stringify(data));
        history.push("/contributions");
      });
  };

  const onIndividualChange = (e) => {
    setCurrentIndividual(e.target.value);
  };

  const onCheckboxChange = (e, value) => {
    let data = Object.assign({}, selectionData);
    const { name, checked } = e.target;
    const totalValue = value;
    if (data[name]) {
      if (!checked) {
        //remove
        data[name].people_involved = data[name].people_involved.filter(
          (item) => item !== currentIndividual
        );
      } else {
        //add
        data[name].people_involved = [
          ...data[name].people_involved,
          currentIndividual,
        ];
      }
    } else {
      data[name] = {
        people_involved: [currentIndividual],
        price: totalValue,
      };
    }
    setSelectionData(data);
  };

  useEffect(() => {
    setTableData(JSON.parse(localStorage.getItem("tableData")));
    setPersonsList(JSON.parse(localStorage.getItem("contributorsName")));
  }, []);

  return (
    <section className="text-center">
      <div
        className="card mx-4 mx-md-5 shadow-5-strong"
        style={{
          marginTop: "-450px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
        }}
      >
        <div className="card-body py-5 px-md-5">
          <div className="row d-flex justify-content-center">
            <p>
              Select the person from the dropdown and select tick mark in front
              of item if person has bought that item
            </p>
            <div className="d-flex align-content-end mb-3">
              <select onChange={onIndividualChange} value={null}>
                <option value=""></option>
                {personsList.map((person, index) => {
                  return <option key={index} value={person}>{person}</option>;
                })}
              </select>
            </div>
            {tableData.length && buildTable()}
            <div className="row mt-3">
              <div className="col">
                <button
                  className="btn btn-info btn-sml"
                  onClick={createFinalSelectionData}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Selection;
