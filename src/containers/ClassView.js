import React, { useEffect, useState, Fragment } from "react";
import AddIcon from "@material-ui/icons/Add";
import logo from "../media/img_code.jpg";
import "../App.css";
import { Link, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Room from "./Room";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Card,
  Button,
} from "react-bootstrap";
import axios from "../Axios";

function Classview() {
  const api = "create-class/";
  const api1 = "user-class/";
  const getjoinedclass = "getjoinclass";
  const [classview, setClassview] = useState([]);
  const [classviewlen,setClassviewlen]= useState(0)
  const [open, setOpen] = React.useState(false);
  const [joinalert,setJoinalert] = useState(false)
  const [status, setStatus] = useState(true);
  const [joinclass, setJoinclass] = useState(false);
  const [createclass, setCreateclass] = useState(false);
  const [alert, setAlert] = useState(false);
  const [joinclassinfo, setJoinclassinfo] = useState([]);
  const [joinclasslen,setJoinclasslen]=useState(0);
  const user = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("access")}`,
      },
    };
    const res = axios.get(api1, config).then((res) => {
      setClassview(res.data);
      setStatus(false);
      setClassviewlen(res.data.length)
    });
  }, []);
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("access")}`,
      },
    };
    const res = axios.get(api1, config).then((res) => {
      setClassview(res.data);
      setStatus(false);
      setClassviewlen(res.data.length)
    });
  }, [createclass]);
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("access")}`,
      },
    };
    axios.get(getjoinedclass, config).then((res) => {
      setJoinclassinfo(res.data);
      setJoinclasslen(res.data.length)
    });
  }, [joinclass]);
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const joinhandleClose=(event,reason)=>{
    if(reason==="clickaway"){
      return;
    }
    setJoinalert(false)
  }

  const join = () => {
    const class_id = prompt("Enter the Class Code");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("access")}`,
      },
    };
    if (class_id) {
      const joinapi = `Joinclass/${class_id}/`;
      axios
        .get(joinapi, config)
        .then((res) => {
          setOpen(true);
          setJoinclass(true)
        })
        .catch((err) => {
          setAlert(true);
        });
    }
  };

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

      axios
        .post(api, body, config)
        .then((res) => {
          setCreateclass(true);
          setJoinalert(true)
        })
        .catch((err) => {
          setAlert(true);
        });
    }
  };
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
    <main>
      <div className="">
        {alert ? (
          <>
            <div className={classes.root}>
              <Alert variant="filled" severity="error">
                Something Went Wrong Action Failed — check it out!
              </Alert>
            </div>
          </>
        ) : null}
        {user ? (
          <>
            <div className="text-center">
              <h4 className="mt-3" style={{color:"white"}}>Your Classes</h4>
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
                        <Dropdown.Item onClick={join}>Join Class</Dropdown.Item>
                        <Dropdown.Item onClick={addclass}>
                          Create Class
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>

              <div className="row">
                {status ? (
                  <>
                    <div className={classes.root}>
                      <CircularProgress color="secondary" />
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    {classviewlen!=0 || joinclasslen!=0 ? (
                      <>
                        {classview.map((item) => (
                          <div className="col-md-4 col-12 mt-5 mb-4">
                            <Card>
                              <Card.Img
                                variant="top"
                                className="class"
                                src={logo}
                              />
                              <Card.Body>
                                <Card.Title>{item.classname}</Card.Title>
                                <Card.Text>{item.discription}</Card.Text>
                                <Card.Text>{item.username}</Card.Text>
                                <Card.Text>{item.created}</Card.Text>
                                <Link to={`/Room/${item.id}`}>
                                  <Button variant="primary">Go to Class</Button>
                                </Link>
                              </Card.Body>
                            </Card>
                            <Snackbar
                              open={joinalert}
                              autoHideDuration={6000}
                              onClose={joinhandleClose}
                            >
                              <Alert onClose={joinhandleClose} severity="success">
                                Class Created Successfull !
                              </Alert>
                            </Snackbar>
                          </div>
                        ))}
                        {joinclassinfo ? (
                          <>
                            {joinclassinfo.map((item) => (
                              <div className="col-md-4 col-12 mt-5 mb-3">
                                <Card>
                                  <Card.Img
                                    variant="top"
                                    className="class"
                                    src={logo}
                                  />
                                  <Card.Body>
                                    <Card.Title>{item.classname}</Card.Title>
                                    <Card.Text>{item.discription}</Card.Text>
                                    <Card.Text>{item.username}</Card.Text>
                                    <Card.Text>{item.created}</Card.Text>
                                    <Link to={`/Room/${item.id}`}>
                                      <Button variant="primary">
                                        Go to Class
                                      </Button>
                                    </Link>
                                  </Card.Body>
                                </Card>
                                <Snackbar
                                  open={open}
                                  autoHideDuration={6000}
                                  onClose={handleClose}
                                >
                                  <Alert
                                    onClose={handleClose}
                                    severity="success"
                                  >
                                    Class Joined Successfull !
                                  </Alert>
                                </Snackbar>
                              </div>
                            ))}
                          </>
                        ) : (
                          null
                        )}
                      </>
                    ) : (
                      <div className="container mt-3">
                        <div className="row">
                          <div className="col-md-12 col-12 ">
                          <h2 style={{color:"white"}}>No Class Yet Created Or Joined</h2>
                          </div>
                        </div>
                      </div>
                      
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          // <Redirect to="/" />
          <h2>Please login</h2>
        )}
      </div>
    </main>
  );
}

export default Classview;
