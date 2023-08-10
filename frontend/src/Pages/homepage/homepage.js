import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../../img/bill.jpg";
//correct path needs to be put above

function Homepage(props) {
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [personName, setPersonName] = useState({});
  const onNumberChange = (event) => {
    setNumberOfPeople(event.target.value);
  };
  const onPersonChange = (e, i) => {
    setPersonName((prevState) => {
      return { ...prevState, [i]: e.target.value };
    });
  };

  useEffect(() => {
    buildInputBoxes();
  }, [numberOfPeople]);

  const buildInputBoxes = () => {
    let temp = [];
    for (let i = 0; i < numberOfPeople; i++) {
      temp.push(
        <div key={i} className="row">
          <span>{i + 1}</span>
          <input
            key={i}
            type="text"
            value={personName[i]}
            onChange={(e) => {
              onPersonChange(e, i);
            }}
          />
        </div>
      );
    }
    return temp;
  };
  const onDone = () => {
    let temp = [];
    for (const [key, value] of Object.entries(personName)) {
      temp.push(value);
    }
    localStorage.setItem("personNames", JSON.stringify(temp));
  };
  return (
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
          <div class="row d-flex justify-content-center">
            <div className="col-8">
              Enter number of people involved in the transaction?
            </div>
            <div className="col-4">
              <input type="number" onChange={onNumberChange} />
            </div>
            {numberOfPeople > 0 && (
              <div className="row">
                <div className="col-6">
                  <p>Enter Persons name :</p>
                  {buildInputBoxes()}
                </div>
                <Link to={"upload"}>
                  <div className="col-6">
                    <button
                      className="btn btn-info btn-sml mt-3"
                      onClick={onDone}>
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
