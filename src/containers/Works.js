import React from "react";
import '../Svg/Svg.css'
//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import "datatables.net-dt/js/dataTables.dataTables";
import { connect } from "react-redux";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import CircularProgress from "@material-ui/core/CircularProgress";
import Rotatemob from '../Svg/Rotatemob';
class Works extends React.Component {
  state = {
    datas: [],
    status: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
    };
  }

  componentDidMount() {
    var id = this.state.id;
    fetch(`https://classroomfiles.herokuapp.com/getresponses/${id}/`)
      .then((response) => response.json())
      .then((item) => {
        this.setState({ datas: item });
        this.setState({ status: true });
        $(document).ready(function () {
          $("#example").DataTable();
        });
      });
  }

  render() {
    return (
      <main>
        
        <div className="container">
          <div  style={{ color: "white" ,display:"flex",justifyContent:"space-around"}}>
          <h2 className="mt-3" >
            Submited Works </h2>
           <div style={{marginTop:"20px"}} id="rotation-icon">
            <Rotatemob/>           
            </div>
          </div>
          
          <hr />
        </div>

        {this.state.status ? (
          <div
            data-role="page"
            data-theme="a"
            style={{ width: "100%" }}
            class="container"
            id="one"
            data-title="jQM-Tables"
          >
            <table id="example" data-role="table" data-mode="columntoggle">
              <thead>
                <tr>
                  <th>Time</th>
                  <th data-priority="1">Student</th>
                  <th>Message</th>
                  <th>File</th>
                </tr>
              </thead>

              <tbody>
                {this.state.datas ? (
                  <>
                    {this.state.datas.map((x) => (
                      <tr>
                        <td>{x.created}</td>
                        <td>{x.student}</td>
                        <td>{x.Message}</td>
                        <td>
                          <a
                            href={`${x.file}`}
                            target="_blank"
                          >
                            <FileCopyIcon />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                   null
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
          <CircularProgress
            style={{ marginLeft: "", color: "pink" }}
          />
        </div>
        )}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(Works);
