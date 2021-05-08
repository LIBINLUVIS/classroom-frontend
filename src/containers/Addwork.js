import React, { useState } from "react";
import { Form, Dropdown, DropdownButton } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import axios from "axios";
function Addwork(props) {
  const ref = React.useRef();
  const api = `http://127.0.0.1:8000/Addworks/${props.match.params.id}/`;
  const [discription, setDiscription] = useState("");
  const [file, setFile] = useState();

  function handleClick() {
    ref.current.value = "";
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append("discription", discription);
    uploadData.append("file", file, file.name);
    const body = uploadData;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("access")}`,
      },
    };

    const res = axios.post(api, body, config).then((res) => {
      alert("Work Added Successfully !!!");
      handleClick();
      setDiscription("");
    });
  };

  return (
    <div className="container mt-4">
      <h5>AddWorks</h5>
      <hr />
      <div className="row mt-5">
        <form className="addwork-form" onSubmit={(e) => onSubmit(e)}>
          <label for="start">discription of work:</label>
          <Form.Control
            size="lg"
            type="text"
            onChange={(e) => setDiscription(e.target.value)}
            value={discription}
            placeholder="text..."
          />
          <br />
          <label for="start">date to be submitted:</label>
          <input
            type="date"
            id="start"
            name="trip-start"
            value="2018-07-22"
            min="2018-01-01"
            max="2018-12-31"
          ></input>
          <br />
          <label for="start">File:</label>
          <Form.Control
            type="file"
            ref={ref}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          <Button variant="contained" color="primary" type="submit">
            Add Work
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Addwork;
