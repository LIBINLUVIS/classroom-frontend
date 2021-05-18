import React, { useEffect, useState, Fragment } from "react";
import AddIcon from "@material-ui/icons/Add";
import logo from "../media/img_code.jpg";
import "../App.css";
import { Link, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Room from "./Room";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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
  const getjoinedclass="http://127.0.0.1:8000/getjoinclass";
  const [classview, setClassview] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState(true);
  const [joinclass,setJoinclass]= useState(false)
  const [createclass,setCreateclass] = useState(false)
  const [joinclassinfo,setJoinclassinfo] = useState([])
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
    });
  }, [createclass]);
  useEffect(()=>{
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("access")}`,
      },
    };
     axios.get(getjoinedclass, config).then((res) => {
      setJoinclassinfo(res.data);
    });
  },[joinclass])
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const join=()=>{
    const class_id=prompt("Enter the Class Code");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("access")}`,
      },
    };
    if(class_id){
      setJoinclass(true)
      const joinapi=`http://127.0.0.1:8000/Joinclass/${class_id}/`;
      axios.get(joinapi,config).then((res) => {
        setOpen(true);
      });
    }     
  }
 
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
        setCreateclass(true)
        setOpen(true);
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
    <div className="">
      {user ? (
        <>
          <div className="text-center">
            <h4 className="mt-3">Welcome to Classroom</h4>
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
                    <CircularProgress />
                  </div>
                </>
              ) : (
                <>
                  {classview.map((item) => (
                    <div className="col-md-4 col-12 mt-5">
                      <Card>
                        <Card.Img variant="top" className="class" src={logo} />
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
                      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                              Action Successfull !
                            </Alert>
                      </Snackbar>
                    </div>

                  ))}
                  {joinclassinfo?<>
                    {joinclassinfo.map((item) => (
                    <div className="col-md-4 col-12 mt-5">
                      <Card>
                        <Card.Img variant="top" className="class" src={logo} />
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
                      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                              Action Successfull !
                            </Alert>
                      </Snackbar>
                    </div>
                  ))}
                  </>:<></>}
                </>
            
              )}
            </div>
          </div>
        </>
      ) : (
        // <Redirect to="/" />
        null
      )}
    </div>
  );
}

export default Classview;
