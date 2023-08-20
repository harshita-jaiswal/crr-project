import React, {useState} from "react";
import { API_BASEURL, SEND_EMAIL } from "../../utils/url";

function Contribution() {
  const contributionData =JSON.parse(localStorage.getItem("shares"))
  return (
    <section
      className={"contribution-page"}
    >
      <div
        className="card bg-card shadow-5-strong"
      >
        <h3>Individual Contributions</h3>
        <div className={"contribution-item"}>
          {contributionData && contributionData.map((user, key) => <div key={key}>{BuildUserShare(user)}</div>)}
        </div>
      </div>
    </section>
  );
}

const BuildUserShare = (user) => {

  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const message = `Hi ${user.name}, you purchased ${user.items.join(", ")}. Your total share is $${user.share.toFixed(2)}`;
  const sendEmail = () => {
    const data = {
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
        .catch(error=>{console.log(error)})
  };
  return (
    <div className={"contribution-person-block col"}>
      <div>
        <h4>{user.name}</h4>
        {user.items.length ? <h6>Items bought</h6> : ""}
        <div>
          {user.items.map((item, ind) => (
            <li key={ind}>{item}</li>
          ))}
        </div>
      </div>

      <p className={"contribution-share"}>
        Total share - <span>${parseFloat(user.share.toFixed(2))}</span>
      </p>
      {user.items.length && !showEmail ? (
        <button
          className={"contribution-send-email"}
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
            className={"contribution-email-input"}
            placeholder={"Enter Email"}
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
          />
          <button className={"contribution-send-email"} onClick={sendEmail}>
            {"Send"}
          </button>
          <button
            className={"contribution-cancel-email"}
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
