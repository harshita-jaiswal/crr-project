import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {API_BASEURL, SPLIT_BILL} from "../../utils/url"
import {buildTable} from "../../utils/CommonFunctions";

/**
 * Renders page where users can individually select item they contributed.
 * This contribution data is sent to backend.
 * @return {JSX.Element}
 * @constructor
 */
function Selection() {
    const [tableData, setTableData] = useState([]);
    const [personsList, setPersonsList] = useState([]);
    const [currentIndividual, setCurrentIndividual] = useState(null);
    const [selectionData, setSelectionData] = useState({});
    const history = useHistory();

    const getTotalBillAmount = () => {
        let total = 0;
        const currency = /[^0-9.-]/gm;
        tableData.forEach((item) => {
            total = total + parseInt(item["value"].replace(currency, ""), 10); // price strings in data are with $
        });
        return total;
    };

    const getColumnHeadings = () => {
        let columnHeadings = [];
        for (const [heading] of Object.entries(tableData[0])) { //keys of any entry object in data array are column headings
            columnHeadings.push(heading.toLocaleUpperCase());
        }
        currentIndividual && columnHeadings.push("Is In?"); //last column, to indicate if user is considered in contribution of the item.
        return columnHeadings;
    };

    const buildColumns = () => {
        return getColumnHeadings().map((column, ind) => <th key={ind}>{column}</th>);
    };

    const buildSingleRow = (row) => {
        const singleRow = [];
        for (const value of Object.values(row)) {
            singleRow.push(<td>{value}</td>);
        }
        currentIndividual && //add tick box for 'is in?' column
        singleRow.push(
            <td>
                <input
                    onChange={(e) => onCheckboxChange(e, row.value)}
                    id={`${row.name}${currentIndividual}`}  //kind of unique id to store and retrieve from object
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
        return singleRow;
    };

    const buildRows = () => {
        return tableData.map((row, index) => <tr key={index}>{buildSingleRow(row)}</tr>);
    };

    const uploadSelectionData = (data) => {
        fetch(`${API_BASEURL}${SPLIT_BILL}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        })
            .then((data) => data.json())
            .then((data) => {
                localStorage.setItem("shares", JSON.stringify(data));
                history.push("/contributions");
            }).catch(error => {
            console.log("Error message", error);
        })
    }

    //needs to transform data in the format backend will accept
    const transformSelectionData = () => {
        const backendFormat = {
            totalPeopleInvolved: personsList,
            totalBillAmount: getTotalBillAmount(),
            data: [],
        };

        for (const [itemName, itemSelectionData] of Object.entries(selectionData)) {
            backendFormat.data.push({
                itemName,
                people_involved: itemSelectionData["people_involved"],
                price: itemSelectionData["price"],
                people_count: itemSelectionData["people_involved"].length,
            });
        }

        uploadSelectionData(backendFormat)
    };

    const onIndividualChange = (e) => {
        setCurrentIndividual(e.target.value);
    };

    const onCheckboxChange = (e, value) => {
        let data = Object.assign({}, selectionData);
        const {name, checked} = e.target;
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
                price: value,
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
                className="card bg-card mx-4 mx-md-5 shadow-5-strong"
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
                        {tableData.length && buildTable(buildColumns(), buildRows())}
                        <div className="row mt-3">
                            <div className="col">
                                <button
                                    className="btn btn-info btn-sml"
                                    onClick={transformSelectionData}
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
