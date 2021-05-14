import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Row, Container } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Card,
  Button,
} from "react-bootstrap";

function Room(props) {
  
  const api = `http://127.0.0.1:8000/create-class/${props.match.params.id}/`;
  const api2 = `http://127.0.0.1:8000/Works/${props.match.params.id}/`;
  const [info, setInfo] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState(true);
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
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("access")}`,
      },
    };
    const res = axios.get(api2, config).then((res) => {
      setTasks(res.data);
      setStatus(false);
    });
  }, []);
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();

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
                    <Link to={`/Addwork/${props.match.params.id}`}>
                      Add Works
                    </Link>
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
        <Row>
          <div className="col-md-12 col-12">
            <h5 style={{color:"blue"}}>Activities</h5>
            {status?<>
              <CircularProgress className="mt-5"/>
          </>:<>
          {tasks.map((task)=>(
                              <Card className="mt-5">
                              <Card.Body>
                                <Card.Title>{task.discription}</Card.Title>
                                <Card.Text>
                                <p>Created at: <span>{task.created}</span></p>
                                </Card.Text>
                                <Link to={`/Submit/${task.id}`}>
                                <Button variant="primary">View Activity</Button>
                                </Link>
                                
                              </Card.Body>
                            </Card>
               ))}
          </>}

          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Room;
