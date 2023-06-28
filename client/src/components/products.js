import React from 'react';
import axios from 'axios';

// Products table page / landing page
export default class Products extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.updateData();
  }

  async updateData() {
    axios
        .get("/api/product/all")
        .then(res => {
            console.log("RESPONSE:", res);
            this.setState({data:res.data});
        })
  };
  
  render() {
    return (
      <div className="container">
        <h1 className="text-center">Province of BC Web Applications</h1>
        <h2 className="text-center">Total # of Active Products: {this.state.data.length}</h2>
        <form action="/product/new" method="GET">
            <input type="submit" value="Create New Product"/>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Product ID</th>
              <th scope="col">Name</th>
              <th scope="col">Owner</th>
              <th scope="col">Developers</th>
              <th scope="col">Scrum Master</th>
              <th scope="col">Start Date</th>
              <th scope="col">Methodology</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map(row => 
                <tr key={row.productId}>
                  <th scope="row">{row.productId}</th>
                  <td>{row.productName}</td>
                  <td>{row.productOwnerName}</td>
                  <td>{row.Developers.join(', ')}</td>
                  <td>{row.scrumMasterName}</td>
                  <td>{row.startDate}</td>
                  <td>{row.methodology}</td>
                  <td>{row.location}</td>
                  <td>
                    <a 
                      href={"/product/" + row.productId + "/edit"} 
                      className="btn btn-light btn-md"
                    >Edit</a>
                  </td>
                  <td>
                    <a 
                      href={"/product/"+ row.productId + "/delete"}
                      className="btn btn-danger btn-md">Delete</a></td>
                </tr>
              )
            }
          </tbody>
        </table>

        {this.state.data[0] ? "" : 
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        }
      </div>
    ) 
  }
}