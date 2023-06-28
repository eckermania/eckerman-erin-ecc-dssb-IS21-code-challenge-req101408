import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal , Container, Row, Col} from 'react-bootstrap';

// Products table page / landing page
export default class Products extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data: [],
      selectedId: null,
      selectedName: "",
      modalShow: false
    };
  }

  componentDidMount() {
    this.updateData();
  }

  async updateData() {
    const msg = toast.loading("Retrieving records...");
    axios({
        method: "get",
        url: "/api/product/all",
    })
        .then(res => {
            this.setState({data:res.data});
            toast.dismiss(msg);
        })
        .catch((err) => {
            toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
        })
  };

  handleShow = (productId, productName) => {
    this.setState({ modalShow: true, selectedId: productId, selectedName: productName});
  }

  handleClose = () => {
    this.setState({modalShow: false, selectedId: null, selectedName: ""})
  }

  handleDelete(productId){
    const deleteURL = `/api/product/` + String(productId)
    axios({
        method: "delete",
        url: deleteURL
    }).then((res) => {
        if(res.status !== 204){
            toast.loading({ render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
        } else {
          const updatedData = this.state.data.filter((item) => item.productId !== productId);
          this.setState({ data: updatedData });
          this.handleClose();
        }
    })
  };
  
  render() {
    return (
      <div className="container">
        <ToastContainer />
   
        <Modal size="lg" show={this.state.modalShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete {this.state.selectedName}?
          </Modal.Body>
          <Modal.Footer>         
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => this.handleDelete(this.state.selectedId)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <h1 className="text-center">Province of BC Web Applications</h1>
        <br></br>
        <h2 className="text-center">Total # of Active Products: {this.state.data.length}</h2>
        <br></br>
        <form action="/product/new" method="GET" className="d-flex justify-content-center">
            <input className="btn btn-primary" type="submit" value="Create New Product"/>
        </form>
        <br></br>
        <Container fluid>
          <Row>
            <Col>
            <div className="table-responsive">
        <table className="table table-hover">
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
                  <td><Button variant="danger" onClick={() => this.handleShow(row.productId, row.productName)}>Delete</Button></td>
                </tr>
              )
            }
          </tbody>
        </table>
        </div>
        </Col>
        </Row>
        </Container>

        {this.state.data[0] ? "" : 
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        }
      </div>
    ) 
  }
}