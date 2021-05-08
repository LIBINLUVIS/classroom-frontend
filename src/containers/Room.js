import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Row, Container } from "react-bootstrap";
import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Card,
  Button,
} from "react-bootstrap";

function Room(props) {
  // const id=props.match.params.id
  const api = `http://127.0.0.1:8000/create-class/${props.match.params.id}/`;
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("access")}`,
      },
    };
    const res = axios.get(api, config).then((res) => {
      setInfo(res.data);
    });
  }, []);
  const addwork = () => {
    return <Redirect to="/Addwork" />;
  };
  const works = () => {
    <Redirect to="/Works" />;
  };
  return (
    <div className="">
      <Container>
        <Row>
          <div className="col-md-6 col-6 mt-4">
            <h5>{info.classname}</h5>
          </div>
          <div className="ml-auto mt-3">
            <div className="addicon col-md-6 col-6">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <AddIcon />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to={`/Addwork/${props.match.params.id}`}> Add Works </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/Work">Submited Works </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Row>
        <hr />
      </Container>
    </div>
  );
}

export default Room;
