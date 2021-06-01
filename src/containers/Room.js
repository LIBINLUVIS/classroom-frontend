import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { checkAuthenticated, load_user } from "../actions/auth";
import axios from '../Axios'; 
import { Link, Redirect } from "react-router-dom";
import { Row, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Avatar, IconButton } from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { deepOrange, green } from "@material-ui/core/colors";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Dropdown, Card, Button } from "react-bootstrap";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Alert from "@material-ui/lab/Alert";
import store from "../Store";


function Room(props) {
  const api = `create-class/${props.match.params.id}/`;
  const api2 = `Works/${props.match.params.id}/`;
  const api3 = "submitstatus/";

  const [info, setInfo] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState(true);
  const [completed, setCompleted] = useState([]);
  const user = useSelector((state) => state.auth.isAuthenticated);
  const state = store.getState();

  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, []);

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
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("access")}`,
      },
    };
    axios.get(api3, config).then((res) => {
      setCompleted(res.data);
    });
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
    rounded: {
      color: "#fff",
      backgroundColor: green[500],
    },
  }));
  const copy = () => {
    var copyText = document.getElementById("copy-text");
    var temp = document.createElement("textarea");
    document.body.appendChild(temp);
    temp.value = copyText.innerText;
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
  };
  const classes = useStyles();

  return (
    <main>
      <div className="">
        {user ? (
          <>
            <Container>
              <Row>
                {info ? (
                  <>
                    <div className="col-md-6 col-6 mt-4">
                      <h3 style={{ color: "white" }}>{info.classname}</h3>
                      <h style={{ color: "white" }} id="copy-text">
                        Join Code - {info.id}
                      </h>
                      <IconButton>
                        <FileCopyIcon
                          style={{ color: "white", marginLeft: "10px" }}
                          onClick={copy}
                        />
                      </IconButton>
                    </div>
                    {state.auth.user.id == info.user ? (
                      <>
                        <div className="mt-4   ml-auto">
                          <Link
                            to={`/Editclass/${props.match.params.id}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <EditIcon style={{ color: "white" }} />
                          </Link>
                        </div>
                        <div className="ml-auto mt-3">
                          <div className="addicon col-md-6 col-6">
                            <Dropdown>
                              <Dropdown.Toggle variant="" id="dropdown-basic">
                                <AddIcon style={{ transform: "scale(1.2)" }} />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link
                                    to={`/Addwork/${props.match.params.id}`}
                                    style={{
                                      textDecoration: "none",
                                      color: "black",
                                    }}
                                  >
                                    Add Works
                                  </Link>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </>
                ) : null}
              </Row>
              <hr />
              <Row>
                <div className="col-md-12 col-12">
                  <h2 style={{ color: "white" }}>Activities</h2>
                  {status ? (
                    <>
                      <CircularProgress className="mt-5" />
                    </>
                  ) : (
                    <>
                      {tasks.map((task) => (
                        <Card className="mt-5 mb-3">
                          {!state.auth.user.id===task.auther?<>
                            {completed.includes(task.id) ? (
                            <>
                              <Alert severity="success">
                                Work has been Successfully Submited.
                              </Alert>
                            </>
                          ) : <Alert severity="warning">Work Pending — check it out!</Alert>}
                          
                          </>:null} 
                          <Card.Body>
                            <div style={{ display: "flex" }}>
                              <MoreVertIcon style={{ marginLeft: "auto" }} />
                            </div>
                            <Card.Title style={{ display: "flex" }}>
                              <Avatar
                                variant="rounded"
                                className={classes.rounded}
                                
                              >
                                <AssignmentIcon />
                              </Avatar>
                              <div style={{ marginLeft: "10px" }}>
                                {task.discription}
                            
                               
                              </div>
                            </Card.Title>

                            <Card.Text>
                              <p>
                                Created at: <span>{task.created}</span>
                              </p>
                            </Card.Text>
                            <Link to={`/Submit/${task.id}`}>
                              <Button variant="primary">View Activity</Button>
                            </Link>
                          </Card.Body>
                        </Card>
                      ))}
                    </>
                  )}
                </div>
              </Row>
            </Container>
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    </main>
  );
}

export default Room;
