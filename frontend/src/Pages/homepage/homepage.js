import React, { useState } from "react";
import { Link } from "react-router-dom";

function Homepage() {
  const [contributorCount, setContributorCount] = useState(0);
  const [contributorName, setContributorName] = useState({});

  const onCountChange = (event) => {
    setContributorCount(event.target.value);
  };

  const onNameChange = (e, i) => {
    setContributorName((prevState) => {
      return { ...prevState, [i]: e.target.value };
    });
  };


  const buildInputBoxes = () => {
    let inputField = [];
    for (let i = 0; i < contributorCount; i++) {
      inputField.push(
        <div key={i} className="row">
          <span>{i + 1}</span>
          <input
            key={i}
            type="text"
            value={contributorName[i]}
            onChange={(e) => {
              onNameChange(e, i);
            }}
          />
        </div>
      );
    }
    return inputField;
  };

  const onSubmit = () => {
    let nameList = [];
    for (const name of Object.values(contributorName)) {
      nameList.push(name);
    }
    localStorage.setItem("contributorsName", JSON.stringify(nameList));
  };

  return (
    <section className="text-center">
      <div
        className="bg-card card mx-4 mx-md-5 shadow-5-strong"
      >
        <div className="card-body py-5 px-md-5">
          <div className="row d-flex justify-content-center">
            <div className="col-8">
                <label htmlFor="personNumber">Enter number of people involved in the transaction?</label>
            </div>
            <div className="col-4">
              <input type="number" onChange={onCountChange} />
            </div>
            {contributorCount > 0 && (
              <div className="row">
                <div className="col-6">
                  <p>Enter Persons name :</p>
                  {buildInputBoxes()}
                </div>
                <Link to={"upload"}>
                  <div className="col-6">
                    <button
                      className="btn btn-info btn-sml mt-3"
                      onClick={onSubmit}
                    >
                      Done
                    </button>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Homepage;
