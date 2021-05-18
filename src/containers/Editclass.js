import React, { useEffect, useState } from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import {
    Form,
    Button,
  } from "react-bootstrap";
import { Container } from "@material-ui/core";
function Editclass(props) {
  const api = `http://127.0.0.1:8000/create-class/${props.match.params.id}/`;
  const apiupdate=`http://127.0.0.1:8000/editclass/${props.match.params.id}/`;
  const [info, setInfo] = useState();
  const [updateinfo,setUpdateinfo] =useState({
      'classname':"",
      "discription":""
  });
  const [open, setOpen] = React.useState(false);
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
const updatehandler=(e)=>{
    e.preventDefault();
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
      };
      const body=updateinfo;
     axios.post(apiupdate,body,config).then((res)=>{
       setUpdateinfo( {"classname":"","discription":""})
        setOpen(true);
     })
}

const { classname,discription } =updateinfo ;
const onChange = e => setUpdateinfo({ ...updateinfo, [e.target.name]: e.target.value });
  return (
    <div>
      {info ? (
        <Container className="mt-5">
          <Form  onSubmit={(e) => updatehandler(e)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Classname</Form.Label>
              <Form.Control type="text" onChange={e => onChange(e)} name="classname" value={classname} placeholder={info.classname} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Discription</Form.Label>
              <Form.Control type="text" onChange={e => onChange(e)} name="discription" value={discription} placeholder={info.discription} />
            </Form.Group>
            <Button variant="primary" type="submit" >  
              Update
            </Button>
          </Form> 
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Class Updated Successfully !
        </Alert>
       </Snackbar>
          </Container>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Editclass;
