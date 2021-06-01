import React, { useState, useEffect } from "react";
import axios from '../Axios';
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import AttachmentIcon from "@material-ui/icons/Attachment";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { green, pink } from "@material-ui/core/colors";

function Submit(props) {
  const user = useSelector((state) => state.auth.user);
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const api = `Submitwork/${props.match.params.id}/`;
  const submitionapi = `StudentWork/${props.match.params.id}/`;

  const [activity, setActivity] = useState([]);
  const ref = React.useRef();
  const [file, setFile] = useState();
  const [Message, setMessage] = useState("");
  const [alert,setAlert]=useState(false)
  const [status, setStatus] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = useState(0);



  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("access")}`,
      },
    };
    const res = axios.get(api, config).then((res) => {
      setActivity(res.data);
    });
  }, []);


  const openfile = () => {
    const file = `${activity[0].file}`;
    if (activity[0].file != null) {
      window.open(file, "_blank");
    }
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
      green: {
        color: "#fff",
        backgroundColor: green[500],
      },
    },
  }));
  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const classes = useStyles();

  function handleClick() {
    ref.current.value = "";
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    
    setStatus(true);
    const uploadData = new FormData();
    uploadData.append("Message", Message);
    uploadData.append("file", file, file.name);
    const body = uploadData;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("access")}`,
      },
      onUploadProgress: (ProgressEvent) => {
        const { loaded, total } = ProgressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setProgress(percent);
        }
      },
    };

    axios.post(submitionapi, body, config).then((res) => {
      setProgress(100);
      setTimeout(() => {
        setOpen(true);
        setStatus(false);
      }, 1000);
      handleClick();
      setMessage("");
    }).catch((err)=>{
      setAlert(true)
    })
  };
  const check = () => {
    if (user && activity[0]) {
      if (user.id == activity[0].auther) {
        return true;
      }
    } else {
      console.log("hey");
    }
  };
  return (
    <main>
    <div className="container">
      {auth ? (
        <>
          <div className="row">
          {alert?
          <div className={classes.root}>
            <Alert variant="filled" severity="error">
            Oops File not uploaded — check it out! 
            </Alert>
            </div>:null}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                Work Submited Successfully !
              </Alert>
            </Snackbar> 
            {check() ? (
              <Link to={`/Works/${props.match.params.id}`}>
                <button
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                  class="btn btn-info"
                >
                  Submited works
                </button>
              </Link>
            ) : null}

            <div className="col-md-12 col-12 mt-5">
            {activity?<>
              {activity.map((item) => (
                <Card>
                  <Card.Header>
                    <AssignmentIndIcon
                      style={{
                        margin: "10px",
                        color: "green",
                        transform: "scale(1.4)",
                      }}
                    />
                    <h> Work</h>
                  </Card.Header>
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <div className={classes.root} style={{display:"flex"}}>
                       
                        <Avatar  style={{backgroundColor:"#2791F1",marginTop:"15px"}}>
                          <AssignmentIcon />
                        </Avatar>
                        <div style={{marginLeft:"10px"}}>
                        {item.discription}
                        </div>
                        
                      </div>
                      <div style={{marginTop:"15px"}}>
                      <span>Due at</span> : {item.submition}
                      </div>
                      
                      <footer style={{marginTop:"15px"}}>
                        {activity[0].file ? (
                          <div style={{display:"flex"}}>
                            <AttachmentIcon style={{fontSize:"30px"}} />
                            <Button onClick={openfile} varient="info" >
                              View File
                            </Button>
                          </div>
                        ) : (
                          <>
                            <p>No Attachments</p>
                          </>
                        )}
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              ))}
            
            </>:                    <>
                      <CircularProgress className="mt-5" />
                    </>}
              

            </div>
          </div>
          <div clasName="row ">
            <div className="col-md-12 col-12 mt-5 mb-5">
              <Card className="text-center">
                <Card.Header>Upload</Card.Header>
                <Card.Body>
                  <Card.Title></Card.Title>
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div className="content">
                      <div className="container">
                        <div className="row">
                          <div className="col-md-12 col-12">
                            <TextareaAutosize
                              rowsMax={3}
                              aria-label="maximum height"
                              style={{ marginRight: "135px" }}
                              placeholder="Private Message"
                              onChange={(e) => setMessage(e.target.value)}
                              value={Message}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-12 col-12">
                            <input
                              type="file"
                              ref={ref}
                              onChange={(e) => setFile(e.target.files[0])}
                              style={{ marginTop: "10px" }}
                              required
                            ></input>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant="success"
                        style={{ marginTop: "35px" }}
                        type="submit"
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </Card.Body>
                <Card.Footer className="text-muted"></Card.Footer>
              </Card>
            </div>

          </div>
        </>
      ) : (
        <Redirect to="/" />
      )}

      <div className="row">
        <div className="col-md-12 col-12">
          {status ? (
            <>
              <LinearProgressWithLabel value={progress} />
            </>
          ) : null}
        </div>
      </div>
    </div>
    </main>
  );
}

export default Submit;
