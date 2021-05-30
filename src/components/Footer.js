import React,{Fragment} from "react";
import * as ReactBootStrap from "react-bootstrap";


function Footer() {
  return (
    <Fragment>
      <ReactBootStrap.Navbar bg="light" expand="lg" style={{ width: "100%" }}>
        <div className="fotter">
          <div className="footer-title">
           <p>Developed by Libin Luvis © 2021</p>
          </div>
          <bold>Contacts-</bold><br/>
          <div className="fotter-icons">
          <a href="https://www.linkedin.com/in/libin2020" target="_blank">
              <i class="fa fa-2x fa-linkedin-square" aria-hidden="true" ></i>
            </a>
            <a href="https://github.com/LIBINLUVIS" target="_blank">
              <i class="fa fa-2x fa-github" aria-hidden="true"></i>
            </a>
            <a href="mailto:libinluvis123@gmail.com" target="_blank">
              <i class="fa fa-2x fa-envelope" aria-hidden="true"></i>
            </a>
            </div>
        </div>
      </ReactBootStrap.Navbar>
    </Fragment>
  );
}

export default Footer;
