import React, { useState, useEffect } from "react";
import axios from "axios";
import {useSelector} from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import AttachmentIcon from "@material-ui/icons/Attachment";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";


function Submit(props) {
  const user=useSelector(state=>state.auth.user)
  const auth=useSelector(state=>state.auth.isAuthenticated)
  const api = `http://127.0.0.1:8000/Submitwork/${props.match.params.id}/`;
  const submitionapi = `http://127.0.0.1:8000/StudentWork/${props.match.params.id}/`;

  const [activity, setActivity] = useState([]);
  const ref = React.useRef();
  const [file,setFile] = useState();
  const [Message,setMessage] = useState("");
  const [status,setStatus] = useState(false) 
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
    const file = `http://127.0.0.1:8000${activity[0].file}/`;
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
      setMessage('')
    });
  };
const check=()=>{
  if(user && activity[0]){
    if(user.id==activity[0].auther){
      return true
    }
  }else{
    console.log("hey")
  }
 
  
}
  return (
    <div className="container">
      {auth?<>
        <div className="row">
    
    {check()?<Link to={`/Works/${props.match.params.id}`}>
     <button style={{marginTop:'20px',marginLeft:'20px'}} class="btn btn-info">Submited works</button>
    </Link>:null} 
     <div className="col-md-12 col-12 mt-5">
       {activity.map((item) => (
         <Card>
           <Card.Header>Work</Card.Header>
           <Card.Body>
             <blockquote className="blockquote mb-0">
               <p>
                 {" "}
                 {item.discription}.<br />
                <span >Due at</span> : {item.submition}{" "}
               </p>
               <footer className="">
                 {activity[0].file ? (
                   <>
                     <AttachmentIcon />{" "}
                     <Button onClick={openfile} varient="info">
                       View File
                     </Button>{" "}
                   </>
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
     </div>
   </div>
   <div clasName="row ">
        <div className="col-md-12 col-12 mt-5">
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
                    <div className="col-md-12 col-12">
                    <input type="file" ref={ref} onChange={(e) => setFile(e.target.files[0])} style={{ marginTop: "10px" }}></input>
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Work Submited Successfully !
          </Alert>
        </Snackbar>
      </div>
      </>:<Redirect to="/"/>}

      <div className="row">
        <div className="col-md-12 col-12 mt-5">
          {status?<>
            <LinearProgressWithLabel value={progress} />
          </>:null}
          
        </div>
      </div>
    </div>
  );
}



export default Submit;