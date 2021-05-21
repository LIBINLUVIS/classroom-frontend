import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";


function Login({ login, isAuthenticated }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();
  const [alert, setAlert] = useState(false);
  const [loginstatus,setLoginstatus]=useState(false);
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formdata;

  const onChange = (e) =>
    setFormdata({ ...formdata, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(username, password).then((res) => {
        console.log(res.status)
      if (res.status) {
        setAlert(true);
      }
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/class" />;
  }
  const handlelogin=()=>{
    setLoginstatus(true)
  }
 
  return (
    <div className="container mt-5" >
      <h1>Sign In</h1>
      <p>Sign into your Account</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="3"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit" onClick={handlelogin}>
          {loginstatus?<>
           Please Wait...
          </>:<>Login</>}
        </button>
      </form>
      {alert ? (
        <>
          <div className={classes.root} style={{marginTop:"20px"}}>
            <Alert severity="error">
              Oops Your Password or Username is incorrect — check it out!
            </Alert>
          </div>
        </>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
