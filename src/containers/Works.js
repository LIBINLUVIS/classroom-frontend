import React, { useEffect, useState } from "react";
import axios from "axios";
import {  Button } from "react-bootstrap";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
function Works(props) {
  const api = `http://127.0.0.1:8000/getresponses/${props.match.params.id}/`;
  const [data, setData] = useState([]);
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("access")}`,
      },
    };
    const res = axios.get(api, config).then((res) => {
      setData(res.data);
      //   $(document).ready( function () {
      //     $('#workstable').DataTable();
      // } );
    });
  }, []);

  return (
    <div className="container">
      <h5 className="mt-5">Submited Works</h5><hr/>
      <div className="row">
        <div className="col-12 col-md-12">
          <table class="table mt-5" id="workstable">
            <thead>
              <th>Time</th>
              <th>Student</th>
              <th>Message</th>
              <th>File</th>
            </thead>
            <tbody>
              {data.map((x) => (
                <tr>
                  <td>{x.created}</td>
              <td>{x.student}</td>
              <td>{x.Message}</td>
              <td>
              <a  href={`http://127.0.0.1:8000${x.file}/`} target="_blank" class="btn btn-secondary">
              View File
              </a>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Works;
