import React, { useEffect, useState, Fragment } from "react";
import AddIcon from "@material-ui/icons/Add";
import logo from "../media/img_code.jpg";
import "../App.css";
import { Link, Route } from "react-router-dom";
import Room from "./Room";
import axios from "axios";
import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Card,
  Button,
} from "react-bootstrap";
function Classview() {
  const api = "http://127.0.0.1:8000/create-class/";
  const api1 = "http://127.0.0.1:8000/user-class/";

  const [classview, setClassview] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("access")}`,
      },
    };
    const res = axios.get(api1, config).then((res) => {
      setClassview(res.data);
    });
  }, []);
console.log(classview)
  const addclass = () => {
    const classname = prompt("Add class Name");
    if (classname) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
      };
      const body = JSON.stringify({ classname: classname });

      const res = axios.post(api, body, config).then((res) => {
        alert("Class have been Created Successfully!!!");
        
      });
      
    }
  };

  return (
    <div className="">
      <div className="text-center">
        <h4 className="mt-3">Welcome to ClassRoom</h4>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="view ml-auto mt-5">
            <div className="addicon col-md-12 col-12  ">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <AddIcon />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>Join Class</Dropdown.Item>
                  <Dropdown.Item onClick={addclass}>Create Class</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>

        <div className="row">
          {classview.map((item) => (
            <div className="col-md-4 col-12 mt-5">
              <Card>
                <Card.Img variant="top" className="class" src={logo} />
                <Card.Body>
                  <Card.Title>{item.classname}</Card.Title>
                  <Card.Text>{item.discription}</Card.Text>
                  <Card.Text>{item.username}
                  </Card.Text>
                  <Card.Text>{item.created}
                  </Card.Text>
                  <Link to={`/Room/${item.id}`}>
                    <Button variant="primary">Go to Class</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Classview;
