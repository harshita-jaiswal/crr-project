import React, { useEffect, useState } from "react";
import image from "../../img/bill.jpg";
import { useHistory } from "react-router";

function Selection(props) {
  const [tableData, setTableData] = useState([]);
  const [personsList, setPersonsList] = useState([]);
  const [currentIndividual, setCurrentIndividual] = useState(null);
  const [selectionData, setSelectionData] = useState({});
  let history = useHistory();
  const getTotalBillAmount = () => {
    let total = 0;
    let regexcurrency = /[^0-9.-]/gm;
    tableData.forEach((item) => {
      total = total + parseInt(item["value"].replace(regexcurrency, ""), 10);
    });
    return total;
  };

  const getColumns = () => {
    let temp = [];
    for (const [key, value] of Object.entries(tableData[0])) {
      temp.push(key.toLocaleUpperCase());
    }
    currentIndividual && temp.push("is in?");
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
    currentIndividual &&
      temp.push(
        <td>
          <input
            onChange={onCheckboxChange}
            id={`${row.name}${currentIndividual}`}
            name={row.name}
            data_total_value={row.value}
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
    let temp = [];
    tableData.forEach((row = {}, index) => {
      temp.push(<tr>{buildSingleRow(row)}</tr>);
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
    let temp = {
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

    console.log(temp);
    fetch("http://localhost:3001/clicknsplit/api/split-bill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(temp),
    })
      .then((data) => data.json())
      .then((data) => {
        localStorage.setItem("shares", JSON.stringify(data));
        history.push("/contri");
        console.log(data);
      });
  };

  const onIndividualChange = (e) => {
    setCurrentIndividual(e.target.value);
  };

  const onCheckboxChange = (e) => {
    let data = Object.assign({}, selectionData);
    const { name, checked } = e.target;
    const totalValue = e.target.getAttribute("data_total_value");
    if (data[name]) {
      console.log("old");
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
      // console.log('new');
      data[name] = {
        people_involved: [currentIndividual],
        price: totalValue,
      };
    }
    console.log(data);
    setSelectionData(data);
  };

  useEffect(() => {
    setTableData(JSON.parse(localStorage.getItem("tableData")));
    setPersonsList(JSON.parse(localStorage.getItem("personNames")));
  }, []);

  return (
    // <div>
    //     <p>Select the person from the dropdown and select tick mark in front of item if person has bought that
    //         item</p>
    //     <div>
    //         <select onChange={onIndividualChange} value={null}>
    //             <option value=""></option>
    //             {personsList.map(person => {
    //                 return <option value={person}>{person}</option>
    //             })}
    //         </select>
    //     </div>
    //     {tableData.length && buildTable()}
    //     {/*<Link to={'contri'}>*/}
    //     <button onClick={createFinalSelectionData}>
    //         Done
    //     </button>
    //     {/*</Link>*/}
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
          marginTop: "-450px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
        }}>
        <div className="card-body py-5 px-md-5">
          <div className="row d-flex justify-content-center">
            <p>
              Select the person from the dropdown and select tick mark in front
              of item if person has bought that item
            </p>
            <div className="d-flex align-content-end mb-3">
              <select onChange={onIndividualChange} value={null}>
                <option value=""></option>
                {personsList.map((person) => {
                  return <option value={person}>{person}</option>;
                })}
              </select>
            </div>
            {tableData.length && buildTable()}
            {/*<Link to={'contri'}>*/}
            <div className="row mt-3">
              <div className="col">
                <button
                  className="btn btn-info btn-sml"
                  onClick={createFinalSelectionData}>
                  Done
                </button>
                {/*</Link>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Selection;
