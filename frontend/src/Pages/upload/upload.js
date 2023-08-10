import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import image from "../../img/bill.jpg";

function Upload(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setisLoading] = useState(null);
  const [isUploaded, setUploaded] = useState(false);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    setisLoading(true);
    formData.append("image", selectedFile, selectedFile.name);

    console.log(selectedFile);
    let apiEndpoint = "/clicknsplit/api/upload-receipt";
    // let url = "https://8b4d-2601-1c0-5280-e430-4536-9046-e759-831a.ngrok.io";
    let url = "http://localhost:3001";

    fetch(url + apiEndpoint, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Request successful", response);
        localStorage.setItem("tableData", JSON.stringify(response));
        setisLoading(false);
        setUploaded(true);
      })
      .catch((error) => {
        console.log("error message", error);
      });
  };
  const fileData = () => {
    if (selectedFile) {
      return (
        <div className="container">
          <h2>File Details:</h2>

          <p>File Name: {selectedFile.name}</p>

          <p>File Type: {selectedFile.type}</p>

          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
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
            <header className="row">
              <h1 className="App">Upload the picture of the bill</h1>
            </header>

            <main className="row">
              <div className="col mb-3">
                <input
                  type="file"
                  className="btn btn-info btn-sml"
                  onChange={onFileChange}
                />
              </div>
              <div className="col">
                <button className="btn btn-info btn-sml" onClick={onFileUpload}>
                  Upload!
                </button>
              </div>
              {fileData()}
            </main>
            {loading && loader()}
            {isUploaded && (
              <Link to={"review"}>
                <button className="btn btn-info btn-sml">Done</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Upload;

function loader() {
  return (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
