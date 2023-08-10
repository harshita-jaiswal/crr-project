import React, {useEffect, useState} from "react";
import image from "../../img/bill.jpg";

function Contri() {
    const [contriData, setContriData] = useState(
        JSON.parse(localStorage.getItem("shares"))
    );

    return (
        <div style={{
            backgroundImage: `url(${image})`,
        }} className={"contriPage"}>
            <div className="card  shadow-5-strong"
                 style={{
                     background: "hsla(0, 0%, 100%, 0.8)",
                     backdropFilter: "blur(30px)",
                 }}>
                <h3>Individual Contributions</h3>
                <div className={"contriItem"}>
                    {contriData.map((user) => BuildUserShare(user))}
                </div>
            </div>

        </div>
    );
}

export const BuildUserShare = (user) => {
    const [showEmail, setShowEmail] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    let string = `Hi ${user.name}, you purchased ${user.items.join(
        ", "
    )}. Your total share is $${user.share.toFixed(2)}`;
    const sendEmail = () => {
        let url = "http://localhost:3001";
        let endPoint = "/clicknsplit/api/send-email";
        console.log(string);
        let data = {
            email,
            string,
        };
        setLoading(true);
        fetch(`${url}${endPoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setLoading(false);
            });
    };
    return (
        <div className={"personBlock col"}>
            <div>
                <h4>{user.name}</h4>
                {user.items.length ? <h6>Items bought</h6> : ""}
                <div>
                    {user.items.map((item) => (
                        <li>{item}</li>
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
                    }}>
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
                        style={{width: `60px`}}
                        onClick={() => {
                            setShowEmail(false);
                        }}>
                        {"X"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Contri;
