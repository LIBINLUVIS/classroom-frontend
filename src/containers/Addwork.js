import React, { useState } from "react";
import { Form, Dropdown, DropdownButton } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
function Addwork(props) {
  const ref = React.useRef();
  const api = `http://127.0.0.1:8000/Addworks/${props.match.params.id}/`;
  const [discription, setDiscription] = useState("");
  const [file, setFile] = useState();
  const [status, setStatus] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    ref.current.value = "";
  }
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
    });
  };

  return (
    <div className="container mt-4">
      <h5>AddWorks</h5>
      <hr />
      <div className="row mt-5">
        <form className="addwork-form" onSubmit={(e) => onSubmit(e)}>
          <label for="start">discription of work:</label>
          <Form.Control
            size="lg"
            type="text"
            onChange={(e) => setDiscription(e.target.value)}
            value={discription}
            placeholder="text..."
          />
          <br />
          <label for="start">date to be submitted:</label>
          <input
            type="date"
            id="start"
            name="trip-start"
            value="2018-07-22"
            min="2018-01-01"
            max="2018-12-31"
          ></input>
          <br />
          <label for="start">File:</label>
          <Form.Control
            type="file"
            ref={ref}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          <Button variant="contained" color="primary" type="submit">
            Add Work
          </Button>
        </form>
      </div>
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
          Work Submited Successfully !
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Addwork;
