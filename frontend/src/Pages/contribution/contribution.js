import React, { useState } from "react";
import { API_BASEURL, SEND_EMAIL } from "../../utils/url";

function Contribution() {
  const [contributionData, setContriData] = useState(
    JSON.parse(localStorage.getItem("shares"))
  );

  return (
    <section
      className={"contriPage"}
    >
      <div
        className="card shadow-5-strong"
        style={{
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
          marginTop: "-400px",
        }}
      >
        <h3>Individual Contributions</h3>
        <div className={"contriItem"}>
          {contributionData && contributionData.map((user, key) => <div key={key}>{BuildUserShare(user)}</div>)}
        </div>
      </div>
    </section>
  );
}

const BuildUserShare = (user) => {

  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  let message = `Hi ${user.name}, you purchased ${user.items.join(", ")}. Your total share is $${user.share.toFixed(2)}`;
  const sendEmail = () => {

    let data = {
      email,
      message,
    };
    fetch(`${API_BASEURL}${SEND_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
  };
  return (
    <div className={"personBlock col"}>
      <div>
        <h4>{user.name}</h4>
        {user.items.length ? <h6>Items bought</h6> : ""}
        <div>
          {user.items.map((item, ind) => (
            <li key={ind}>{item}</li>
          ))}
        </div>
      </div>

      <p className={"sharePrice"}>
        Total share - <span>${parseFloat(user.share.toFixed(2))}</span>
      </p>
      {user.items.length && !showEmail ? (
        <button
          className={"sendEmail"}
          onClick={() => {
            setShowEmail(true);
          }}
        >
          Send Email
        </button>
      ) : (
        ""
      )}

      {showEmail && (
        <div>
          <input
            className={"emailInput"}
            placeholder={"enter email"}
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
          />
          <button className={"sendEmail"} onClick={sendEmail}>
            {"Send"}
          </button>
          <button
            className={"sendEmail"}
            style={{ width: `60px` }}
            onClick={() => {
              setShowEmail(false);
            }}
          >
            {"X"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Contribution;
