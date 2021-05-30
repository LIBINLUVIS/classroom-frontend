import React, { useState,useEffect } from "react";
import { Form, Dropdown, DropdownButton } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import axios from '../Axios';
import {useSelector} from 'react-redux';
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import store from "../Store";



function Addwork(props) {
  const usercheck=useSelector(state=>state.auth.isAuthenticated)
  const loginuserinfo=store.getState();
  const ref = React.useRef();
  const api = `Addworks/${props.match.params.id}/`;
  const getinfo = `create-class/${props.match.params.id}/`;
  const [discription, setDiscription] = useState("");
  const [file, setFile] = useState();
  const [auth,setAuth]=useState(false);
  const [status, setStatus] = useState(false);
  const [alert,setAlert] = useState(false)
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = React.useState(false); 
  const [submition,setSubmition] = useState(null)

  
  function handleClick() {
    ref.current.value = "";
  }
  useEffect(()=>{
   axios.get(getinfo).then((res)=>{
     const userauth=res.data.user
     if(usercheck){
      if(userauth==loginuserinfo.auth.user.id){
        setAuth(true)
      }
     }
   })
  },[]);
 
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  }));
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
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
    
      uploadData.append("discription", discription);
      uploadData.append("file", file, file.name);
      uploadData.append("submition",submition)
    
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

    axios.post(api, body, config).then((res) => {
      setProgress(100);
      setTimeout(() => {
        setOpen(true);
        setStatus(false);
      }, 1000);
      handleClick();
      setDiscription("");
    }).catch((err)=>{
       setAlert(true)
    })
  };
  const classes = useStyles();
  return (
    <main>
    <div className="container mt-4">
      {auth ?<>
        <h2 style={{color:"white"}}>AddWorks</h2><hr/>
        <div className="row mt-5">
          {alert?
          <div className={classes.root}>
            <Alert variant="filled" severity="error">
            Oops File not uploaded — check it out! 
            </Alert>
            </div>:null}
        <form className="addwork-form" onSubmit={(e) => onSubmit(e)} id="addwork-form">
          <label for="start">discription of work:</label>
          <div className="form-group">
          <Form.Control
            size="lg"
            type="text"
            name="disc"
            onChange={(e) => setDiscription(e.target.value)}
            value={discription}
            placeholder="text..."
           
          />
          </div>
          <br />
          <label for="start">Date to be submitted:</label><br/>          
          <Datepicker selected={submition} onChange={date=>setSubmition(date)}/><br/>
          <label for="start" class="mt-3">File:</label>
          <div className="form-group">
          <Form.Control
            type="file"
            name="file"
            ref={ref}
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          </div>
          <br />

          <Button variant="contained" color="primary"  type="submit">
            Add Work
          </Button>
        </form>
      </div>

      </>:<h2>You are not supposed to view this page</h2>}
      
     

      <div className="row">
        <div className="col-md-12 col-12 mt-5">
          {status ? (
            <>
              <LinearProgressWithLabel value={progress} />
            </>
          ) : null}
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Work Created Successfully !
        </Alert>
      </Snackbar>
    </div>
    </main>
  );
}

export default Addwork;
