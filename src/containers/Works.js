import React from 'react';
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import "datatables.net-dt/js/dataTables.dataTables";
import {connect} from 'react-redux';
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery'; 
import { Redirect } from 'react-router-dom';

class Works extends React.Component {
  
  state={
    datas:[]
    
  }

  constructor(props){
  super(props);
  
    this.state = {
      id : this.props.match.params.id
  }
  }
  componentDidMount() {
    var id = this.state.id
    fetch(`http://127.0.0.1:8000/getresponses/${id}/`)
    .then((response) => response.json())
    .then(item => {
        this.setState({ datas: item });
        $(document).ready(function () {
          $('#example').DataTable();
      });
    });
 }

render(){
 
  return (
    
      <div className="container">
        <h2 className="mt-3">Submited Works</h2><hr/>
        <div className="row mt-5">
           
           <div className="col-md-12 col-6">
         <table id="example" >
           <thead>
               <tr>
                   <th>Time</th>
                   <th>Student</th>
                   <th>Message</th>
                   <th>File</th>
                   
               </tr>
           </thead>
           <tbody>
             {this.state.datas?
             <>
             {this.state.datas.map((x) => (
               <tr>
                <td>{x.created}</td>
                <td>{x.student}</td>
                <td>{x.Message}</td>
                <td>
                <a  href={`http://127.0.0.1:8000${x.file}/`} target="_blank" >
                <FileCopyIcon/>
                </a>
               </td>
               </tr>
               ))}</>:null
             }
             
           </tbody>
       </table>
       </div>
       </div>
        </div>
     
  );
}
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,  //to be fixed---Auth checking and rendering...
 
});



export default connect(mapStateToProps,null) (Works);


